// data/treasureHuntCompanies.ts
import { COMPANY_DESCRIPTIONS } from "./companyTranslations";
import { logos } from "./logos";

export type CompanyLinkIcon = "globe" | "linkedin" | "briefcase";

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
  description: Record<"en" | "et", string>;
  boothCode?: string;
  initials: string;
  color: string;
  industries: string[];
  hiringTypes: string[];
  isFavorite: boolean;
  localLogo?: any;
  about?: Record<"en" | "et", string>;
  links?: CompanyLink[];
  isTreasureHunt?: boolean;
};

export type SortMode = "A-Z" | "Relevance";

export const ALL_INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Consulting",
  "Engineering",
  "Energy",
  "Retail",
  "Education",
  "Transportation",
  "Government",
  "Construction",
  "Kosmos",
  "Infotehnoloogia",
];

export const ALL_HIRING = [
  "Internship",
  "Full-time",
  "Part-time",
  "Graduate",
] as const;

export { logos };

export const treasureHuntCompanies: Company[] = [
  {
    id: "th-1",
    name: "Verston Eesti OÜ",
    description: {
      et: "Osale meie aardejahis!",
      en: "Join our treasure hunt!",
    },
    boothCode: "21",
    initials: "VE",
    color: "#1E66FF",
    industries: ["Engineering"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.verstonLogo,
    isTreasureHunt: true,
  },

  {
    id: "th-2",
    name: "CARIAD Estonia",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-2"],
      en: COMPANY_DESCRIPTIONS.en["th-2"],
    },
    boothCode: "114",
    initials: "CA",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: ["Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.cariadLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "http://www.cariad.ee", icon: "globe" },
      {
        label: "Careers",
        url: "http://www.cariad.ee",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/cariad-tech/",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "th-3",
    name: "Gunvor Services AS",
    description: {
      et: "Ülemaailmne energiakaubandus",
      en: "Global energy trading",
    },
    boothCode: "42",
    initials: "GU",
    color: "#1E66FF",
    industries: ["Energy", "Finance"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.gunvorServicesLogo,
    isTreasureHunt: true,
  },
  {
    id: "th-4",
    name: "ABB AS",
    description: {
      et: "Energia- ja automaatikatehnoloogiad",
      en: "Power and automation technologies",
    },
    boothCode: "108",
    initials: "ABB",
    color: "#1E66FF",
    industries: ["Engineering", "Energy"],
    hiringTypes: ["Full-time", "Internship"],
    isFavorite: false,
    localLogo: logos.ABBLogo,
    isTreasureHunt: true,
  },
  {
    id: "th-5",
    name: "TRAFFEST",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-5"],
      en: COMPANY_DESCRIPTIONS.en["th-5"],
    },
    boothCode: "71",
    initials: "TR",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.TRAFFESTOÜLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "https://www.traffest.com/", icon: "globe" },

      {
        label: "LinkedIn",
        url: "https://ee.linkedin.com/company/traffest",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "th-6",
    name: "Eesti Raudtee",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-6"],
      en: COMPANY_DESCRIPTIONS.en["th-6"],
    },
    boothCode: "65",
    initials: "ER",
    color: "#1E66FF",
    industries: ["Logistika"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.eestiRaudteeLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "https://www.evr.ee/et/", icon: "globe" },
      {
        label: "Careers",
        url: "https://www.evr.ee/et/tuletoole",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/eestiraudtee/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "th-7",
    name: "Southwestern Advantage",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-7"],
      en: COMPANY_DESCRIPTIONS.en["th-7"],
    },
    boothCode: "17",
    initials: "SW",
    color: "#1E66FF",
    industries: ["Müük", "Majandus"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.southwesternAdvantageLogo,
    isTreasureHunt: true,
    links: [
      {
        label: "Website",
        url: "https://southwesternadvantage.eu/ee",
        icon: "globe",
      },

      {
        label: "LinkedIn",
        url: "http://inkedin.com/company/southwestern-advantage-eesti",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "th-8",
    name: "Pipedrive",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-8"],
      en: COMPANY_DESCRIPTIONS.en["th-8"],
    },
    boothCode: "20",
    initials: "PD",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: [""],
    isFavorite: false,
    localLogo: logos.pipedriveLogo,
    isTreasureHunt: true,
    links: [
      {
        label: "Website",
        url: "www.pipedrive.com",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://www.pipedrive.com/en/jobs",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/pipedrive/",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "th-9",
    name: "KPMG Baltics",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-9"],
      en: COMPANY_DESCRIPTIONS.en["th-9"],
    },
    boothCode: "15",
    initials: "KP",
    color: "#1E66FF",
    industries: ["Majandus"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.kpmgBalticsLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "www.kpmg.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://kpmg.com/ee/et/karjaar/vabad-too-ja-praktikakohad.html",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/kpmg-baltics/?viewAsMember=true",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "th-10",
    name: "BLRT GRUPP AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-10"],
      en: COMPANY_DESCRIPTIONS.en["th-10"],
    },
    boothCode: "82",
    initials: "BL",
    color: "#1E66FF",
    industries: ["Manufacturing"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.blrtGruppLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "www.blrt.ee/et", icon: "globe" },
      {
        label: "Careers",
        url: "https://blrt.ee/et/karjaar/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/blrt-grupp/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "th-11",
    name: "Ehitus5ECO",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-11"],
      en: COMPANY_DESCRIPTIONS.en["th-11"],
    },
    boothCode: "62",
    initials: "EH",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.ehitus5ecoLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "https://www.ehitus5eco.ee", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.cvkeskus.ee/tootmisinsener-parnus-aq-components-kodara-ou-1007297",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "th-12",
    name: "SMIT",
    description: {
      et: "Siseministeeriumi infotehnoloogia- ja arenduskeskus",
      en: "Ministry of Interior IT and Development Centre",
    },
    boothCode: "69",
    initials: "SM",
    color: "#1E66FF",
    industries: ["Technology", "Government"],
    hiringTypes: ["Full-time", "Internship"],
    isFavorite: false,
    localLogo: logos.smitLogo,
    isTreasureHunt: true,
  },
  {
    id: "th-13",
    name: "Enginaator",
    description: {
      et: "Inseneribüroo",
      en: "Engineering Bureau",
    },
    boothCode: "105",
    initials: "EN",
    color: "#1E66FF",
    industries: ["Engineering"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.enginaatorLogo,
    isTreasureHunt: true,
  },
  {
    id: "th-14",
    name: "Kaitseliit",
    description: {
      et: "Riigikaitseorganisatsioon",
      en: "National Defence Organization",
    },
    boothCode: "98",
    initials: "KL",
    color: "#1E66FF",
    industries: ["Government"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.kaitseliitLogo,
    isTreasureHunt: true,
  },
  {
    id: "th-15",
    name: "Kaitsepolitseiamet",
    description: {
      et: "Riigi julgeoleku tagamine",
      en: "Ensuring national security",
    },
    boothCode: "68",
    initials: "KA",
    color: "#1E66FF",
    industries: ["Government"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.kaitsepolitseiametLogo,
    isTreasureHunt: true,
  },
];
