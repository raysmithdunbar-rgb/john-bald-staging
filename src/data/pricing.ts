/**
 * Prices for the CMA Standardised Price List.
 *
 * IMPORTANT: `confirmed` is false until John Bald's own figures have been
 * supplied and signed off by the client. While it is false, the price list
 * pages render a "prices being confirmed" notice instead of the numbers, so
 * placeholder figures can never be published by accident.
 *
 * These must be John Bald's Dunbar prices — NOT A & A Doyle's Galashiels
 * prices. Publishing another branch's figures would breach the Funerals
 * Market Investigation Order 2021.
 *
 * The structure below follows the format the Order prescribes. Do not
 * reorder or rename the headline items: the whole point of the standardised
 * list is that families can compare it line-for-line against any other
 * funeral director's.
 */

export const PRICING = {
  confirmed: false,
  effectiveFrom: 'TBC',
  lastReviewed: 'TBC',

  /**
   * The CMA "attended funeral" — a funeral where family and friends are present.
   * `total` is the headline figure families compare on.
   */
  attended: {
    total: null as number | null,
    includes: [
      'Collecting the person who has died and bringing them into our care, at any hour',
      'Caring for them at our funeral home before the funeral',
      'A coffin suitable for burial or cremation',
      'A hearse to the funeral, within our normal area',
      'All arrangements, paperwork and liaison with the crematorium, cemetery or church',
      'A member of our staff present throughout the funeral',
      'Visiting the person who has died, at times we agree with you',
    ],
    excludes: [
      'The crematorium or burial fee',
      'The fee for a minister, celebrant or other person conducting the service',
      'Flowers, notices, orders of service and catering',
      'Additional cars for family',
      'Memorials and headstones',
    ],
  },

  /**
   * The CMA "unattended funeral" — a direct cremation or direct burial with
   * nobody present.
   */
  unattended: {
    total: null as number | null,
    includes: [
      'Collecting the person who has died and bringing them into our care, at any hour',
      'Caring for them at our funeral home',
      'A simple coffin suitable for cremation',
      'All arrangements and paperwork',
      'Taking them to the crematorium at a time we arrange',
      'The cremation fee',
      'Returning the ashes to you',
    ],
    excludes: ['Any service, and any attendance by family or friends'],
  },

  /**
   * Third-party fees we pay on your behalf and pass on without markup.
   * These are set by councils and crematoria, not by us, and usually change
   * each April.
   */
  thirdParty: [
    { name: 'Cremation fee', note: 'Set by the crematorium. No charge for anyone under 18.' },
    {
      name: 'Burial: purchase of a new lair',
      note: 'Set by East Lothian Council or Scottish Borders Council.',
    },
    {
      name: 'Burial: interment fee',
      note: 'Set by the council. No charge for anyone under 18.',
    },
    { name: 'Minister, priest or celebrant', note: 'Set by the person conducting the service.' },
  ],
} as const;

/**
 * The CMA Additional Options Price List. Every item a family might choose
 * beyond the headline funeral, itemised, so nothing is a surprise on the
 * invoice.
 */
interface OptionGroup {
  title: string;
  note?: string;
  items: string[];
}

export const ADDITIONAL_OPTIONS: { confirmed: boolean; groups: OptionGroup[] } = {
  confirmed: false,
  groups: [
    {
      title: 'Coffins',
      note: 'Our full range, including the eco range, is shown on our coffins page.',
      items: [
        'Traditional veneered coffin',
        'Solid wood coffin',
        'Woven willow, bamboo, pandanus or banana leaf',
        'Recycled cardboard',
        'Shroud',
      ],
    },
    {
      title: 'Cars',
      items: [
        'Additional limousine',
        'Horse-drawn hearse',
        'Alternative or specialist hearse',
      ],
    },
    {
      title: 'On the day',
      items: [
        'Flowers',
        'Orders of service',
        'Notices in local and national newspapers',
        'Recording or livestreaming the service',
        'Catering and venue hire',
      ],
    },
    {
      title: 'Care of the person who has died',
      items: [
        'Embalming, where you or the circumstances require it',
        'Dressing in their own clothes',
        'Additional or out-of-area collection',
      ],
    },
    {
      title: 'Afterwards',
      items: [
        'Urns and ashes caskets',
        'Scattering or interment of ashes',
        'Headstones, plaques and memorials',
        'Keepsake jewellery and glass memorials',
      ],
    },
  ],
} as const;
