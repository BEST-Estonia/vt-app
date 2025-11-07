// app/(tabs)/data/companies.ts
export type Company = {
  id: string;
  name: string;
  description: string;
  initials: string;
  color: string;
  industries: string[];
  hiringTypes: string[];
  isFavorite: boolean;
  localLogo?: any;
};

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
    initials: 'BO',
    color: '#1E66FF',
    industries: ['Technology', 'Transportation'],
    hiringTypes: ['Internship', 'Full-time', 'Graduate'],
    isFavorite: false,
    localLogo: logos.bolt,
  },
  {
    id: '2',
    name: 'Cleveron',
    description: 'Automated parcel solutions',
    initials: 'CL',
    color: '#1E66FF',
    industries: ['Technology', 'Engineering'],
    hiringTypes: ['Internship', 'Full-time'],
    isFavorite: false,
    localLogo: logos.cleveron,
  },
  {
    id: '3',
    name: 'Eesti Energia',
    description: 'Energy for the future',
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
    initials: 'ER',
    color: '#1E66FF',
    industries: ['Technology', 'Engineering'],
    hiringTypes: ['Full-time', 'Graduate'],
    isFavorite: false,
    localLogo: require('../assets/ericsson-logo.png'),
  },
  {
    id: '6',
    name: 'Helmes',
    description: 'Digital solutions',
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
    description: 'Modern Estonian Bank',
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
    initials: 'TE', // no local logo yet to test fallback
    color: '#1E66FF',
    industries: ['Technology'],
    hiringTypes: ['Internship', 'Full-time', 'Graduate'],
    isFavorite: false,
    localLogo: logos.telia,
  },
];

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

export type SortMode = 'A-Z' | 'Relevance';