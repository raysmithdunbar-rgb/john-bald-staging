/**
 * Primary navigation.
 *
 * The Standardised Price List must be reachable within one click of the
 * homepage — a legal requirement of the CMA Funerals Market Investigation
 * Order 2021, not a design preference. It appears here as a top-level item
 * for that reason; do not demote it into a submenu.
 */

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: 'Someone has died',
    href: '/someone-has-died/',
    children: [
      { label: 'The first 24 hours', href: '/someone-has-died/first-24-hours/' },
      { label: 'Registering a death', href: '/someone-has-died/registering-a-death/' },
      { label: 'Arranging the funeral', href: '/arranging-a-funeral/' },
    ],
  },
  {
    label: 'Funerals we arrange',
    href: '/funeral-services/',
    children: [
      { label: 'Burial', href: '/funeral-services/burial/' },
      { label: 'Cremation', href: '/funeral-services/cremation/' },
      { label: 'Direct cremation', href: '/funeral-services/direct-cremation/' },
      { label: 'Natural burial', href: '/funeral-services/natural-burial/' },
      { label: "Children's funerals", href: '/funeral-services/childrens-funerals/' },
      { label: 'Repatriation', href: '/funeral-services/repatriation/' },
      { label: 'Coffins', href: '/coffins/' },
      { label: 'Memorials', href: '/memorials/' },
    ],
  },
  {
    label: 'Our prices',
    href: '/funeral-costs/',
    children: [
      { label: 'Standardised Price List', href: '/funeral-costs/standardised-price-list/' },
      { label: 'Additional options', href: '/funeral-costs/additional-options-price-list/' },
      { label: 'Help with funeral costs', href: '/funeral-costs/help-with-funeral-costs/' },
    ],
  },
  {
    label: 'Planning ahead',
    href: '/funeral-plans/',
  },
  {
    label: 'Advice',
    href: '/guides/',
    children: [
      { label: 'All guides', href: '/guides/' },
      { label: 'Crematoria, cemeteries & registrars', href: '/directory/' },
      { label: 'Bereavement support', href: '/bereavement-support/' },
    ],
  },
  {
    label: 'About us',
    href: '/about/',
  },
  {
    label: 'Contact',
    href: '/contact/',
  },
];

export const FOOTER_LEGAL = [
  { label: 'Privacy policy', href: '/privacy/' },
  { label: 'Accessibility', href: '/accessibility/' },
  { label: 'Terms of business', href: '/terms/' },
];
