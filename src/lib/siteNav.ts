export type NavChild = { label: string; to: string };

export type NavItem =
  | { type: 'link'; label: string; to: string }
  | { type: 'dropdown'; label: string; to: string; children: NavChild[] };

export {
  CONTACT_EMAIL,
  WHATSAPP_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  OFFICE,
} from './contact';
export const CONTACT_PATH = '/contact';


export const mainNav: NavItem[] = [
  { type: 'link', label: 'Home', to: '/' },
  {
    type: 'dropdown',
    label: 'Buy',
    to: '/properties-for-sale-in-india',
    children: [
      { label: 'Properties for Sale', to: '/properties-for-sale-in-india' },
      { label: 'Apartments for Sale', to: '/apartments-for-sale-in-india' },
      { label: 'Villas for Sale', to: '/villas-for-sale-in-india' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Rent',
    to: '/properties-for-rent-in-india',
    children: [
      { label: 'Properties for Rent', to: '/properties-for-rent-in-india' },
      { label: 'Apartments for Rent', to: '/apartments-for-rent-in-india' },
      { label: 'Villas for Rent', to: '/villas-for-rent-in-india' },
    ],
  },
  { type: 'link', label: 'New Property', to: '/new-properties-off-plan-india' },
  { type: 'link', label: 'Invest', to: '/invest' },
  { type: 'link', label: 'Services', to: '/services' },
  {
    type: 'dropdown',
    label: 'About',
    to: '/about',
    children: [
      { label: 'About Us', to: '/about' },
      // Team page hidden for now
      // { label: 'Our Team', to: '/team' },
    ],
  },
  { type: 'link', label: 'FAQ', to: '/faq' },
];

export type CategoryPageConfig = {
  path: string;
  title: string;
  eyebrow: string;
  heading: string;
  lead: string;
  listingLead?: string;
  listingEyebrow?: string;
  listingTitle?: string;
  breadcrumbs: { label: string; to?: string }[];
  purpose?: '' | 'rent' | 'sale';
  propertyTypeIncludes?: string[];
  offPlanOnly?: boolean;
};

export const categoryPages: CategoryPageConfig[] = [
  {
    path: '/properties-for-sale-in-india',
    title: 'Property for Sale in India | Arreat Capital India',
    eyebrow: 'Buy · India',
    heading: 'Property for Sale in India',
    lead: 'From investor studios to signature villas — explore curated property for sale across Mumbai, Bengaluru, Delhi-NCR and beyond.',
    listingEyebrow: 'Buy in India',
    listingTitle: 'Properties for sale, chosen with judgement',
    listingLead:
      'Arreat Capital India curates apartments, villas and townhouses for sale — ready homes and select off-plan launches.',
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'Buy' },
      { label: 'Property for Sale' },
    ],
    purpose: 'sale',
  },
  {
    path: '/apartments-for-sale-in-india',
    title: 'Apartments for Sale in India | Arreat Capital India',
    eyebrow: 'Buy · Apartments',
    heading: 'Apartments for Sale in India',
    lead: 'Studios to luxury flats — find apartments for sale in India’s most in-demand communities.',
    listingEyebrow: 'Buy · Apartments',
    listingTitle: 'Apartments & flats for sale',
    purpose: 'sale',
    propertyTypeIncludes: ['apartment', 'flat', 'studio', 'penthouse'],
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'Buy', to: '/properties-for-sale-in-india' },
      { label: 'Apartments for Sale' },
    ],
  },
  {
    path: '/villas-for-sale-in-india',
    title: 'Villas for Sale in India | Arreat Capital India',
    eyebrow: 'Buy · Villas',
    heading: 'Villas for Sale in India',
    lead: 'Family homes to premium estates — explore villas and townhouses for sale across India’s growth corridors.',
    listingEyebrow: 'Buy · Villas',
    listingTitle: 'Villas & townhouses for sale',
    purpose: 'sale',
    propertyTypeIncludes: ['villa', 'townhouse', 'town house'],
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'Buy', to: '/properties-for-sale-in-india' },
      { label: 'Villas for Sale' },
    ],
  },
  {
    path: '/properties-for-rent-in-india',
    title: 'Property for Rent in India | Arreat Capital India',
    eyebrow: 'Rent · India',
    heading: 'Property for Rent in India',
    lead: 'Apartments and villas for rent — quality homes with clear terms and fast responses.',
    listingEyebrow: 'Rent in India',
    listingTitle: 'Properties for rent',
    purpose: 'rent',
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'Rent' },
      { label: 'Property for Rent' },
    ],
  },
  {
    path: '/apartments-for-rent-in-india',
    title: 'Apartments for Rent in India | Arreat Capital India',
    eyebrow: 'Rent · Apartments',
    heading: 'Apartments for Rent in India',
    lead: 'Studios, 1 & 2 bed flats — find apartments for rent across India’s key cities.',
    purpose: 'rent',
    propertyTypeIncludes: ['apartment', 'flat', 'studio', 'penthouse'],
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'Rent', to: '/properties-for-rent-in-india' },
      { label: 'Apartments for Rent' },
    ],
  },
  {
    path: '/villas-for-rent-in-india',
    title: 'Villas for Rent in India | Arreat Capital India',
    eyebrow: 'Rent · Villas',
    heading: 'Villas for Rent in India',
    lead: 'Space and community living — family and luxury villas for rent.',
    purpose: 'rent',
    propertyTypeIncludes: ['villa', 'townhouse', 'town house'],
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'Rent', to: '/properties-for-rent-in-india' },
      { label: 'Villas for Rent' },
    ],
  },
  {
    path: '/new-properties-off-plan-india',
    title: 'Off-Plan Properties in India | Arreat Capital India',
    eyebrow: 'New Property · Off-Plan',
    heading: 'Off-Plan Properties in India',
    lead: 'New launches and flexible payment plans — independent advice on projects worth buying.',
    listingTitle: 'Off-plan projects, chosen on merit',
    purpose: 'sale',
    offPlanOnly: true,
    breadcrumbs: [
      { label: 'Home', to: '/' },
      { label: 'New Property' },
      { label: 'Off-Plan' },
    ],
  },
];

export function getCategoryConfig(path: string) {
  return categoryPages.find((page) => page.path === path);
}
