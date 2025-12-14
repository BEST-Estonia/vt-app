// app/(tabs)/data/companies.ts
import { logos } from '../app/(tabs)/data/logos';
import { treasureHuntCompanies } from './treasureHuntCompanies';

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
  startISO: string;
  endISO?: string;
  locationText: string;
};

export type Company = {
  id: string;
  name: string;
  description: string;
  boothCode?: string;
  initials: string;
  color: string;
  industries: string[];
  hiringTypes: string[];
  isFavorite: boolean;
  localLogo?: any;
  about?: string;
  links?: CompanyLink[];
  isTreasureHunt?: boolean;
};

export type SortMode = 'A-Z' | 'Relevance';

export const ALL_INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Consulting', 
  'Engineering', 'Energy', 'Retail', 'Education', 'Transportation', 'Government', 'Construction'
];

export const ALL_HIRING = ['Internship', 'Full-time', 'Graduate'] as const;

export { logos };

// --- REGULAR COMPANIES (NOT in Treasure Hunt) ---
const regularCompanies: Company[] = [
  { id: '14', name: 'Nortal AS', description: '', boothCode: '103', initials: 'NO', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.nortalAS },
  { id: '15', name: 'Inbank', description: '', boothCode: '112', initials: 'IN', color: '#1E66FF', industries: ['Finance'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.inbank },
  { id: '16', name: 'Patendiamet', description: '', boothCode: '33', initials: 'PA', color: '#1E66FF', industries: ['Government'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.patendiAmet },
  { id: '17', name: 'Tech Group AS', description: '', boothCode: '30', initials: 'TG', color: '#1E66FF', industries: ['Engineering'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.techGroupLogo },
  { id: '18', name: 'Stoneridge Electronics AS', description: '', boothCode: '56', initials: 'SE', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.stoneridgeLogo },
  { id: '19', name: 'Smartecon OÜ', description: '', boothCode: '48', initials: 'SM', color: '#1E66FF', industries: ['Energy'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.smarteconLogo },
  { id: '20', name: 'Compensa Vienna Insurance Group', description: '', boothCode: '94', initials: 'CO', color: '#1E66FF', industries: ['Finance'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.compensaLogo },
  { id: '21', name: 'Tallinna Vesi', description: '', boothCode: '27', initials: 'TV', color: '#1E66FF', industries: ['Other'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.tallinnvesiLogo },
  { id: '22', name: 'Registrite ja Infosüsteemide Keskus', description: '', boothCode: '96', initials: 'RI', color: '#1E66FF', industries: ['Government', 'Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.rikLogo },
  { id: '23', name: 'Nordea Bank Abp Eesti filiaal', description: '', boothCode: '90', initials: 'NO', color: '#1E66FF', industries: ['Finance'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.nordeaLogo },
  { id: '24', name: 'Rail Baltic Estonia OÜ', description: '', boothCode: '55', initials: 'RB', color: '#1E66FF', industries: ['Transportation'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.railBalticLogo },
  { id: '25', name: 'Sisekaitseakadeemia', description: '', boothCode: '63', initials: 'SK', color: '#1E66FF', industries: ['Government', 'Education'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.sisekaitseakadeemiaLogo },
  { id: '26', name: 'AS TREV-2 Grupp', description: '', boothCode: '10', initials: 'TR', color: '#1E66FF', industries: ['Construction'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.trev2Logo },
  { id: '27', name: 'AS Harju Elekter', description: '', boothCode: '88', initials: 'HE', color: '#1E66FF', industries: ['Energy'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.harjuElekterLogo },
  { id: '28', name: 'Enefit', description: '', boothCode: '6', initials: 'EE', color: '#1E66FF', industries: ['Energy'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.enefitLogo },
  { id: '29', name: 'GPV Estonia AS', description: '', boothCode: '110', initials: 'GP', color: '#1E66FF', industries: ['Manufacturing'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.gpvLogo },
  { id: '30', name: 'Swedbank AS', description: '', boothCode: '31', initials: 'SW', color: '#1E66FF', industries: ['Finance'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.swedbankLogo },
  { id: '31', name: 'Telia Eesti AS', description: '', boothCode: '47', initials: 'TE', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.telia },
  { id: '32', name: 'Threod Systems AS', description: '', boothCode: '44', initials: 'TH', color: '#1E66FF', industries: ['Technology', 'Engineering'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.threodSystemsLogo },
  { id: '33', name: 'ERGO Insurance SE', description: '', boothCode: '14', initials: 'ER', color: '#1E66FF', industries: ['Finance'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.ergoInsuranceLogo },
  { id: '35', name: 'CV Keskus', description: '', boothCode: '100', initials: 'CV', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.cvkeskusLogo },
  { id: '36', name: 'Coop Pank AS', description: '', boothCode: '1', initials: 'CP', color: '#1E66FF', industries: ['Finance'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.cooppankLogo },
  { id: '37', name: 'Ericsson Eesti AS', description: '', boothCode: '18', initials: 'ER', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.ericssonLogo },
  { id: '38', name: 'PLAYTECH ESTONIA OÜ', description: '', boothCode: '38', initials: 'PL', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.playtechLogo },
  { id: '39', name: 'Infragreen OÜ', description: '', boothCode: '26', initials: 'IN', color: '#1E66FF', industries: ['Construction'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.infragreenLogo },
  { id: '40', name: 'Rahapesu Andmebüroo', description: '', boothCode: '58', initials: 'RA', color: '#1E66FF', industries: ['Government'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.rahapesuandmebürooLogo },
  { id: '41', name: 'Kaitseressursside Amet', description: '', boothCode: '29', initials: 'KR', color: '#1E66FF', industries: ['Government'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.kaitseressursideametLogo },
  { id: '42', name: 'Tammer OÜ', description: '', boothCode: '78', initials: 'TA', color: '#1E66FF', industries: ['Manufacturing'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.tammerLogo },
  { id: '43', name: 'Elering AS', description: '', boothCode: '60', initials: 'EL', color: '#1E66FF', industries: ['Energy'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.eleringLogo },
  { id: '44', name: 'Helmes AS', description: '', boothCode: '91', initials: 'HE', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.helmesLogo },
  { id: '45', name: 'INF Infra OÜ', description: '', boothCode: '37', initials: 'IN', color: '#1E66FF', industries: ['Construction'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.infinfraLogo },
  { id: '46', name: 'NOBE OÜ', description: '', boothCode: '19', initials: 'NO', color: '#1E66FF', industries: ['Construction'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.nobeLogo },
  { id: '47', name: 'Nordecon AS', description: '', boothCode: '70', initials: 'NO', color: '#1E66FF', industries: ['Construction'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.nordeconLogo },
  { id: '48', name: 'FINEST AS', description: '', boothCode: '83', initials: 'FI', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.finestLogo },
  { id: '49', name: 'AS KH Energia-Konsult', description: '', boothCode: '101', initials: 'KH', color: '#1E66FF', industries: ['Energy'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.khenergiaLogo },
  { id: '50', name: 'Hurtigruten Estonia OÜ', description: '', boothCode: '11', initials: 'HU', color: '#1E66FF', industries: ['Tourism'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.hurtigrutenLogo },
  { id: '51', name: 'Estanc AS', description: '', boothCode: '81', initials: 'ES', color: '#1E66FF', industries: ['Manufacturing'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.estancLogo },
  { id: '52', name: 'HEISI IT OÜ', description: '', boothCode: '104', initials: 'HE', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.heisiLogo },
  { id: '53', name: 'Keskkonnaagentuur', description: '', boothCode: '49', initials: 'KE', color: '#1E66FF', industries: ['Government'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.keskkonnaagentuurLogo },
  { id: '55', name: 'Shore Link OÜ', description: '', boothCode: '121', initials: 'SH', color: '#1E66FF', industries: ['Engineering'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.shorelinkLogo },
  { id: '56', name: 'Bigbank AS', description: '', boothCode: '46', initials: 'BB', color: '#1E66FF', industries: ['Finance'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.bigbankLogo },
  { id: '57', name: 'Välisluureamet', description: '', boothCode: '79', initials: 'VA', color: '#1E66FF', industries: ['Government'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.välisluureametLogo },
  { id: '58', name: 'Ernst & Young Baltic AS', description: '', boothCode: '115', initials: 'EY', color: '#1E66FF', industries: ['Consulting'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.ernstLogo },
  { id: '59', name: 'Lennuliiklusteeninduse AS', description: '', boothCode: '67', initials: 'LL', color: '#1E66FF', industries: ['Transportation'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.lennuliiklusteeninduseLogo },
  { id: '60', name: 'Fujitsu Estonia', description: '', boothCode: '61', initials: 'FU', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.fujitsuLogo },
  { id: '61', name: 'Finantsinspektsioon', description: '', boothCode: '57', initials: 'FI', color: '#1E66FF', industries: ['Finance', 'Government'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.finantsinspektsioonLogo },
  { id: '62', name: 'AS Connecto Infra', description: '', boothCode: '28', initials: 'CO', color: '#1E66FF', industries: ['Energy'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.connectoLogo },
  { id: '63', name: 'Utilitas OÜ', description: '', boothCode: '40', initials: 'UT', color: '#1E66FF', industries: ['Energy'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.utilitasLogo },
  { id: '64', name: 'Genius Sports', description: '', boothCode: '117', initials: 'GS', color: '#1E66FF', industries: ['Technology'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.geniussportsLogo },
  { id: '65', name: 'Scanfil OÜ', description: '', boothCode: '25', initials: 'SC', color: '#1E66FF', industries: ['Manufacturing'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.scanfilLogo },
  { id: '66', name: 'AQ Lasertool OÜ', description: '', boothCode: '24', initials: 'AQ', color: '#1E66FF', industries: ['Manufacturing'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.aqlasertoolLogo },
  { id: '67', name: 'Tartu Ülikool', description: '', boothCode: '22', initials: 'UT', color: '#1E66FF', industries: ['Education'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.tartuülikoolLogo },
  { id: '68', name: 'Ruukki Products AS', description: '', boothCode: '23', initials: 'RU', color: '#1E66FF', industries: ['Manufacturing'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.ruukkiLogo },
  { id: '69', name: 'HANZA SSC Tartu OÜ', description: '', boothCode: '64', initials: 'HA', color: '#1E66FF', industries: ['Manufacturing'], hiringTypes: ['Full-time'], isFavorite: false }, // Missing logo
  { id: '70', name: 'AS Tallinna Lennujaam', description: '', boothCode: '39', initials: 'TL', color: '#1E66FF', industries: ['Transportation'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.tallinnalennujaamLogo },
  { id: '71', name: 'Ettevõtluse ja Innovatsiooni Sihtasutus', description: '', boothCode: '77', initials: 'EI', color: '#1E66FF', industries: ['Government'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.eisLogo },
  { id: '72', name: 'LEONHARD WEISS OÜ', description: '', boothCode: '13', initials: 'LW', color: '#1E66FF', industries: ['Construction'], hiringTypes: ['Full-time'], isFavorite: false, localLogo: logos.leonhardweissLogo },
];

export const companiesSeed: Company[] = [
  ...treasureHuntCompanies,
  ...regularCompanies
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
];