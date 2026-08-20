/**
 * CMA Standardised Price List and Additional Options Price List.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DO NOT REWORD ANYTHING MARKED "PRESCRIBED".
 *
 * The Funerals Market Investigation Order 2021 fixes the wording, the order and
 * the structure of the Standardised Price List. The CMA's guidance is explicit:
 * "No changes to the format of the Standardised Price List are permitted, except
 * those allowed in Part B of Schedule 1 to this Order."
 *
 * The whole point is that a bereaved family can put this list beside any other
 * funeral director's and compare it line for line. Paraphrasing it — even into
 * plainer English — breaks that and breaches the Order. Plain-English commentary
 * belongs AROUND the prescribed block on the page, never inside it.
 *
 * Template source: CMA Standardised Price List template, Schedule 1 to the Order.
 * Verified against CMA guidance for funeral directors with 4 or fewer branches
 * (gov.uk, updated 21 January 2025).
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * `confirmed` stays false until John Bald's own figures are supplied and signed
 * off. While false, the page renders a "prices being confirmed" notice instead of
 * numbers, so placeholder figures can never be published by accident.
 *
 * These must be John Bald's DUNBAR prices — not A & A Doyle's Galashiels prices.
 * Herkes currently publishes figures identical to Galashiels; Dunbar must not
 * inherit that. Publishing another branch's figures would breach the Order.
 *
 * The Order also requires that the individual attended-funeral item prices ADD UP
 * to the attended-funeral total, and that every item is greater than £0. There is
 * a build-time assertion for this at the foot of the file.
 */

type Money = number | null;

export const PRICING = {
  confirmed: false,
  effectiveFrom: 'TBC',
  lastReviewed: 'TBC',

  /**
   * PRESCRIBED — the standing preamble that heads the list.
   */
  preamble:
    'All funeral directors are legally required to publish this Price List for a ' +
    'standardised set of products and services. This is to help you think through your ' +
    'options and make choices, and to let you compare prices between different funeral ' +
    'directors (because prices can vary).',

  attended: {
    /** PRESCRIBED heading and description. */
    heading: "Attended Funeral (funeral director's charges only)",
    description:
      'This is a funeral where family and friends have a ceremony, event or service for ' +
      'the deceased person at the same time as they attend their burial or cremation.',

    /** Headline figure. Must equal the sum of `items` below. */
    total: null as Money,

    /**
     * PRESCRIBED — six items, this wording, this order. Each price must be > £0.
     *
     * Two items carry a slot the Order lets the funeral director complete:
     *   - `care` — where the deceased is kept (branch and/or non-branch premises)
     *   - `coffin` — the coffin description
     * Both are filled from `variables` below so the prescribed sentence stays intact.
     */
    items: [
      {
        id: 'arrangements',
        label: 'Taking care of all necessary legal and administrative arrangements',
        price: null as Money,
      },
      {
        id: 'collection',
        label:
          'Collecting and transporting the deceased person from the place of death ' +
          "(normally within 15 miles of the funeral director's premises) into the funeral " +
          "director's care",
        price: null as Money,
      },
      {
        id: 'care',
        label:
          'Care of the deceased person before the funeral in appropriate facilities. ' +
          'The deceased person will be kept at {care}',
        price: null as Money,
      },
      {
        id: 'coffin',
        label: 'Providing a suitable coffin – this will be made from {coffin}',
        price: null as Money,
      },
      {
        id: 'viewing',
        label:
          'Viewing of the deceased person for family and friends, by appointment with ' +
          'the funeral director (where viewing is requested by the customer)',
        price: null as Money,
      },
      {
        id: 'hearse',
        label:
          'At a date and time you agree with the funeral director, taking the deceased ' +
          'person direct to the agreed cemetery or crematorium (normally within 20 miles ' +
          "of the funeral director's premises) in a hearse or other appropriate vehicle",
        price: null as Money,
      },
    ],
  },

  /**
   * The two slots the Order permits the funeral director to complete.
   * NEEDS CLIENT CONFIRMATION before launch.
   */
  variables: {
    care: "the funeral director's branch premises",
    coffin: 'veneered chipboard with a fabric interior',
  },

  unattended: {
    /** PRESCRIBED heading and description. */
    heading: 'Unattended Funeral',
    description:
      'This is a funeral where family and friends may choose to have a ceremony, event ' +
      'or service for the deceased person, but they do not attend the burial or ' +
      'cremation itself.',

    /** PRESCRIBED line labels. `null` price renders as "Not offered" once confirmed. */
    burial: {
      label: "Burial (funeral director's charges only)",
      price: null as Money,
    },
    cremation: {
      label: "Cremation (funeral director's charges plus the cremation fee)",
      footnote: 2,
      price: null as Money,
    },
  },

  /**
   * PRESCRIBED — "Fees you must pay". These are third-party fees, shown as the
   * typical local range rather than a single figure.
   */
  feesYouMustPay: {
    heading: 'Fees you must pay',
    burial: {
      label: 'For an Attended or Unattended burial funeral, the burial fee.',
      footnote: 1,
      localLabel:
        'In this local area, the typical cost of the burial fee for local residents is:',
      low: null as Money,
      high: null as Money,
      note:
        'For a new grave, you will also need to pay for the plot; for an existing grave ' +
        'with a memorial in place, you may need to pay a removal/replacement fee. In ' +
        'addition, the cemetery may charge a number of other fees.',
    },
    cremation: {
      label: 'For an Attended cremation funeral, the cremation fee.',
      footnote: 2,
      localLabel:
        'In this local area, the typical cost of a cremation for local residents is:',
      low: null as Money,
      high: null as Money,
    },
  },

  /** PRESCRIBED — closing line of the price list proper. */
  religiousNote:
    'Please discuss any specific religious, belief-based and/or cultural requirements ' +
    'that you have with the funeral director.',

  /** PRESCRIBED — footnotes, numbered as in the template. */
  footnotes: [
    {
      n: 1,
      text:
        'This fee (which is sometimes called the interment fee) is the charge made for ' +
        'digging and closing a new grave, or for reopening and closing an existing grave.',
    },
    {
      n: 2,
      text:
        'In England, Wales and Northern Ireland, you will usually need to pay doctors’ ' +
        'fees as well. This is the charge for two doctors to sign the Medical ' +
        'Certificates for Cremation.',
    },
  ],

  /**
   * PRESCRIBED — "Additional Funeral Director Products and Services", the block
   * that closes the Standardised Price List. Distinct from the fuller Additional
   * Options Price List, which is a separate document on its own page.
   *
   * `mode` controls how the price renders:
   *   'money'    — a monetary value
   *   'onRequest' — the Order permits "Prices on request" for these two items
   */
  additionalProductsServices: {
    heading: 'Additional Funeral Director Products and Services',
    intro:
      'This funeral director may be able to supply a range of optional, additional ' +
      'products and services, or to arrange (on your behalf) for a third party to ' +
      'supply them. Examples include:',
    items: [
      { label: 'Additional mileage (price per mile)', mode: 'money', price: null as Money },
      {
        label:
          "Additional transfers of the deceased person's body (e.g. to their home, to a " +
          'place of worship etc.) (price per transfer)',
        mode: 'money',
        price: null as Money,
      },
      { label: 'Collection and delivery of ashes', mode: 'money', price: null as Money },
      { label: 'Embalming', mode: 'money', price: null as Money },
      {
        label: 'Funeral officiant (e.g. celebrant, minister of religion etc.)',
        mode: 'onRequest',
        price: null as Money,
      },
      {
        label: 'Services supplied outside of normal office hours',
        mode: 'onRequest',
        price: null as Money,
      },
    ],
    outro:
      'The funeral director can give you a full list of what they can supply. They are ' +
      'likely to charge for these additional products and services, so you may choose to ' +
      'take care of some arrangements without their involvement, or you can use a ' +
      'different supplier.',
  },
};

/**
 * Build-time guard for the two arithmetic rules the Order imposes on the
 * attended funeral: every item must be greater than £0, and the items must add
 * up to the headline total. Only runs once prices are confirmed — before that
 * the page renders a notice rather than figures, so there is nothing to check.
 *
 * Throwing here fails `npm run build`, which is deliberate: a Standardised Price
 * List whose parts do not sum to its total is a breach, and should never reach
 * the deployed site.
 */
if (PRICING.confirmed) {
  const items = PRICING.attended.items;

  const nonPositive = items.filter((i) => i.price === null || i.price <= 0);
  if (nonPositive.length > 0) {
    throw new Error(
      `Standardised Price List: every attended-funeral item must be greater than £0. ` +
        `Offending items: ${nonPositive.map((i) => i.id).join(', ')}`,
    );
  }

  const sum = items.reduce((acc, i) => acc + (i.price ?? 0), 0);
  if (PRICING.attended.total === null) {
    throw new Error('Standardised Price List: attended funeral total is missing.');
  }
  if (Math.abs(sum - PRICING.attended.total) > 0.005) {
    throw new Error(
      `Standardised Price List: attended-funeral items sum to £${sum.toFixed(2)} but the ` +
        `published total is £${PRICING.attended.total.toFixed(2)}. The Order requires ` +
        `these to match.`,
    );
  }
}

/**
 * The CMA Additional Options Price List — every product and service offered
 * beyond the Standardised Price List, itemised.
 *
 * The Order allows these to be shown as a fixed price, a "from" price, or a
 * range, which is why this is a looser structure than the list above.
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
      items: ['Additional limousine', 'Horse-drawn hearse', 'Alternative or specialist hearse'],
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
};
