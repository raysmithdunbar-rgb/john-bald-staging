import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const coffins = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/coffins' }),
  // Function form so Astro's `image()` helper is available: it validates the
  // file exists at build time and hands the pages an optimisable asset rather
  // than a bare string path.
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      /** Ecoffins range grouping — drives the catalogue's section headings. */
      material: z.enum([
        'Willow',
        'Bamboo',
        'Pandanus',
        'Banana leaf',
        'Cardboard',
        'Wood',
        'Shroud',
        'Urn',
      ]),
      suitableFor: z.array(z.enum(['Burial', 'Cremation', 'Natural burial'])),
      biodegradable: z.boolean(),
      /** Indicative only. Ecoffins is trade-only, so real prices come from the client. */
      indicativePrice: z.number().nullable().default(null),
      summary: z.string(),
      order: z.number().default(50),
      /**
       * Drop a file in src/assets/coffins/ and reference it here, e.g.
       * `image: ../../assets/coffins/willow-traditional.jpg`. Until then the
       * pages render a plain placeholder rather than a broken image.
       * `imageAlt` is required whenever `image` is set — see the refine below.
       */
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** Who took or supplied the photograph, shown as a credit line. */
      imageCredit: z.string().optional(),
    })
    .refine((data) => !data.image || (data.imageAlt && data.imageAlt.length > 0), {
      message: 'imageAlt is required when an image is set — a coffin photo needs describing',
      path: ['imageAlt'],
    }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    /** Used for the <title> tag; keep under 60 characters. */
    seoTitle: z.string().optional(),
    description: z.string(),
    standfirst: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    /** Facts in these guides go stale. Re-check on this cadence. */
    reviewBy: z.coerce.date(),
    topic: z.enum([
      'When someone dies',
      'Money and paperwork',
      'Choosing a funeral',
      'Planning ahead',
      'Grief and support',
    ]),
    featured: z.boolean().default(false),
    order: z.number().default(50),
  }),
});

/** Shared shape for every directory entry — crematoria, cemeteries, registrars. */
const place = {
  name: z.string(),
  /** Council or operator responsible, e.g. "East Lothian Council". */
  operator: z.string(),
  street: z.string(),
  locality: z.string(),
  region: z.string(),
  /** Optional: many rural burial grounds have no postal address of their own. */
  postcode: z.string().optional(),
  phone: z.string().optional(),
  website: z.url().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  /** Broad area used to group entries on the index pages. */
  area: z.enum(['East Lothian', 'Midlothian', 'Edinburgh', 'Scottish Borders', 'West Lothian']),
  summary: z.string(),
  /**
   * Facility details change — opening hours, fees, chapel capacity. Rendered on
   * the page so readers can judge how fresh it is, and so an annual re-check
   * has something to sort by.
   */
  lastVerified: z.coerce.date(),
  distanceFromDunbarMiles: z.number().optional(),
};

const crematoria = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/crematoria' }),
  schema: z.object({
    ...place,
    chapelCapacity: z.number().optional(),
    serviceLengthMinutes: z.number().optional(),
    hasLivestream: z.boolean().optional(),
    hasGardenOfRemembrance: z.boolean().optional(),
  }),
});

const cemeteries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cemeteries' }),
  schema: z.object({
    ...place,
    type: z.enum(['Cemetery', 'Churchyard', 'Natural burial ground']),
    acceptsNewLairs: z.boolean().optional(),
    allowsNaturalBurial: z.boolean().default(false),
  }),
});

const registrars = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/registrars' }),
  schema: z.object({
    ...place,
    email: z.string().optional(),
    appointmentOnly: z.boolean().default(true),
    bookingUrl: z.url().optional(),
  }),
});

export const collections = { coffins, guides, crematoria, cemeteries, registrars };
