/**
 * Audits internal links in the built site.
 *
 * Every href="/..." must resolve to a generated page. Catches the classic
 * static-site failure where a link is written before (or instead of) the page.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';

const walk = (dir) => {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
};

const files = walk(DIST);

const routes = new Set(
  files.map((f) => {
    const rel = relative(DIST, f).split('\\').join('/');
    return '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');
  })
);

const broken = new Map();
let checked = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const page = '/' + relative(DIST, file).split('\\').join('/').replace(/index\.html$/, '');

  for (const match of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    let href = match[1];
    if (href.startsWith('//')) continue;
    // Ignore real files emitted alongside the pages.
    if (/\.(xml|txt|svg|ico|png|jpg|jpeg|webp|css|js|pdf|webmanifest)$/.test(href)) continue;
    if (!href.endsWith('/')) href += '/';

    checked++;
    if (!routes.has(href)) {
      if (!broken.has(href)) broken.set(href, new Set());
      broken.get(href).add(page);
    }
  }
}

console.log(`Pages: ${files.length}`);
console.log(`Internal links checked: ${checked}`);

if (broken.size === 0) {
  console.log('No broken internal links.');
  process.exit(0);
}

console.log(`\nBROKEN (${broken.size}):`);
for (const [href, pages] of [...broken].sort()) {
  console.log(`  ${href}`);
  console.log(`    linked from: ${[...pages].slice(0, 4).join(', ')}`);
}
process.exit(1);
