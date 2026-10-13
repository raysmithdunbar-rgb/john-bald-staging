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
 * ── Provenance of these figures (updated 13 Oct 2026) ───────────────────────
 *
 * John Bald's OWN Standardised Price List, from the scanned price lists Ray was
 * given (C:/balds/Crem Ray.pdf, page 3). The scan is undated.
 *   - Attended funeral, unattended burial, unattended cremation range and the
 *     "additional products and services" lines are exactly as John Bald prints them,
 *     except the officiant line, which follows the newer celebrant fee list in the
 *     same file (4 Aug 2026: £220 to £280).
 *   - "Fees you must pay" (burial and cremation) are THIRD-PARTY fees. John Bald's
 *     printed figures were out of date against the council and crematorium lists in
 *     the same file, so these come from those lists instead (see the notes beside
 *     each figure). Check them with Bruce Robertson before launch.
 *
 * Replaces the earlier A & A Doyle (Galashiels) figures, which were the wrong
 * source: John Bald's own Dunbar prices are lower (£2,565, not £2,801).
 *
 * Where the printed sheet shows "from £325" (coffin) or "No additional charge"
 * (viewing), the Order requires a monetary value on the Standardised Price List, so
 * the coffin is shown as £325 and viewing as £0.00. NEEDS CLIENT CONFIRMATION.
 *
 * The Order requires the individual attended-funeral item prices to ADD UP to the
 * attended-funeral total. That is asserted at the foot of this file. The assertion
 * throws during `npm run build`, so a list that does not add up cannot reach the
 * deployed site.
 */

type Money = number | null;

export const PRICING = {
  confirmed: true,
  effectiveFrom: 'October 2026',
  lastReviewed: 'October 2026',

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

    /**
     * Headline figure. Must equal the sum of `items` below — asserted at build time.
     */
    total: 2565 as Money,

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
        price: 1495 as Money,
      },
      {
        id: 'collection',
        label:
          'Collecting and transporting the deceased person from the place of death ' +
          "(normally within 15 miles of the funeral director's premises) into the funeral " +
          "director's care",
        price: 300 as Money,
      },
      {
        id: 'care',
        label:
          'Care of the deceased person before the funeral in appropriate facilities. ' +
          'The deceased person will be kept at {care}',
        price: 150 as Money,
      },
      {
        id: 'coffin',
        label: 'Providing a suitable coffin – this will be made from {coffin}',
        price: 325 as Money,
      },
      {
        id: 'viewing',
        label:
          'Viewing of the deceased person for family and friends, by appointment with ' +
          'the funeral director (where viewing is requested by the customer)',
        price: 0 as Money,
      },
      {
        id: 'hearse',
        label:
          'At a date and time you agree with the funeral director, taking the deceased ' +
          'person direct to the agreed cemetery or crematorium (normally within 20 miles ' +
          "of the funeral director's premises) in a hearse or other appropriate vehicle",
        price: 295 as Money,
      },
    ],
  },

  /**
   * The two slots the Order permits the funeral director to complete.
   * NEEDS CLIENT CONFIRMATION before launch.
   */
  variables: {
    care: "the funeral director's branch premises",
    coffin: 'engineered wood or enviro-board',
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
      price: 995 as Money,
    },
    cremation: {
      label: "Cremation (funeral director's charges plus the cremation fee)",
      footnote: 2,
      /** John Bald prints a range, £995 to £1,400, depending on the crematorium. */
      price: 995 as Money,
      priceHigh: 1400 as Money,
    },
  },

  /**
   * PRESCRIBED — "Fees you must pay". Third-party fees, not ours.
   *
   * The template carries TWO figures per fee, on two separate lines:
   *   - a range across the area served, against the label line
   *   - a single typical figure for local residents, against the localLabel line
   * Both must be populated; they are not the same number.
   */
  feesYouMustPay: {
    heading: 'Fees you must pay',
    burial: {
      label: 'For an Attended or Unattended burial funeral, the burial fee.',
      footnote: 1,
      /** Weekday adult interment, resident rates: East Lothian Council £1,100, Scottish Borders Council £1,147, City of Edinburgh Council £1,457 (council websites and PDF, 13 Oct 2026). */
      rangeLow: 1100 as Money,
      rangeHigh: 1457 as Money,
      localLabel:
        'In this local area, the typical cost of the burial fee for local residents is:',
      /** East Lothian Council adult interment: Dunbar Cemetery is the local one. */
      typical: 1100 as Money,
      note:
        'For a new grave, you will also need to pay for the plot; for an existing grave ' +
        'with a memorial in place, you may need to pay a removal/replacement fee. In ' +
        'addition, the cemetery may charge a number of other fees.',
    },
    cremation: {
      label: 'For an Attended cremation funeral, the cremation fee.',
      footnote: 2,
      /** Weekday and Saturday attended fees, 2026: Mortonhall early service £748 up to East Lothian Crematorium £1,300. Sunday services excluded. */
      rangeLow: 748 as Money,
      rangeHigh: 1300 as Money,
      localLabel:
        'In this local area, the typical cost of a cremation for local residents is:',
      /** Houndwood Crematorium, Monday to Friday midday slots (from 2 Jan 2026). */
      typical: 1165 as Money,
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
   *   'money'     — a fixed monetary value, from `price`
   *   'onRequest' — renders "Prices on request", which the Order permits here
   *   'text'      — a literal string in `display`, for ranges such as "Nil to £300"
   *
   * Unlike the attended-funeral breakdown, the Order does not require these to be
   * single fixed values, so ranges and "on request" are legitimate.
   */
  additionalProductsServices: {
    heading: 'Additional Funeral Director Products and Services',
    intro:
      'This funeral director may be able to supply a range of optional, additional ' +
      'products and services, or to arrange (on your behalf) for a third party to ' +
      'supply them. Examples include:',
    items: [
      {
        label: 'Additional mileage (price per mile)',
        mode: 'money' as const,
        price: 2 as Money,
        display: '',
      },
      {
        label:
          "Additional transfers of the deceased person's body (e.g. to their home, to a " +
          'place of worship etc.) (price per transfer)',
        mode: 'money' as const,
        price: 150 as Money,
        display: '',
      },
      {
        label: 'Collection and delivery of ashes',
        mode: 'onRequest' as const,
        price: null as Money,
        display: '',
      },
      {
        label: 'Embalming',
        mode: 'money' as const,
        price: 150 as Money,
        display: '',
      },
      {
        label: 'Funeral officiant (e.g. celebrant, minister of religion etc.)',
        mode: 'text' as const,
        price: null as Money,
        display: 'Nil to £280',
      },
      {
        label: 'Services supplied outside of normal office hours',
        mode: 'onRequest' as const,
        price: null as Money,
        display: '',
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
 * attended funeral: every item must have a price (£0 is allowed), and the items must add
 * up to the headline total. Only runs once prices are confirmed — before that
 * the page renders a notice rather than figures, so there is nothing to check.
 *
 * Throwing here fails `npm run build`, which is deliberate: a Standardised Price
 * List whose parts do not sum to its total is a breach, and should never reach
 * the deployed site.
 */
if (PRICING.confirmed) {
  const items = PRICING.attended.items;

  // £0 is allowed (John Bald makes no extra charge for viewing); a missing or negative price is not.
  const nonPositive = items.filter((i) => i.price === null || i.price < 0);
  if (nonPositive.length > 0) {
    throw new Error(
      `Standardised Price List: every attended-funeral item needs a price of £0 or more. ` +
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

/** A line on the list. `price` is shown exactly as written; no price means "ask us". */
interface OptionItem {
  name: string;
  price?: string;
  note?: string;
}

interface OptionGroup {
  title: string;
  note?: string;
  items: OptionItem[];
}

/**
 * Prices are from John Bald's own "Bespoke Price List" (page 4 of the scanned price
 * lists, undated) and the celebrants' fee list dated 4 Aug 2026. Anything without a
 * price there has no price here. `confirmed` stays false until every line is priced
 * and John Bald have signed the list off.
 */
export const ADDITIONAL_OPTIONS: { confirmed: boolean; groups: OptionGroup[] } = {
  confirmed: false,
  groups: [
    {
      title: 'Complete funeral options',
      note: 'Crematorium or cemetery fees are included in the first two; the third has them added on top.',
      items: [
        {
          name: 'Direct cremation (unattended), fees included',
          price: '£1,395',
        },
        {
          name: 'Early morning simple cremation, fees included',
          price: 'from £2,795',
          note: 'At Houndwood Crematorium this is usually only available at 9am and 9.30am. Family may attend and listen to no more than three pieces of music, but there is no formal celebrant or service, and time in the chapel is restricted.',
        },
        {
          name: 'Simple funeral service (local), plus fees',
          price: '£1,995 + fees',
          note: 'Includes a simple wood-effect or earth care coffin, dressing and all necessary arrangements. No additional services can be added to this package. Third-party fees must be paid in full within 24 hours of making funeral arrangements. Visiting is available within office hours, and dates and times for the funeral service are restricted.',
        },
      ],
    },
    {
      title: 'Traditional funeral: our own charges',
      note: 'These add up to the same figures as our Standardised Price List.',
      items: [
        {
          name: 'Professional services',
          price: '£1,495',
          note: 'All advice and guidance on funeral arrangements, all liaison with third parties and completion of all paperwork, and visiting the person who has died at any time, day or night.',
        },
        { name: 'Transfer, care and preparation of the deceased (24 hours)', price: '£450' },
        { name: 'Hearse', price: '£295' },
      ],
    },
    {
      title: 'Coffins',
      note: 'Our full range, including the eco range, is shown on our coffins page.',
      items: [
        { name: 'Coffin', price: 'from £325' },
        { name: 'Traditional veneered coffin' },
        { name: 'Solid wood coffin' },
        { name: 'Woven willow, bamboo, pandanus or banana leaf' },
        { name: 'Recycled cardboard' },
        { name: 'Shroud' },
      ],
    },
    {
      title: 'Cars and bearers',
      items: [
        { name: 'Limousine (7 seats)', price: '£285' },
        { name: 'Car (4 seats)', price: '£150' },
        { name: 'Additional bearer', price: '£75' },
        { name: 'Horse-drawn hearse', price: 'On request' },
        { name: 'Motorcycle hearse', price: 'On request' },
      ],
    },
    {
      title: 'On the day',
      items: [
        {
          name: "Celebrant's fee",
          price: '£220 to £280',
          note: 'Depends on the celebrant you choose. Fees from 4 August 2026.',
        },
        { name: 'Minister, priest and church fees', price: 'Varies, please ask' },
        { name: 'Flowers' },
        { name: 'Orders of service' },
        { name: 'Notices in local and national newspapers' },
        { name: 'Recording or livestreaming the service' },
        { name: 'Catering and venue hire' },
      ],
    },
    {
      title: 'Care of the person who has died',
      items: [
        { name: 'Embalming, where you or the circumstances require it', price: '£150' },
        { name: 'Additional transfer of the deceased (price per transfer)', price: '£150' },
        { name: 'Additional mileage (per mile)', price: '£2' },
        { name: 'Dressing in their own clothes' },
      ],
    },
    {
      title: 'Afterwards',
      items: [
        { name: 'Ashes caskets', price: 'from £75' },
        { name: 'Scatter tubes', price: '£35' },
        { name: 'Collection and delivery of ashes', price: 'On request' },
        { name: 'Binning Memorial Wood burial site', price: 'Varies, please ask' },
        { name: 'Headstones, plaques and memorials' },
        { name: 'Keepsake jewellery and glass memorials' },
      ],
    },
  ],
};
