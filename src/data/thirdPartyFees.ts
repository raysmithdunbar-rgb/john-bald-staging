/**
 * Fees charged by other people: crematoria, councils and celebrants.
 *
 * None of these are John Bald's prices. They are copied as published by each operator
 * from the price lists in C:/balds/Crem Ray.pdf (scanned copies, entered 13 Oct 2026), except the East Lothian and Scottish Borders burial charges and the Borders Crematorium list, which come from those operators' own websites (13 Oct 2026).
 * Each sheet carries the date its operator gave it, so a family can see how old it is.
 * When an operator issues a new list, change the figures and `effective` here and
 * nothing else: the directory pages and the Third-party fees page both read this file.
 *
 * Figures are kept as text, exactly as printed, so "No charge" and "£1,670.00" need no
 * special handling.
 */

export interface FeeRow {
  label: string;
  price: string;
  note?: string;
}

export interface FeeTable {
  title: string;
  note?: string;
  rows: FeeRow[];
}

export interface FeeSheet {
  /** Used for page anchors. */
  id: string;
  name: string;
  /** Who sets these fees. */
  setBy: string;
  /** The date the operator gave their list, as printed. */
  effective: string;
  /** What the figures include (VAT, surcharges), as printed. */
  basis?: string;
  /** The operator's own website, where the current list should be checked. */
  sourceUrl?: string;
  /** Short wording to link a family to the operator, e.g. "Houndwood Crematorium's website". */
  sourceLabel?: string;
  tables: FeeTable[];
  footnotes?: string[];
}

/* ─────────────────────────────── Crematoria ─────────────────────────────── */

const HOUNDWOOD: FeeSheet = {
  id: 'houndwood-crematorium',
  name: 'Houndwood Crematorium',
  setBy: 'The Crematorium and Memorial Group',
  effective: 'from 2 January 2026',
  sourceUrl: 'https://www.thecmg.co.uk/crematoria/houndwood-crematorium',
  sourceLabel: "the Crematorium and Memorial Group's website",
  tables: [
    {
      title: 'Cremation fees (90-minute service)',
      rows: [
        { label: 'Monday to Friday, 9.30am and 4.30pm', price: '£950' },
        {
          label: 'Monday to Friday, 10.30am, 12 noon, 1.30pm and 3pm',
          price: '£1,165',
        },
        { label: 'Saturday, 10.30am, 12 noon, 1.30pm and 3pm', price: '£1,165' },
      ],
    },
    {
      title: 'Other cremation fees',
      rows: [
        { label: 'Sunday service (60 minutes)', price: '£1,995' },
        { label: 'Unattended direct cremation', price: '£425' },
        { label: 'Attended direct cremation', price: '£795' },
        { label: 'Cremation of a child (18 or under)', price: 'No charge' },
        { label: 'Use of chapel', price: '£740' },
        { label: 'Provision of a bearer', price: '£25' },
        { label: 'Ashes scattering in the gardens of remembrance', price: 'No charge' },
        { label: 'Scattering of ashes from another crematorium', price: '£150' },
      ],
    },
  ],
  footnotes: [
    'All cremation fees include: use of the media system to play your music; a single tribute photo on screen; all administration and registration of the cremation; the certificate of cremation; use of the chapel; a container for the ashes (alternatives are available); scattering of ashes in the memorial gardens, with or without your family; and safe keeping of the ashes at the crematorium.',
  ],
};

const EAST_LOTHIAN_CREMATORIUM: FeeSheet = {
  id: 'east-lothian-crematorium',
  name: 'East Lothian Crematorium',
  setBy: 'Westerleigh Group',
  effective: 'from 1 April 2026',
  sourceUrl: 'https://www.eastlothiancrematorium.co.uk/',
  sourceLabel: "East Lothian Crematorium's website",
  tables: [
    {
      title: 'Cremation fees: attended services, Monday to Friday',
      note: 'Start times in brackets. 30-minute services include entry and exit; 60-minute services include entry and exit.',
      rows: [
        { label: '30-minute service (8.30am, 9am)', price: '£795' },
        { label: '60-minute service (9.30am)', price: '£950' },
        { label: '60-minute service (10.30am)', price: '£1,200' },
        { label: '60-minute service (11.30am, 12.30pm, 1.30pm, 2.30pm)', price: '£1,300' },
        { label: '60-minute service (3.30pm)', price: '£1,200' },
        { label: '60-minute service (4.30pm)', price: '£950' },
        { label: '30-minute service (5.30pm)', price: '£795' },
        { label: 'Twilight service, 60 minutes (6pm, 7pm, 8pm)', price: '£1,200' },
      ],
    },
    {
      title: 'Cremation fees: weekends and children',
      rows: [
        { label: 'Saturday service (60 minutes)', price: '£1,250' },
        { label: 'Sunday service (60 minutes)', price: '£1,750' },
        { label: 'Children (under 18 years)', price: 'No charge to the family' },
        {
          label: 'Additional 60 minutes in the chapel, on any of the above',
          price: '+£395',
        },
      ],
    },
    {
      title: 'Other cremation fees',
      rows: [
        { label: 'Chapel service only, 60 minutes', price: '£610' },
        { label: 'Additional chapel time, 60 minutes', price: '£395' },
        { label: 'Ashes exhumation', price: '£265' },
        { label: 'Scattering or interment of ashes from another crematorium', price: '£50' },
        { label: 'Provision of bearer', price: '£20' },
        {
          label:
            'Scattering or interment of ashes from another crematorium, with a purchase of a new memorial',
          price: 'No charge',
        },
        { label: 'Direct cremation (unattended, no mourners present)', price: '£585' },
      ],
    },
    {
      title: 'Tributes and media',
      rows: [
        { label: 'Themed Tribute (photo montage timed to music)', price: '£95' },
        { label: 'Signature Canvas Collection', price: '£150' },
        { label: 'Webcast, watched again for up to 28 days', price: '£70', note: 'A downloadable file is an additional £15.' },
        { label: 'Music Tribute (up to 25 photos set to music)', price: '£85' },
        { label: 'Basic Slideshow (up to 25 photos)', price: '£80' },
        { label: 'Family-supplied Tribute (your own video)', price: '£65' },
        { label: 'Additional photo', price: '£25' },
        { label: 'Each extra 25 photos', price: '£30' },
        { label: 'Additional support services', price: '£30' },
      ],
    },
    {
      title: 'Keepsakes',
      rows: [
        { label: 'Memory Box', price: '£130' },
        { label: 'Video Book', price: '£95' },
        { label: 'DVD/USB', price: '£65' },
        { label: 'Downloadable Visual Tribute', price: '£15' },
      ],
    },
  ],
  footnotes: [
    'All cremation fees include: use of the media system for your music; display of a single tribute photo; use of the chapel with a chapel attendant; administration and registration of the cremation; the certificate of cremation; preparation of the ashes for collection; environmental surcharge where applicable; care of the ashes for up to two months; a cardboard urn (alternatives are available); and scattering of ashes in the Garden of Remembrance, with or without your family.',
    'Memory Box and Video Book are only possible if a music tribute, visual tribute or slideshow is booked (not including a single photo). Direct cremation is carried out in line with Westerleigh Group’s Direct Cremation Protocol.',
  ],
};

const MORTONHALL: FeeSheet = {
  id: 'mortonhall-crematorium',
  name: 'Mortonhall Crematorium',
  setBy: 'The City of Edinburgh Council',
  effective: 'bereavement service charges 2026–27',
  basis: 'Total charge including VAT.',
  sourceUrl: 'https://www.edinburgh.gov.uk/burials-cremations/mortonhall-crematorium',
  sourceLabel: "the City of Edinburgh Council's website",
  tables: [
    {
      title: 'Cremation charges',
      rows: [
        {
          label: 'Adult, full service in the Main or Pentland Chapel (1 hour of chapel time, including a 40-minute service)',
          price: '£947',
        },
        {
          label: 'Adult, early full service in the Main Chapel (9am) or Pentland Chapel (9.30am), Monday to Friday',
          price: '£748',
        },
        { label: 'Adult, Saturday full service in the Main Chapel', price: '£1,121' },
        { label: 'Adult, Sunday full service in the Main Chapel', price: '£1,237' },
        {
          label: 'Adult, simple service in the Pentland Chapel (30 minutes of chapel time, including a 20-minute service)',
          price: '£646',
        },
        { label: 'Adult, direct through the chapel, no service or ceremony (not attended)', price: '£586' },
        { label: 'Adult, direct through the courtyard, no service or ceremony (not attended)', price: '£401' },
        { label: 'Child under 18, full service in the Main or Pentland Chapel', price: 'No fee' },
        { label: 'Memorial service only, Main or Pentland Chapel', price: '£454' },
        { label: 'Additional service time, per hour', price: '£315' },
        { label: 'Duplicate certificate of cremation', price: '£22' },
        { label: 'Council civil celebrant, per service', price: '£109' },
        { label: 'Organist hire, per service', price: '£56' },
      ],
    },
    {
      title: 'Tributes, recordings and keepsakes',
      rows: [
        { label: 'Halo photo (single image)', price: '£0' },
        { label: 'Photo tribute, up to 25 photos', price: '£55.20' },
        { label: 'Photo tribute with music, up to 25 photos', price: '£93.60' },
        { label: 'Themed tribute', price: '£126' },
        { label: 'Photo tribute, single (first photo free)', price: '£19.20' },
        { label: 'Family-supplied video checking', price: '£26.40' },
        { label: 'Bespoke tribute', price: '£634.80' },
        { label: 'Additional work charge, obituary', price: '£28.80' },
        { label: 'Additional photos, extra 25 (each)', price: '£24' },
        { label: 'Downloadable copy of visual tribute (recording of slideshow)', price: '£10.80' },
        { label: 'Downloadable copy of service (recording of service)', price: '£10.80' },
        { label: 'Digital download of service (stand-alone order)', price: '£55.20' },
        { label: 'Webcast of service with 28-day playback', price: '£72' },
        { label: 'DVD/USB of visual tribute (recording of slideshow)', price: '£24' },
        { label: 'DVD/USB of service (each)', price: '£64.80' },
        { label: 'Video book', price: '£126' },
        { label: 'Memory box', price: '£171.60' },
        { label: 'Additional keepsakes (DVD, USB) (recording of service)', price: '£28.80' },
        { label: 'Obituary bundle: halo photo, music slideshow, live and on-demand webcast, one keepsake', price: '£252' },
      ],
    },
  ],
  footnotes: ['These fees exclude funeral director charges and other statutory fees, such as death registration.'],
};

const WARRISTON_AND_SEAFIELD: FeeSheet = {
  id: 'warriston-seafield-crematoria',
  name: 'Warriston Crematorium and Seafield Cemetery Crematorium',
  setBy: 'Edinburgh Crematorium Limited',
  effective: 'price list from 1 April 2026',
  basis:
    'Marked * are inclusive of VAT. Marked ** are inclusive of the environmental surcharge. Marked *** include exempt and taxable elements.',
  sourceUrl: 'https://edinburghcrematorium.com/',
  sourceLabel: "Edinburgh Crematorium's website",
  tables: [
    {
      title: 'Crematorium',
      rows: [
        {
          label: 'Adult cremation fee: Warriston (Lorimer and Cloister Chapels) and Seafield',
          price: '£1,002 **',
        },
        { label: 'Adult cremation fee: Saturday service', price: '£1,139 **' },
        { label: 'Adult cremation fee: no service cremation', price: '£446 **' },
        { label: 'Child cremation fee: under 18 years', price: 'No charge' },
        { label: 'Additional period', price: '£47' },
        { label: 'Memorial service', price: '£437 *' },
        { label: 'Organist fee (Seafield and Warriston)', price: '£53' },
      ],
    },
    {
      title: 'Media and visual tributes',
      rows: [
        { label: 'Webcast of service with 28-day playback', price: '£77' },
        { label: 'DVD/USB of service (first copy)', price: '£70 *' },
        { label: 'Additional copy of DVD/USB', price: '£30 *' },
        { label: 'Visual tribute, single (first photo free)', price: '£23 *' },
        { label: 'Visual tribute, slide show, 25 images', price: '£48 *' },
        { label: 'Visual tribute, slide show, 25 images and music', price: '£93 *' },
        { label: 'Additional images, 25 maximum', price: '£27 *' },
        {
          label: 'Additional family video (only applies in addition to other visual tributes)',
          price: '£30 *',
          note: 'If only a family video is required, the visual tribute fee of £48 applies.',
        },
        { label: 'Extra work and editing', price: '£27 *' },
        { label: 'Late fee', price: '£27 *' },
        { label: 'Video book', price: '£110 *' },
        { label: 'Memory box', price: '£150 *' },
        {
          label: 'Download copy of visual tribute or webcast, when ordered alongside other tributes',
          price: '£13 *',
        },
        { label: 'Download copy of recorded service, when ordered as a standalone product', price: '£53 *' },
      ],
    },
    {
      title: 'Miscellaneous',
      rows: [
        { label: 'Storage of coffin, per night', price: '£52 *' },
        { label: 'Dispersal of ashes from another crematorium', price: '£215' },
        { label: 'Scatter tube', price: '£18 *' },
      ],
    },
    {
      title: 'Seafield Cemetery: lairs and interments',
      rows: [
        { label: 'Lair for 3 interments', price: '£1,605' },
        { label: 'Lair for 2 interments', price: '£1,437' },
        { label: 'Lair for cremated remains', price: '£945' },
        { label: 'Garden of Remembrance lair', price: '£1,263' },
        { label: 'Interment of cremation casket, Garden of Remembrance', price: '£298' },
        { label: 'Interment, adult', price: '£1,185' },
        { label: 'Interment, child under 18 years', price: 'No charge' },
        { label: 'Interment, cremation casket', price: '£298' },
      ],
    },
    {
      title: 'Seafield Cemetery: courtyard',
      rows: [
        { label: 'Chamber in mausoleum', price: '£4,989 ***' },
        { label: 'Burial chamber', price: '£7,563 ***' },
        { label: 'Lair for cremated remains', price: '£2,381 ***' },
        { label: 'Chamber for cremated remains (25-year lease)', price: '£1,417 ***' },
        { label: 'Niche for cremated remains (25-year lease)', price: '£760 ***' },
        { label: 'Foundation for monument', price: '£389 *' },
        { label: 'Placing of ornaments', price: '£164 *' },
        { label: 'Use of chapel prior to interment in Seafield Cemetery', price: '£308' },
        { label: 'Additional lettering in courtyard lairs and chambers', price: '£6 *' },
      ],
    },
  ],
};

const BORDERS: FeeSheet = {
  id: 'borders-crematorium',
  name: 'Borders Crematorium',
  setBy: 'Westerleigh Group',
  effective: 'from 1 April 2026',
  sourceUrl: 'https://www.borderscrem.co.uk/prices.php',
  sourceLabel: "Borders Crematorium's price page",
  tables: [
    {
      title: 'Cremation fees: attended services, Monday to Friday',
      note: 'Start times in brackets. All include entry and exit.',
      rows: [
        { label: '30-minute service (8.30am, 9am)', price: '£795' },
        { label: '60-minute service (9.30am)', price: '£945' },
        { label: '60-minute service (10.30am)', price: '£1,195' },
        { label: '60-minute service (11.30am, 12.30pm, 1.30pm, 2.30pm)', price: '£1,295' },
        { label: '60-minute service (3.30pm)', price: '£1,195' },
        { label: '60-minute service (4.30pm)', price: '£945' },
        { label: '30-minute service (5.30pm)', price: '£795' },
        { label: 'Twilight service, 60 minutes (6pm, 7pm, 8pm)', price: '£1,195' },
      ],
    },
    {
      title: 'Cremation fees: weekends and children',
      rows: [
        { label: 'Saturday service (60 minutes)', price: '£1,300' },
        { label: 'Sunday service (60 minutes)', price: '£1,750' },
        { label: 'Children (under 18 years)', price: 'No charge to the family' },
        { label: 'Additional 60 minutes in the chapel, on any of the above', price: '+£395' },
      ],
    },
    {
      title: 'Other cremation fees',
      rows: [
        { label: 'Chapel service only, 60 minutes', price: '£610' },
        { label: 'Additional chapel time, 60 minutes', price: '£395' },
        { label: 'Ashes exhumation', price: '£265' },
        { label: 'Scattering or interment of ashes from another crematorium', price: '£50' },
        { label: 'Provision of bearer', price: '£20' },
        {
          label:
            'Scattering or interment of ashes from another crematorium, with a purchase of a new memorial',
          price: 'No charge',
        },
        { label: 'Direct cremation (unattended, no mourners present)', price: '£585' },
      ],
    },
    {
      title: 'Tributes and media',
      rows: [
        { label: 'Webcast, watched again for up to 28 days', price: '£70', note: 'A downloadable file is an additional £15.' },
        { label: 'Music Tribute (up to 25 photos set to music)', price: '£85' },
        { label: 'Themed Tribute (photo montage timed to music)', price: '£95' },
        { label: 'Basic Slideshow (up to 25 photos)', price: '£80' },
        { label: 'Family-supplied Tribute (your own video)', price: '£65' },
        { label: 'Additional single photo', price: '£25' },
        { label: 'Each extra 25 photos', price: '£30' },
        { label: 'Additional support services', price: '£30' },
      ],
    },
    {
      title: 'Keepsakes',
      rows: [
        { label: 'Memory Box', price: '£130' },
        { label: 'Video Book', price: '£95' },
        { label: 'DVD/USB', price: '£65' },
        { label: 'Downloadable Visual Tribute', price: '£15' },
      ],
    },
  ],
  footnotes: [
    'All cremation fees include: use of the media system for your music; display of a single tribute photo; use of the chapel with a chapel attendant; administration and registration of the cremation; the certificate of cremation; preparation of the ashes for collection; a cardboard urn (alternatives are available); scattering of ashes in the Garden of Remembrance, with or without your family; care of the ashes for up to two months; and the environmental surcharge where applicable.',
    'Memory Box and Video Book are only possible if a music tribute, visual tribute or slideshow is booked (not including a single photo). Direct cremation is carried out in line with Westerleigh Group’s Direct Cremation Protocol.',
  ],
};

/** Keyed by the crematorium's id in src/content/crematoria. */
export const CREMATORIUM_FEES: Record<string, FeeSheet> = {
  'borders-crematorium': BORDERS,
  'houndwood-crematorium': HOUNDWOOD,
  'east-lothian-crematorium': EAST_LOTHIAN_CREMATORIUM,
  'mortonhall-crematorium': MORTONHALL,
  'warriston-crematorium': WARRISTON_AND_SEAFIELD,
  'seafield-crematorium': WARRISTON_AND_SEAFIELD,
};

/** Crematoria on the fees page, in the order shown (Warriston and Seafield share a list). */
export const CREMATORIUM_SHEETS: FeeSheet[] = [
  HOUNDWOOD,
  EAST_LOTHIAN_CREMATORIUM,
  BORDERS,
  MORTONHALL,
  WARRISTON_AND_SEAFIELD,
];

/* ───────────────────────────── Council burial fees ───────────────────────────── */

export const EAST_LOTHIAN_BURIAL: FeeSheet = {
  id: 'east-lothian-council-burial',
  name: 'East Lothian Council burial charges',
  setBy: 'East Lothian Council',
  effective: 'as shown on the council’s website on 13 October 2026 (the council gives no start date)',
  basis: 'Items marked * are subject to VAT at the current rate.',
  sourceUrl:
    'https://www.eastlothian.gov.uk/births-ceremonies-and-deaths/death-and-burial-services/burial-services-and-memorials/burial-ground-charges',
  sourceLabel: "East Lothian Council's burial charges page",
  tables: [
    {
      title: 'Lairs',
      rows: [
        { label: 'Purchase of lair for coffin remains', price: '£1,170' },
        { label: 'Purchase of lair for cremated remains', price: '£512' },
        { label: 'Cost of lair, re-issue or replacement (administration)', price: '£88' },
      ],
    },
    {
      title: 'Interment fees',
      rows: [
        { label: 'Interment of adult', price: '£1,100' },
        { label: 'Adult, Friday (after 10.30am)', price: '£1,649' },
        { label: 'Adult, Saturday', price: '£1,649' },
        { label: 'Adult, Sunday or public holiday', price: '£2,200' },
        { label: 'Interment of cremated remains', price: '£287' },
        { label: 'Cremated remains, Saturday', price: '£431' },
        { label: 'Cremated remains, Sunday or public holiday', price: '£574' },
      ],
    },
    {
      title: 'Surcharges',
      rows: [
        { label: 'Extra depth, per foot beyond 6 feet, per additional interment', price: '£165' },
        { label: 'Service of lair excavated on a weekday', price: '£1,170' },
        { label: 'Service of lair excavated on a Saturday', price: '£1,649' },
        { label: 'Service of lair excavated on a Sunday or public holiday', price: '£2,200' },
        { label: 'Outwith area surcharge on lair (one or two interments)', price: '£1,754' },
        { label: 'Outwith area extra depth, per foot beyond 6 feet, per additional interment', price: '£240' },
        { label: 'Outwith area surcharge, ashes only', price: '£768' },
        { label: 'Outwith area surcharge on interments', price: '£1,100' },
        { label: 'Test dig of a lair', price: '£350' },
      ],
    },
    {
      title: 'Searches and memorial stones',
      rows: [
        {
          label: 'Search of records relating to family history or title deeds (1 hour minimum) *',
          price: '£56',
        },
        { label: 'Cost of foundation, charged on application to erect *', price: '£237' },
        { label: 'Maintenance *', price: '£159' },
      ],
    },
  ],
  footnotes: [
    'Any service outwith normal hours will be at the discretion of the council and may incur a higher charge.',
  ],
};

export const SCOTTISH_BORDERS_BURIAL: FeeSheet = {
  id: 'scottish-borders-council-burial',
  name: 'Scottish Borders Council burial fees',
  setBy: 'Scottish Borders Council',
  effective: 'as shown on the council’s website on 13 October 2026 (the council gives no start date)',
  basis:
    'Memorial bench and tree prices include VAT. Headstone foundation prices have 20% VAT added. The council does not mention VAT for the other charges. Each interment total includes a £87 administration fee.',
  sourceUrl: 'https://www.scotborders.gov.uk/burials-cemeteries/burial-fees-charges',
  sourceLabel: "Scottish Borders Council's burial fees page",
  tables: [
    {
      title: 'Purchase of ground',
      rows: [
        {
          label: 'Lair for one or two interments',
          price: '£2,086.60',
          note: 'Lair £1,682, title deed £77, foundation fee £327.60.',
        },
        {
          label: 'Lair for cremation caskets (up to four)',
          price: '£2,086.60',
          note: 'Lair £1,682, title deed £77, foundation fee £327.60.',
        },
        {
          label: 'Woodland burial land (includes a tree and marker)',
          price: '£1,759',
          note: 'Lair £1,682, title deed £77.',
        },
      ],
    },
    {
      title: 'Interments, weekday',
      rows: [
        { label: 'Adult (first interment, or re-open)', price: '£1,147', note: 'Coffin burial £1,060 plus £87 administration.' },
        { label: 'Woodland burial interment', price: '£1,147', note: 'Coffin burial £1,060 plus £87 administration.' },
        { label: 'Cremation casket', price: '£441', note: 'Ashes £354 plus £87 administration.' },
      ],
    },
    {
      title: 'Interments, Saturday',
      note: 'The last interment is at 10.30am.',
      rows: [
        { label: 'Adult', price: '£1,450', note: 'Coffin burial £1,239 plus £87 administration.' },
        { label: 'Cremation casket', price: '£643', note: 'Ashes £556 plus £87 administration.' },
      ],
    },
    {
      title: 'Interments, Sunday, public holiday or outside seasonal working hours',
      rows: [
        { label: 'Adult', price: '£1,882', note: 'Coffin burial £1,795 plus £87 administration.' },
        { label: 'Cremation casket', price: '£806', note: 'Ashes £719 plus £87 administration.' },
      ],
    },
    {
      title: 'If the person who died lived outside the Scottish Borders',
      note: 'The council adds a non-resident fee of 50%. These are the council’s totals.',
      rows: [
        { label: 'Purchase of ground', price: '£2,927.60' },
        { label: 'Purchase of woodland lair', price: '£2,600' },
        { label: 'Adult interment, weekday', price: '£1,677' },
        { label: 'Cremation casket, weekday', price: '£618' },
        { label: 'Adult interment, Saturday', price: '£2,131.50' },
        { label: 'Cremation casket, Saturday', price: '£921' },
        { label: 'Adult interment, Sunday, public holiday or outside seasonal working hours', price: '£2,779.50' },
        { label: 'Cremation casket, Sunday, public holiday or outside seasonal working hours', price: '£1,165.50' },
      ],
    },
    {
      title: 'Other charges',
      rows: [
        { label: 'Selling a lair back to the council', price: '50% of price paid, or £125 minimum' },
        { label: 'Test dig a lair', price: '£1,060' },
        { label: 'Marking a grave for placement of a small memorial', price: '£142' },
        { label: 'Scattering ashes', price: '£86' },
        { label: 'Installing a memorial bench (per bench)', price: '£330' },
        { label: 'Memorial tree', price: '£264' },
        { label: 'Attending a pre-purchase site meeting to choose a lair', price: '£55' },
        { label: 'Re-issue of lair certificate', price: '£77' },
        { label: 'Burial search, first hour', price: '£69' },
        { label: 'Burial search, second hour', price: '£69' },
        { label: 'Burial search, each additional hour', price: '£16.50' },
        { label: 'Headstone foundation: marking out, excavating and laying', price: '£273 + 20% VAT' },
        { label: 'Headstone foundation: marking out and excavating only', price: '£231 + 20% VAT' },
      ],
    },
  ],
};

export const EDINBURGH_BURIAL: FeeSheet = {
  id: 'city-of-edinburgh-council-burial',
  name: 'City of Edinburgh Council burial and memorial charges',
  setBy: 'The City of Edinburgh Council',
  effective: 'bereavement service charges 2026–27',
  basis: 'Total charge including VAT.',
  sourceUrl: 'https://www.edinburgh.gov.uk/burials-cremations',
  sourceLabel: "the City of Edinburgh Council's website",
  tables: [
    {
      title: 'Full coffin burial',
      rows: [
        { label: 'Right of burial with certificate', price: '£1,670' },
        { label: 'Right of green burial with certificate', price: '£1,775' },
        { label: 'Duplicate certificate of right of burial', price: '£110' },
        { label: 'Transfer of certificate of right of burial', price: '£110' },
        { label: 'Adult interment', price: '£1,457' },
        { label: 'Adult interment, Saturday until 11am (Sunday fees apply after)', price: '£1,838' },
        { label: 'Adult interment, Sunday or public holiday', price: '£2,042' },
        { label: 'Double adult interment', price: '£2,200' },
        { label: 'Double adult interment, Saturday', price: '£2,491' },
        { label: 'Double adult interment, Sunday or public holiday', price: '£2,816' },
        { label: 'Child interment (up to 18 years)', price: 'No fee' },
        { label: 'Test dig a grave for depth', price: '£467' },
        { label: 'Board for grave', price: '£202' },
        { label: 'Exhumation including screening', price: '£4,736' },
      ],
    },
    {
      title: 'Cremated remains casket burial',
      rows: [
        { label: 'Right of burial with certificate', price: '£984' },
        { label: 'Adult interment', price: '£310' },
        { label: 'Adult interment, Saturday until 11am (Sunday fees apply after)', price: '£443' },
        { label: 'Adult interment, Sunday or public holiday', price: '£494' },
        { label: 'Double adult interment', price: '£467' },
        { label: 'Double adult interment, Saturday', price: '£557' },
        { label: 'Double adult interment, Sunday or public holiday', price: '£647' },
        { label: 'Triple adult interment', price: '£630' },
        { label: 'Exhumation including screening', price: '£630' },
        { label: 'Garden of Remembrance, with attendance, Monday to Friday 12 noon', price: '£270' },
        { label: 'Garden of Remembrance, with attendance, Monday to Friday 12 noon, double', price: '£407' },
        { label: 'Garden of Remembrance, with attendance, Saturday until 11am', price: '£316' },
        { label: 'Garden of Remembrance, at a particular place at the applicant’s request, no attendance', price: '£91' },
        { label: 'Garden of Remembrance, cremation at Mortonhall, no attendance', price: 'No fee' },
        { label: 'Garden of Remembrance, cremation not at Mortonhall', price: '£270' },
      ],
    },
    {
      title: 'Burial monuments and memorials',
      rows: [
        { label: 'Provision of concrete foundation, adult', price: '£512.40' },
        { label: 'Provision of double concrete foundation, adult', price: '£647' },
        { label: 'Preparation where memorials require no foundation', price: '£164.40' },
        { label: 'Refix dowels', price: '£190.80' },
        { label: 'Refix dowels and new foundation', price: '£290.40' },
        { label: 'Baby memorial plaque', price: '£84' },
        { label: 'Genealogy search, per hour (minimum one hour)', price: '£30' },
      ],
    },
    {
      title: 'Plaques: 5, 10 and 20-year leases',
      note: 'The first five lines apply to the Woodland Walkway plaque and to plaques in the Cemetery Vault for 4. The Cemetery Vault for 2 has its own prices, shown last.',
      rows: [
        { label: 'Plaque with lettering, 5-year lease', price: '£852' },
        { label: 'Plaque with lettering, 10-year lease', price: '£1,405.20' },
        { label: 'Plaque with lettering, 20-year lease', price: '£2,034' },
        { label: 'Renewal of lease, 10 years', price: '£674.40' },
        { label: 'Replacement plaque with inscription', price: '£333.60' },
        { label: 'Cemetery Vault for 2: plaque with lettering, 5-year lease', price: '£823.20' },
        { label: 'Cemetery Vault for 2: plaque with lettering, 10-year lease', price: '£1,152' },
        { label: 'Cemetery Vault for 2: plaque with lettering, 20-year lease', price: '£1,448.40' },
      ],
    },
    {
      title: 'Books of Remembrance and other memorials',
      rows: [
        { label: 'Book of Remembrance: 2-line entry', price: '£110.40' },
        { label: 'Book of Remembrance: 5-line entry', price: '£168' },
        { label: 'Book of Remembrance: 8-line entry', price: '£224.40' },
        { label: 'Book of Remembrance: motif', price: '£116.40' },
        { label: 'Remembrance cards, maximum 8 lines', price: '£49.20' },
        { label: 'Miniature Book of Remembrance, maximum 8 lines', price: '£139.20' },
        { label: 'Baby Book of Remembrance: 5-line entry', price: '£44.40' },
        { label: 'Baby Book of Remembrance: motif', price: '£56.40' },
        { label: 'Baby Book of Remembrance: 5-line entry, cremation not at Mortonhall', price: '£99.60' },
        { label: 'Shared Tree Memorial: plaque, 5-year lease', price: '£266.40' },
        { label: 'Shared Tree Memorial: plaque, 10-year lease', price: '£399.60' },
        { label: 'Shared Granite Bench: plaque, 5-year lease', price: '£242.40' },
        { label: 'Shared Granite Bench: plaque, 10-year lease', price: '£362.40' },
        { label: 'Memorial Walkway plaque, 5-year lease', price: '£434.40' },
        { label: 'Memorial Walkway plaque, 10-year lease', price: '£652.80' },
        { label: 'Hexagonal Pavilion (Columbarium) plaque, 5-year lease', price: '£579.60' },
        { label: 'Hexagonal Pavilion (Columbarium) plaque, 10-year lease', price: '£870' },
        { label: 'Niche Wall plaque, 5-year lease', price: '£652.80' },
        { label: 'Niche Wall plaque, 10-year lease', price: '£979.20' },
      ],
    },
  ],
  footnotes: [
    'These fees exclude funeral director charges and other statutory fees, such as death registration.',
    'Some renewal and replacement plaque lines are not shown here. The council’s own list has every line.',
  ],
};

/** Keyed by the cemetery's id in src/content/cemeteries. */
export const CEMETERY_FEES: Record<string, FeeSheet> = {
  'dunbar-cemetery': EAST_LOTHIAN_BURIAL,
  'haddington-cemetery': EAST_LOTHIAN_BURIAL,
  'north-berwick-cemetery': EAST_LOTHIAN_BURIAL,
  'tranent-cemetery': EAST_LOTHIAN_BURIAL,
  'duns-cemetery': SCOTTISH_BORDERS_BURIAL,
  'eyemouth-cemetery': SCOTTISH_BORDERS_BURIAL,
};

/* ─────────────────────────────── Celebrants ─────────────────────────────── */

export const CELEBRANT_FEES: { effective: string; rows: FeeRow[] } = {
  effective: '4 August 2026',
  rows: [
    { label: 'Civil celebrant Chris Lerpiniere', price: '£225' },
    { label: 'Civil celebrant Ben Foreman', price: '£275' },
    { label: 'Civil celebrant Gill Coltman', price: '£280' },
    { label: 'Civil celebrant Sarah Bamford', price: '£270' },
    { label: 'Humanist Ailsa McMillan', price: '£225' },
    { label: 'Humanist Stewart Allan', price: '£220' },
    { label: 'Civil celebrant Rachel Henderson', price: '£250' },
    { label: 'Civil celebrant Gaynor Hogg', price: '£250' },
    { label: 'Civil celebrant Gina Williams', price: '£250' },
  ],
};
