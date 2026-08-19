/**
 * Single source of truth for NAP (name, address, phone) and business facts.
 * Every page, schema block and footer reads from here so the Countess Crescent
 * move is a one-file change rather than a site-wide find-and-replace.
 */

export const SITE = {
  name: 'John Bald Funeral Directors',
  /** Brand token used to detect whether a page title already carries the name. */
  shortName: 'John Bald',
  /**
   * Matches the wording in the header logo artwork. The old site's Open Graph
   * title used "Our Family Helping Yours" — retired, client-confirmed
   * August 2026. Keep this in step with the logo if the artwork is ever redrawn.
   */
  tagline: 'The trusted local choice',
  url: 'https://www.johnbaldfunerals.com',
  parentCompany: 'A & A Doyle Ltd',
  foundedYear: 1972,
  description:
    'Independent funeral directors in Dunbar, caring for families across East Lothian and Berwickshire for over 50 years. Available day or night.',
} as const;

/**
 * NEEDS CLIENT CONFIRMATION: full street number and postcode for Countess
 * Crescent, plus the date the move completes. `moveComplete` flips the site
 * from "we are moving" messaging to the new address as the sole NAP.
 */
export const ADDRESS = {
  moveComplete: false,

  current: {
    street: "Queen's Road",
    locality: 'Dunbar',
    region: 'East Lothian',
    postcode: 'EH42 1LJ',
    country: 'GB',
  },

  future: {
    street: 'Countess Crescent',
    locality: 'Dunbar',
    region: 'East Lothian',
    postcode: 'EH42', // TODO: full postcode from client
    country: 'GB',
  },
} as const;

export const ACTIVE_ADDRESS = ADDRESS.moveComplete ? ADDRESS.future : ADDRESS.current;

export const CONTACT = {
  phone: '01368 863636',
  phoneHref: 'tel:+441368863636',
  email: 'office@johnbaldfunerals.com',
  hours: 'Available 24 hours a day, every day of the year',
} as const;

/**
 * Supplied August 2026. The profile.php?id= form is the page's canonical
 * address — Facebook only issues a vanity /name URL once a page passes its
 * follower threshold, so this is the stable one to cite. Also emitted as
 * `sameAs` in the FuneralHome schema, which is what ties the page to the
 * business as an entity rather than leaving it an unattached profile.
 */
export const SOCIAL = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=100063864257057',
  },
] as const;

/**
 * Approximate centre of Dunbar. Replace with the exact Countess Crescent
 * coordinates once the address is confirmed — these feed LocalBusiness schema
 * and the local pack.
 */
export const GEO = {
  latitude: 56.0019,
  longitude: -2.5157,
} as const;

export const SERVICE_AREA = [
  'Dunbar',
  'East Linton',
  'Haddington',
  'North Berwick',
  'Tranent',
  'Gullane',
  'Berwickshire',
  'Eyemouth',
  'Duns',
  'Coldstream',
] as const;

/**
 * NEEDS CLIENT CONFIRMATION: the marketing audit records NAFD #3017 and
 * SAIF #2410 against A & A Doyle Ltd. Do not surface these badges on the
 * John Bald site until it is confirmed the Dunbar branch is covered by those
 * memberships. `verified: false` keeps them out of the rendered output.
 */
export const MEMBERSHIPS = [
  { name: 'National Association of Funeral Directors', abbr: 'NAFD', number: '3017', verified: false },
  { name: 'Scottish Association of Independent Funeral Directors', abbr: 'SAIF', number: '2410', verified: false },
] as const;

export const GOLDEN_CHARTER = {
  name: 'Golden Charter',
  /**
   * Deliberately not linked from the site. Golden Charter sells plans direct
   * to the public as well as through its funeral directors, so an outbound
   * link hands them the enquiry. Kept here because the schema and the FCA
   * wording still need to identify the provider. Do not re-link.
   */
  url: 'https://www.goldencharter.co.uk/',
  fcaNumber: '965279',
  /** Golden Charter is the FCA-regulated plan provider; John Bald is the funeral director who carries out the funeral. */
  regulatoryNote:
    'Golden Charter Limited is authorised and regulated by the Financial Conduct Authority (Firm Reference Number 965279). You can check this on the Financial Services Register at register.fca.org.uk.',
} as const;
