# John Bald Funeral Directors — website

Static site for John Bald Funeral Directors, Dunbar (part of A & A Doyle Ltd), built with Astro 5 and Tailwind v4. 69 pages, no client-side JavaScript.

## Commands

| Command | What it does |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run verify` | Typecheck, build, link audit and SEO audit — run before every deploy |
| `npm run check:links` | Audit internal links in `dist/` |
| `npm run check:seo` | Audit titles, descriptions, H1s, schema and canonicals in `dist/` |

`npm run verify` must pass clean. The SEO audit enforces the failures the marketing audit found on the sister site: overlong or duplicate titles, missing descriptions, missing or duplicated H1s, absent schema.

## Where things live

```
src/data/site.ts        NAP, contact, memberships — single source of truth
src/data/pricing.ts     CMA price lists (see "Prices" below)
src/data/funding.ts     Funeral Support Payment rates
src/data/nav.ts         Navigation
src/content/            Markdown: guides, coffins, crematoria, cemeteries, registrars
src/content.config.ts   Content collection schemas
scripts/                Pre-deploy audits
```

Every address on the site — pages, footer, schema — reads from `src/data/site.ts`. Changing the address is a one-file edit.

## Outstanding work

Items still needing client input before this can go live — address, prices,
trade body verification, plan wording, form handler, photography, domain and
legal review — are listed in `HANDOVER.md`, which is deliberately not
committed to this repository.

## Ecoffins

Ecoffins supply only to funeral professionals — there is no trade-permitted public checkout. `/coffins/` is therefore an illustrated catalogue with an enquiry action, not a shop. Built as a content collection, so pricing and checkout could be layered on later if Ecoffins permit it.

## Keeping content current

Facts go stale, and a directory that does not say when it was written is worse than none.

- **Directory entries** carry `lastVerified`, rendered on the page. Re-check annually.
- **Guides** carry `reviewBy`. Anything quoting a benefit rate needs re-checking each April, when Scottish Government rates are uprated.
- **Funeral Support Payment** rates live in `src/data/funding.ts` — update `taxYear`, the rates and `lastVerified` together.
- **Helpline numbers** on `/bereavement-support/` were verified against each charity's own site in August 2026. A wrong number there is worse than no page.

## Design constraints

The audience skews 60+, often distressed, frequently on rural mobile signal. These are deliberate and worth preserving:

- 18px minimum body text; body contrast measures 15.99:1 (WCAG AAA needs 7:1)
- No carousels, animations, popups or chat widgets
- Mobile call bar fixed to the viewport bottom, so the phone number never needs scrolling to
- Native `<details>` for the mobile menu — no JavaScript
- Privacy-first analytics only, so there is no cookie banner in front of a grieving family
- The Standardised Price List stays within one click of the homepage — a legal requirement, not a layout preference
