/**
 * Builds and deploys the staging site to GitHub Pages.
 *
 *   npm run deploy:staging
 *
 * Steps: typecheck -> build with STAGING=1 -> run the same link and SEO audits
 * production gets -> rewrite URLs for the Pages subpath -> force-push dist/ to
 * the gh-pages branch.
 *
 * STAGING=1 is what puts noindex on every page and swaps robots.txt for a
 * blanket disallow, so a staging copy can never be crawled. It is set here
 * rather than left to the shell — `STAGING=1 npm run ...` is bash syntax and
 * silently does nothing in PowerShell, which would publish an indexable site.
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const REPO_SUBPATH = 'john-bald-staging';
const BRANCH = 'gh-pages';
const DIST = 'dist';

// Astro is invoked through its .mjs entry point with the current node binary,
// rather than through npx. Two reasons: no `shell: true`, which concatenates
// arguments instead of escaping them; and no .cmd shim, which Node 24 refuses
// to spawn without a shell anyway. This is also faster — no npx resolution.
const ASTRO = 'node_modules/astro/bin/astro.mjs';

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { stdio: 'inherit', ...opts });

const capture = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: 'utf8', ...opts }).trim();

const step = (n, msg) => console.log(`\n[${n}/6] ${msg}`);

// Resolve the target from the project's own remote, so a fork or a renamed
// repo deploys to itself rather than to a hardcoded account.
const remote = capture('git', ['remote', 'get-url', 'origin']);
const owner = remote.replace(/\.git$/, '').split(/[/:]/).slice(-2)[0];
const liveUrl = `https://${owner}.github.io/${REPO_SUBPATH}/`;

step(1, 'Typechecking');
run(process.execPath, [ASTRO, 'check']);

step(2, 'Building with STAGING=1 (noindex + robots disallow)');
run(process.execPath, [ASTRO, 'build'], { env: { ...process.env, STAGING: '1' } });

step(3, 'Auditing links and SEO');
run(process.execPath, ['scripts/check-links.mjs']);
run(process.execPath, ['scripts/check-seo.mjs']);

step(4, `Rewriting URLs for /${REPO_SUBPATH}`);
run(process.execPath, ['scripts/stage-rewrite.mjs', REPO_SUBPATH]);

// Without .nojekyll, GitHub Pages runs Jekyll, which ignores directories
// beginning with an underscore — every asset in _astro/ would 404.
writeFileSync(join(DIST, '.nojekyll'), '');

step(5, 'Checking the staging guards actually made it into the build');
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
if (!/Disallow: \/\s*$/m.test(robots)) {
  console.error('\nABORTED: robots.txt is not blocking crawlers. Refusing to publish an indexable staging site.');
  process.exit(1);
}
const home = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!home.includes('name="robots" content="noindex')) {
  console.error('\nABORTED: homepage is missing its noindex tag. Refusing to publish an indexable staging site.');
  process.exit(1);
}
console.log('    robots.txt disallows all, noindex present.');

step(6, `Publishing to ${BRANCH}`);
// astro build wipes dist/, so this repo is always fresh — a throwaway commit
// whose only job is to be the tip of gh-pages.
rmSync(join(DIST, '.git'), { recursive: true, force: true });
const git = (...args) => run('git', args, { cwd: DIST });
git('init', '-q');
git('config', 'user.name', capture('git', ['config', 'user.name']));
git('config', 'user.email', capture('git', ['config', 'user.email']));
git('add', '-A');
git('commit', '-q', '-m', `Staging deploy ${new Date().toISOString()}`);
git('push', '-q', '-f', remote, `HEAD:${BRANCH}`);

console.log(`\nDeployed. ${liveUrl}`);
console.log('GitHub Pages usually takes 10-60 seconds to serve the new build.');
