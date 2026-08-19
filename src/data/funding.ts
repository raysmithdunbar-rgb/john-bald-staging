/**
 * Funeral Support Payment rates.
 *
 * Uprated by the Scottish Government each April — update `taxYear`, the rates
 * and `lastVerified` together. Flat rates verified against
 * socialsecurity.gov.scot/funeral-support-payment/flat-rate-payment
 *
 * `qualifyingBenefits` verified directly against Social Security Scotland's own
 * caseworker eligibility guidance (not mygov.scot's consumer summary, which can lag):
 * socialsecurity.gov.scot/funeral-support-payment/eligibility-for-funeral-support-payment
 * Legacy tax credits (Child Tax Credit, Working Tax Credit) are NOT on that list —
 * they wound down as claimants migrated to Universal Credit and should not be quoted
 * as qualifying benefits. Re-check this list alongside the rates each April.
 */

export const FUNERAL_SUPPORT_PAYMENT = {
  taxYear: '2026/27',
  lastVerified: '2026-08-18',
  source: 'https://www.mygov.scot/funeral-support-payment',
  eligibilitySource:
    'https://www.socialsecurity.gov.scot/funeral-support-payment/eligibility-for-funeral-support-payment',

  qualifyingBenefits: [
    'Universal Credit',
    'Income Support',
    'Pension Credit',
    'Housing Benefit',
    "income-based Jobseeker's Allowance",
    'income-related Employment and Support Allowance',
  ],

  covidBackdatingNote:
    "If you couldn't apply within six months of the funeral because of disruption caused by coronavirus, Social Security Scotland will still accept a late application as if it were on time — explain the circumstances when you apply, or call us and we'll help you explain it.",

  flatRate: {
    withoutPlan: 1327.75,
    withPaidPlan: 162.05,
  },

  covers: [
    {
      title: 'Burial or cremation costs',
      detail:
        'Paid in full, including the burial plot or the cremation fee, and certain related charges such as the doctor’s certificate where one applies.',
    },
    {
      title: 'A flat-rate amount for everything else',
      detail:
        'A single fixed sum towards funeral director’s fees, the coffin, flowers, an order of service and similar costs. You choose how to spend it.',
    },
    {
      title: 'Transport costs',
      detail:
        'Help with moving the person who died where the journey is unusually long, and travel costs for one return journey for the person arranging the funeral.',
    },
  ],

  keyFacts: [
    'It will not usually cover the whole cost of a funeral, but it makes a real difference.',
    'It can be paid directly to us as the funeral director, so the money never has to pass through your hands.',
    'It covers funerals for adults, children and babies, including stillborn babies.',
    'Only one person can receive it for any one funeral.',
    'You can apply before the funeral takes place, or up to six months afterwards.',
  ],
} as const;

/**
 * Scottish councils do not charge burial or cremation fees for anyone under 18.
 * This applies across East Lothian and the Scottish Borders and is separate from
 * Funeral Support Payment — families can receive both.
 */
export const CHILDRENS_FUNERAL_SUPPORT = {
  lastVerified: '2026-08-18',
  summary:
    'In Scotland there is no burial or cremation fee for a child under 18, or for a stillborn baby. Councils do not charge, and neither do the crematoria we work with.',
} as const;
