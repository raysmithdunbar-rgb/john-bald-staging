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
 * ── Provenance of these figures ──────────────────────────────────────────────
 *
 * Sourced from the A & A Doyle Standardised Price List
 * (doylefunerals.co.uk/standardised-price-list/, read August 2026).
 *
 * CLIENT-CONFIRMED, AUGUST 2026: A & A Doyle Ltd operates uniform pricing across
 * all three branches — Galashiels, Gorebridge (Herkes) and Dunbar (John Bald).
 * These are therefore John Bald's own prices, not another branch's, and publishing
 * them here is correct. The Order requires each branch's list to reflect what that
 * branch actually charges: identical figures are compliant where pricing genuinely
 * is uniform, and a breach only where a branch differs. If Dunbar ever diverges —
 * after the move to Countess Crescent, for instance — this file must be updated
 * independently of the other two branches.
 *
 * KNOWN ISSUE IN THE SOURCE LIST: Doyle's published headline for the attended
 * funeral is £2,800, but their six itemised prices sum to £2,801. The Order
 * requires the items to add up to the total, so one or the other has to give.
 * Client decision, August 2026: keep all six item prices exactly as published and
 * carry the £1 into the total, so the headline here is £2,801. The £1 viewing fee
 * is Doyle's device for satisfying the Order's "every item greater than £0" rule.
 * The same discrepancy is live on the Doyle and Herkes lists and should be
 * corrected at source.
 *
 * The Order requires the individual attended-funeral item prices to ADD UP to the
 * attended-funeral total, and every item to be greater than £0. Both are asserted
 * at the foot of this file. The assertion throws during `npm run build`, so a
 * non-compliant list cannot reach the deployed site.
 */

type Money = number | null;

export const PRICING = {
  confirmed: true,
  effectiveFrom: 'August 2026',
  lastReviewed: 'August 2026',

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
     * £2,801 rather than Doyle's published £2,800: see "KNOWN ISSUE" in the file
     * header. All six item prices are exactly as Doyle publishes them.
     */
    total: 2801 as Money,

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
        price: 1550 as Money,
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
        price: 250 as Money,
      },
      {
        id: 'coffin',
        label: 'Providing a suitable coffin – this will be made from {coffin}',
        price: 375 as Money,
      },
      {
        id: 'viewing',
        label:
          'Viewing of the deceased person for family and friends, by appointment with ' +
          'the funeral director (where viewing is requested by the customer)',
        price: 1 as Money,
      },
      {
        id: 'hearse',
        label:
          'At a date and time you agree with the funeral director, taking the deceased ' +
          'person direct to the agreed cemetery or crematorium (normally within 20 miles ' +
          "of the funeral director's premises) in a hearse or other appropriate vehicle",
        price: 325 as Money,
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
      price: 1200 as Money,
    },
    cremation: {
      label: "Cremation (funeral director's charges plus the cremation fee)",
      footnote: 2,
      price: 1495 as Money,
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
      rangeLow: 1147 as Money,
      rangeHigh: 2779.5 as Money,
      localLabel:
        'In this local area, the typical cost of the burial fee for local residents is:',
      typical: 1495 as Money,
      note:
        'For a new grave, you will also need to pay for the plot; for an existing grave ' +
        'with a memorial in place, you may need to pay a removal/replacement fee. In ' +
        'addition, the cemetery may charge a number of other fees.',
    },
    cremation: {
      label: 'For an Attended cremation funeral, the cremation fee.',
      footnote: 2,
      rangeLow: 795 as Money,
      rangeHigh: 1750 as Money,
      localLabel:
        'In this local area, the typical cost of a cremation for local residents is:',
      typical: 1295 as Money,
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
        price: 195 as Money,
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
        display: 'Nil to £300',
      },
      {
        label: 'Services supplied outside of normal office hours',
        mode: 'text' as const,
        price: null as Money,
        display: 'Nil to £250',
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
