/**
 * Audits the built pages against the SEO rules the marketing audit found broken
 * on the sister site: missing or overlong titles and descriptions, missing or
 * duplicated H1s, and absent schema.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 165;

const walk = (dir) => {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
};

const text = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&middot;/g, '·')
    .replace(/<[^>]+>/g, '')
    .trim();

const issues = [];
const titles = new Map();
const files = walk(DIST);

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const page = '/' + relative(DIST, file).split('\\').join('/').replace(/index\.html$/, '');
  const noindex = /<meta name="robots" content="noindex/.test(html);

  const title = text(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
  const desc = html.match(/<meta name="description" content="([\s\S]*?)"/)?.[1] ?? '';
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  const hasSchema = html.includes('application/ld+json');
  const hasCanonical = html.includes('rel="canonical"');

  if (!title) issues.push([page, 'no title']);
  else if (title.length > TITLE_MAX)
    issues.push([page, `title ${title.length} chars: "${title}"`]);

  if (!noindex) {
    if (titles.has(title)) issues.push([page, `duplicate title with ${titles.get(title)}`]);
    else titles.set(title, page);
  }

  if (!desc) issues.push([page, 'no meta description']);
  else if (desc.length > DESC_MAX) issues.push([page, `description ${desc.length} chars`]);
  else if (desc.length < DESC_MIN) issues.push([page, `description only ${desc.length} chars`]);

  if (h1s.length === 0) issues.push([page, 'no H1']);
  else if (h1s.length > 1) issues.push([page, `${h1s.length} H1s`]);

  // Utility pages (404, form confirmation) are noindex, so structured data
  // would never be read. Only indexable pages need it.
  if (!hasSchema && !noindex) issues.push([page, 'no JSON-LD schema']);
  if (!hasCanonical) issues.push([page, 'no canonical']);
}

console.log(`Audited ${files.length} pages.`);

if (issues.length === 0) {
  console.log('No SEO issues.');
  process.exit(0);
}

console.log(`\n${issues.length} issue(s):`);
for (const [page, issue] of issues) console.log(`  ${page} — ${issue}`);
process.exit(1);
