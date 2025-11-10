// app/(tabs)/data/companies.ts
export type CompanyLinkIcon = 'globe' | 'linkedin' | 'briefcase';

export type CompanyLink = {
  label: string;
  url: string;
  icon?: CompanyLinkIcon;
};

export type CompanyEvent = {
  id: string;
  companyId: string;
  title: string;
  startISO: string; // e.g. "2025-03-12T10:00:00+02:00"
  endISO?: string;
  locationText: string; // e.g. "Stage A", "Booth A1"
};

export type Company = {
  id: string;
  name: string;
  description: string;
  boothCode?: string; // e.g. "A1"
  initials: string;
  color: string;
  industries: string[];
  hiringTypes: string[];
  isFavorite: boolean;
  localLogo?: any;
  about?: string;
  links?: CompanyLink[];
};

export type SortMode = 'A-Z' | 'Relevance';

export const ALL_INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Consulting',
  'Engineering',
  'Energy',
  'Retail',
  'Education',
  'Transportation',
];

export const ALL_HIRING = ['Internship', 'Full-time', 'Graduate'] as const;

// Local logo assets (paths relative to this file's folder)
export const logos = {
  bolt: require('../assets/bolt-logo.png'),
  cleveron: require('../assets/cleveron-logo.png'),
  elisa: require('../assets/elisa-logo.png'),
  enefit: require('../assets/enefit-logo.png'),
  ericsson: require('../assets/ericsson-logo.png'),
  helmes: require('../assets/helmes-logo.jpg'),
  lhv: require('../assets/lhv-logo.png'),
  pipedrive: require('../assets/pipedrive-logo.png'),
  swedbank: require('../assets/swedbank-logo.png'),
  telia: require('../assets/telia-logo.png'),
};

export const companiesSeed: Company[] = [
  {
    id: '1',
    name: 'Bolt',
    description: 'Building the future of mobility',
    boothCode: 'A1',
    initials: 'BO',
    color: '#1E66FF',
    industries: ['Technology', 'Transportation'],
    hiringTypes: ['Internship', 'Full-time', 'Graduate'],
    isFavorite: false,
    localLogo: logos.bolt,
    about:
      'Bolt is the first European super‑app with services ranging from ride‑hailing and shared cars to food and grocery delivery and courier services.',
    links: [
      { label: 'Website', url: 'https://bolt.eu', icon: 'globe' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/company/bolt-eu', icon: 'linkedin' },
      { label: 'Careers', url: 'https://careers.bolt.eu', icon: 'briefcase' },
    ],
  },
  {
    id: '2',
    name: 'Cleveron',
    description: 'Automated parcel solutions',
    boothCode: 'B2',
    initials: 'CL',
    color: '#1E66FF',
    industries: ['Technology', 'Engineering'],
    hiringTypes: ['Internship', 'Full-time'],
    isFavorite: false,
    localLogo: logos.cleveron,
    links: [
      { label: 'Website', url: 'https://cleveron.com', icon: 'globe' },
      { label: 'Careers', url: 'https://cleveron.com/careers', icon: 'briefcase' },
    ],
  },
  {
    id: '3',
    name: 'Eesti Energia',
    description: 'Energy for the future',
    boothCode: 'C5',
    initials: 'EE',
    color: '#1E66FF',
    industries: ['Energy', 'Engineering'],
    hiringTypes: ['Internship', 'Full-time', 'Graduate'],
    isFavorite: false,
    localLogo: logos.enefit,
  },
  {
    id: '4',
    name: 'Elisa Eesti',
    description: 'Telecommunications leader',
    boothCode: 'C3',
    initials: 'EL',
    color: '#1E66FF',
    industries: ['Technology'],
    hiringTypes: ['Full-time', 'Graduate'],
    isFavorite: false,
    localLogo: logos.elisa,
  },
  {
    id: '5',
    name: 'Ericsson',
    description: 'Powering 5G and connectivity',
    boothCode: 'D1',
    initials: 'ER',
    color: '#1E66FF',
    industries: ['Technology', 'Engineering'],
    hiringTypes: ['Full-time', 'Graduate'],
    isFavorite: false,
    localLogo: logos.ericsson,
  },
  {
    id: '6',
    name: 'Helmes',
    description: 'Digital solutions',
    boothCode: 'D2',
    initials: 'HE',
    color: '#1E66FF',
    industries: ['Technology', 'Consulting'],
    hiringTypes: ['Internship', 'Full-time'],
    isFavorite: false,
    localLogo: logos.helmes,
  },
  {
    id: '7',
    name: 'LHV',
    description: 'Modern Estonian bank',
    boothCode: 'E3',
    initials: 'LHV',
    color: '#1E66FF',
    industries: ['Finance'],
    hiringTypes: ['Internship', 'Full-time'],
    isFavorite: false,
    localLogo: logos.lhv,
  },
  {
    id: '8',
    name: 'Pipedrive',
    description: 'Sales CRM and pipeline management',
    boothCode: 'F1',
    initials: 'PD',
    color: '#1E66FF',
    industries: ['Technology'],
    hiringTypes: ['Internship', 'Full-time'],
    isFavorite: false,
    localLogo: logos.pipedrive,
  },
  {
    id: '9',
    name: 'Swedbank',
    description: 'Nordic banking leader',
    boothCode: 'E1',
    initials: 'SW',
    color: '#1E66FF',
    industries: ['Finance'],
    hiringTypes: ['Internship', 'Full-time', 'Graduate'],
    isFavorite: false,
    localLogo: logos.swedbank,
  },
  {
    id: '10',
    name: 'Telia',
    description: 'Connected solutions',
    boothCode: 'F2',
    initials: 'TE',
    color: '#1E66FF',
    industries: ['Technology'],
    hiringTypes: ['Internship', 'Full-time', 'Graduate'],
    isFavorite: false,
    localLogo: logos.telia,
  },
];

export const companyEvents: CompanyEvent[] = [
  {
    id: 'evt_bolt_1',
    companyId: '1',
    title: 'Skaleeruva tehnoloogia loomine Boltis',
    startISO: '2025-03-12T10:00:00+02:00',
    endISO: '2025-03-12T10:30:00+02:00',
    locationText: 'Stage A',
  },
  // Add more events here…
];