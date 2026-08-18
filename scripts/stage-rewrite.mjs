/**
 * Rewrites the built site for a GitHub Pages PROJECT deploy, which serves from
 * a subpath rather than the domain root.
 *
 * The site's internal links are root-absolute ("/directory/..."), which is
 * correct for production but 404s under /<repo>/. Rather than thread a base
 * path through every nav entry, markdown link and component — churn in
 * production code for a temporary need — this rewrites the built artifact
 * only. dist/ is disposable; src/ stays honest about production URLs.
 *
 * Usage: node scripts/stage-rewrite.mjs john-bald-staging
 *
 * Takes the repo name with or without a leading slash — Git Bash on Windows
 * rewrites a bare "/foo" argument into a Windows path, so the leading slash
 * cannot be relied on.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const raw = process.argv[2];
if (!raw) {
  console.error('Usage: node scripts/stage-rewrite.mjs <repo-name>');
  process.exit(1);
}
// Accept "repo", "/repo", or a Windows path Git Bash mangled from "/repo".
const prefix = '/' + raw.split(/[^A-Za-z0-9._-]+/).filter(Boolean).pop();

const DIST = 'dist';
/** Leave alone: protocol-relative, absolute, scheme links, and anchors. */
const skip = (v) => !v.startsWith('/') || v.startsWith('//') || v.startsWith(prefix + '/');

const addPrefix = (v) => (skip(v) ? v : prefix + v);

/** srcset is a comma-separated list of "<url> <descriptor>" pairs. */
const rewriteSrcset = (value) =>
  value
    .split(',')
    .map((part) => {
      const trimmed = part.trim();
      if (!trimmed) return part;
      const [url, ...rest] = trimmed.split(/\s+/);
      return [addPrefix(url), ...rest].join(' ');
    })
    .join(', ');

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let htmlFiles = 0;
let cssFiles = 0;
let rewrites = 0;

for await (const file of walk(DIST)) {
  const ext = extname(file);
  if (ext !== '.html' && ext !== '.css') continue;

  const original = await readFile(file, 'utf8');
  let out = original;

  if (ext === '.html') {
    // href/src single URLs
    out = out.replace(/(\b(?:href|src)=")([^"]*)"/g, (_m, attr, value) => {
      const next = addPrefix(value);
      if (next !== value) rewrites++;
      return `${attr}${next}"`;
    });
    // srcset lists
    out = out.replace(/(\bsrcset=")([^"]*)"/g, (_m, attr, value) => {
      const next = rewriteSrcset(value);
      if (next !== value) rewrites++;
      return `${attr}${next}"`;
    });
    if (out !== original) htmlFiles++;
  } else {
    // url(/_astro/font.woff2) inside stylesheets
    out = out.replace(/url\((['"]?)(\/[^)'"]*)\1\)/g, (_m, q, value) => {
      const next = addPrefix(value);
      if (next !== value) rewrites++;
      return `url(${q}${next}${q})`;
    });
    if (out !== original) cssFiles++;
  }

  if (out !== original) await writeFile(file, out, 'utf8');
}

console.log(`stage-rewrite: prefix ${prefix} — ${rewrites} URLs across ${htmlFiles} HTML and ${cssFiles} CSS files`);
