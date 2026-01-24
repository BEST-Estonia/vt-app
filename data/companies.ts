// data/companies.ts
import { COMPANY_ABOUT, COMPANY_DESCRIPTIONS } from "./companyTranslations";
import { logos } from "./logos";
import { treasureHuntCompanies } from "./treasureHuntCompanies";

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
];

export const ALL_HIRING = [
  "Internship",
  "Full-time",
  "Part-time",
  "Graduate",
] as const;

export { logos };

// REGULAR COMPANIES (NOT in Treasure Hunt)
const regularCompanies: Company[] = [
  {
    id: "14",
    name: "Nortal AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["14"],
      en: COMPANY_DESCRIPTIONS.en["14"],
    },
    about: {
      et: COMPANY_ABOUT.et["14"],
      en: COMPANY_ABOUT.en["14"],
    },
    boothCode: "103",
    initials: "NO",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.nortalAS,
    links: [
      { label: "Website", url: "https://nortal.com", icon: "globe" },
      {
        label: "Careers",
        url: "https://nortal.com/careers",
        icon: "briefcase",
      },
    ],
  },
  {
    id: "15",
    name: "Inbank",
    description: {
      et: COMPANY_DESCRIPTIONS.et["15"],
      en: COMPANY_DESCRIPTIONS.en["15"],
    },
    about: {
      et: COMPANY_ABOUT.et["15"],
      en: COMPANY_ABOUT.en["15"],
    },
    boothCode: "112",
    initials: "IN",
    color: "#1E66FF",
    industries: ["Majandus"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.inbank,
    links: [
      { label: "Website", url: "https://inbank.ee/", icon: "globe" },
      {
        label: "Careers",
        url: "https://inbank.ee/karjaar",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/inbank-as/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "16",
    name: "Patendiamet",
    description: {
      et: COMPANY_DESCRIPTIONS.et["16"],
      en: COMPANY_DESCRIPTIONS.en["16"],
    },
    about: {
      et: COMPANY_ABOUT.et["16"],
      en: COMPANY_ABOUT.en["16"],
    },
    boothCode: "33",
    initials: "PA",
    color: "#1E66FF",
    industries: ["Avalik sektor"],
    hiringTypes: ["Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.patendiAmet,
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/patendiamet-estonian-patent-office/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "17",
    name: "Tech Group AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["17"],
      en: COMPANY_DESCRIPTIONS.en["17"],
    },
    about: {
      et: COMPANY_ABOUT.et["17"],
      en: COMPANY_ABOUT.en["17"],
    },
    boothCode: "30",
    initials: "TG",
    color: "#1E66FF",
    industries: ["Tootmine"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.techGroupLogo,
    links: [
      { label: "Website", url: "https://techgroup.ee/", icon: "globe" },
      {
        label: "Careers",
        url: "https://techgroup.ee/careers/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/tech-group-as",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "18",
    name: "Stoneridge Electronics AS",
    description: "Automotive electronics and technology.",
    boothCode: "56",
    initials: "SE",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.stoneridgeLogo,
  },
  {
    id: "19",
    name: "Smartecon OÜ",
    description: "Smart energy solutions.",
    boothCode: "48",
    initials: "SM",
    color: "#1E66FF",
    industries: ["Energy"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.smarteconLogo,
  },
  {
    id: "20",
    name: "Seesam kindlustus",
    description: {
      et: COMPANY_DESCRIPTIONS.et["20"],
      en: COMPANY_DESCRIPTIONS.en["20"],
    },
    about: {
      et: COMPANY_ABOUT.et["20"],
      en: COMPANY_ABOUT.en["20"],
    },
    boothCode: "94",
    initials: "CO",
    color: "#1E66FF",
    industries: ["Kindlustus", "Majandus"],
    hiringTypes: ["Tööpakkumised puuduvad"],
    isFavorite: false,
    localLogo: logos.compensaLogo,
    links: [
      { label: "Website", url: "https://seesam.ee/", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/18346040/admin/page-posts/published/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "21",
    name: "Tallinna Vesi",
    description: {
      et: COMPANY_DESCRIPTIONS.et["20"],
      en: COMPANY_DESCRIPTIONS.en["20"],
    },
    boothCode: "27",
    initials: "TV",
    color: "#1E66FF",
    industries: ["Other"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.tallinnvesiLogo,
    links: [
      { label: "Website", url: "https://seesam.ee/", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/18346040/admin/page-posts/published/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "22",
    name: "Registrite ja Infosüsteemide Keskus",
    description: {
      et: COMPANY_DESCRIPTIONS.et["22"],
      en: COMPANY_DESCRIPTIONS.en["22"],
    },
    boothCode: "96",
    initials: "RI",
    color: "#1E66FF",
    industries: ["Government", "Technology"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.rikLogo,
    links: [
      { label: "Website", url: "https://www.rik.ee/et", icon: "globe" },
      {
        label: "Careers",
        url: "https://www.rik.ee/et/karjaarileht/tere-tulemast-riki#toopakkumised",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/414997/admin/page-posts/published/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "23",
    name: "Nordea",
    description: {
      et: COMPANY_DESCRIPTIONS.et["23"],
      en: COMPANY_DESCRIPTIONS.en["23"],
    },
    boothCode: "90",
    initials: "NO",
    color: "#1E66FF",
    industries: ["Pangandus", "Majandus"],
    hiringTypes: ["Praktika", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.nordeaLogo,
    links: [
      { label: "Website", url: "https://www.nordea.com/en", icon: "globe" },
      {
        label: "Careers",
        url: "https://www.nordea.com/en/careers/open-jobs",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/nordea",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "24",
    name: "Rail Baltic Estonia OÜ",
    description: "Developing the Rail Baltica project.",
    boothCode: "55",
    initials: "RB",
    color: "#1E66FF",
    industries: ["Transportation"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.railBalticLogo,
  },
  {
    id: "25",
    name: "Sisekaitseakadeemia",
    description: "Internal security education.",
    boothCode: "63",
    initials: "SK",
    color: "#1E66FF",
    industries: ["Government", "Education"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.sisekaitseakadeemiaLogo,
  },
  {
    id: "26",
    name: "AS TREV-2 Grupp",
    description: "Infrastructure construction.",
    boothCode: "10",
    initials: "TR",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.trev2Logo,
  },
  {
    id: "27",
    name: "AS Harju Elekter",
    description: "Electrical equipment manufacturing.",
    boothCode: "88",
    initials: "HE",
    color: "#1E66FF",
    industries: ["Energy"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.harjuElekterLogo,
  },
  {
    id: "28",
    name: "Enefit",
    description: "Energy solutions.",
    boothCode: "6",
    initials: "EE",
    color: "#1E66FF",
    industries: ["Energy"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.enefitLogo,
  },
  {
    id: "29",
    name: "GPV Estonia AS",
    description: "Electronics manufacturing services.",
    boothCode: "110",
    initials: "GP",
    color: "#1E66FF",
    industries: ["Manufacturing"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.gpvLogo,
  },
  {
    id: "30",
    name: "Swedbank",
    description: {
      et: COMPANY_DESCRIPTIONS.et["30"],
      en: COMPANY_DESCRIPTIONS.en["30"],
    },
    boothCode: "31",
    initials: "SW",
    color: "#1E66FF",
    industries: ["Majandus"],
    hiringTypes: ["Praktika", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.swedbankLogo,
    links: [
      {
        label: "Website",
        url: "https://www.swedbank.com/work-with-us/kick-start-your-career.html",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://www.swedbank.com/work-with-us/kick-start-your-career.html",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/swedbank-eesti/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "31",
    name: "Telia",
    description: {
      et: COMPANY_DESCRIPTIONS.et["31"],
      en: COMPANY_DESCRIPTIONS.en["31"],
    },
    boothCode: "47",
    initials: "TE",
    color: "#1E66FF",
    industries: ["Telekommunikatsioon"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.telia,
    links: [
      {
        label: "Website",
        url: "https://www.telia.ee",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://www.telia.ee/ettevottest/karjaar-telias/sinu-voimalus",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/teliacompany/",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "32",
    name: "Threod Systems",
    description: {
      et: COMPANY_DESCRIPTIONS.et["32"],
      en: COMPANY_DESCRIPTIONS.en["32"],
    },
    boothCode: "44",
    initials: "TH",
    color: "#1E66FF",
    industries: ["Kaitsetööstus", "Engineering"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.threodSystemsLogo,
    links: [
      {
        label: "Website",
        url: "www.threod.com",
        icon: "globe",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/threod-systems",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "33",
    name: "ERGO Insurance SE",
    description: {
      et: COMPANY_DESCRIPTIONS.et["33"],
      en: COMPANY_DESCRIPTIONS.en["33"],
    },
    boothCode: "14",
    initials: "ER",
    color: "#1E66FF",
    industries: ["Majandus"],
    hiringTypes: [""],
    isFavorite: false,
    localLogo: logos.ergoInsuranceLogo,
    links: [
      {
        label: "Website",
        url: "https://www.ergo.ee/",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://ergo.ee/karjaar",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/ergo-kindlustus/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "35",
    name: "CVKeskus.ee",
    description: {
      et: COMPANY_DESCRIPTIONS.et["35"],
      en: COMPANY_DESCRIPTIONS.en["35"],
    },
    boothCode: "100",
    initials: "CV",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: [""],
    isFavorite: false,
    localLogo: logos.cvkeskusLogo,
    links: [
      {
        label: "Website",
        url: "https://www.cvkeskus.ee/",
        icon: "globe",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/441415/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "36",
    name: "Coop Pank AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["36"],
      en: COMPANY_DESCRIPTIONS.en["36"],
    },
    boothCode: "1",
    initials: "CP",
    color: "#1E66FF",
    industries: ["Majandus"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.cooppankLogo,
    links: [
      {
        label: "Website",
        url: "www.cooppank.ee",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://www.cooppank.ee/coop-pank/tule-toole",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/cooppank/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "37",
    name: "Ericsson Eesti",
    description: {
      et: COMPANY_DESCRIPTIONS.et["37"],
      en: COMPANY_DESCRIPTIONS.en["37"],
    },
    boothCode: "18",
    initials: "ER",
    color: "#1E66FF",
    industries: ["Telekommunikatsioon"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.ericssonLogo,
    links: [
      {
        label: "Website",
        url: "ericsson.com",
        icon: "globe",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/ericsson/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "38",
    name: "PLAYTECH ESTONIA",
    description: {
      et: COMPANY_DESCRIPTIONS.et["38"],
      en: COMPANY_DESCRIPTIONS.en["38"],
    },
    boothCode: "38",
    initials: "PL",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.playtechLogo,
    links: [
      {
        label: "Website",
        url: "http://www.playtechpeople.com",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://www.playtechpeople.com/jobs-our/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/playtech/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "39",
    name: "Infragreen",
    description: {
      et: COMPANY_DESCRIPTIONS.et["39"],
      en: COMPANY_DESCRIPTIONS.en["39"],
    },
    boothCode: "26",
    initials: "IN",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.infragreenLogo,
    links: [
      {
        label: "Website",
        url: "www.infragreen.ee",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://infragreen.ee/tule-toole/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://ee.linkedin.com/company/infragreen-o%C3%BC",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "40",
    name: "Rahapesu Andmebüroo",
    description: "Financial intelligence unit.",
    boothCode: "58",
    initials: "RA",
    color: "#1E66FF",
    industries: ["Government"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.rahapesuandmebürooLogo,
  },
  {
    id: "41",
    name: "Kaitseressursside Amet",
    description: "Defense resources agency.",
    boothCode: "29",
    initials: "KR",
    color: "#1E66FF",
    industries: ["Government"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.kaitseressursideametLogo,
  },
  {
    id: "42",
    name: "Tammer OÜ",
    description: "Manufacturing of doors and windows.",
    boothCode: "78",
    initials: "TA",
    color: "#1E66FF",
    industries: ["Manufacturing"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.tammerLogo,
  },
  {
    id: "43",
    name: "Elering AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["43"],
      en: COMPANY_DESCRIPTIONS.en["43"],
    },
    boothCode: "60",
    initials: "EL",
    color: "#1E66FF",
    industries: ["Energeetika"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.eleringLogo,
    links: [
      {
        label: "Website",
        url: "www.elering.ee",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://elering.teamdash.com/p/job/6xRplxgb/karjaarileht",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/28153947/admin/page-posts/published/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "44",
    name: "Helmes AS",
    description: "Software development.",
    boothCode: "91",
    initials: "HE",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.helmesLogo,
  },
  {
    id: "45",
    name: "INF Infra OÜ",
    description: "Infrastructure construction.",
    boothCode: "37",
    initials: "IN",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.infinfraLogo,
  },
  {
    id: "46",
    name: "NOBE OÜ",
    description: "Construction and concrete works.",
    boothCode: "19",
    initials: "NO",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.nobeLogo,
  },
  {
    id: "47",
    name: "Nordecon AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["47"],
      en: COMPANY_DESCRIPTIONS.en["47"],
    },
    boothCode: "70",
    initials: "NO",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.nordeconLogo,
    links: [
      {
        label: "Website",
        url: "https://nordecon.com/",
        icon: "globe",
      },

      {
        label: "LinkedIn",
        url: "https://ee.linkedin.com/company/nordecon",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "48",
    name: "FINEST AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["48"],
      en: COMPANY_DESCRIPTIONS.en["48"],
    },
    boothCode: "83",
    initials: "FI",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.finestLogo,
    links: [
      {
        label: "Website",
        url: "www.finest.eu",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://finest.teamdash.com/p/job/5QexsE0Y/tuletoole",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/142452/admin/dashboard/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "49",
    name: "AS KH Energia-Konsult",
    description: "Energy consulting.",
    boothCode: "101",
    initials: "KH",
    color: "#1E66FF",
    industries: ["Energy"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.khenergiaLogo,
  },
  {
    id: "50",
    name: "Hurtigruten Estonia OÜ",
    description: "Contact center for tourism.",
    boothCode: "11",
    initials: "HU",
    color: "#1E66FF",
    industries: ["Tourism"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.hurtigrutenLogo,
  },
  {
    id: "51",
    name: "Estanc AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["51"],
      en: COMPANY_DESCRIPTIONS.en["51"],
    },
    boothCode: "81",
    initials: "ES",
    color: "#1E66FF",
    industries: ["Manufacturing"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.estancLogo,
    links: [
      {
        label: "Website",
        url: "https://estanc.ee/",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://estanc.ee/et/liitu-meiega/",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/estanc/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "52",
    name: "HEISI",
    description: {
      et: COMPANY_DESCRIPTIONS.et["52"],
      en: COMPANY_DESCRIPTIONS.en["52"],
    },
    boothCode: "104",
    initials: "HE",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.heisiLogo,
    links: [
      {
        label: "Website",
        url: "http://www.heisi.ee",
        icon: "globe",
      },

      {
        label: "LinkedIn",
        url: "http://linkedin.com/company/heisi/",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "53",
    name: "Keskkonnaagentuur",
    description: {
      et: COMPANY_DESCRIPTIONS.et["53"],
      en: COMPANY_DESCRIPTIONS.en["53"],
    },
    boothCode: "49",
    initials: "KE",
    color: "#1E66FF",
    industries: ["Keskkond"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.keskkonnaagentuurLogo,
    links: [
      {
        label: "Website",
        url: "https://keskkonnaagentuur.ee",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://keskkonnaagentuur.ee/asutus-uudised-ja-kontakt/organisatsioon/keskkonnaagentuur-tooandjana-0",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/keskkonnaagentuur/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "55",
    name: "ShoreLink",
    description: {
      et: COMPANY_DESCRIPTIONS.et["55"],
      en: COMPANY_DESCRIPTIONS.en["55"],
    },
    boothCode: "121",
    initials: "SH",
    color: "#1E66FF",
    industries: ["Energeetika"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.shorelinkLogo,
    links: [
      {
        label: "Website",
        url: "https://shore-link.eu/",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://shore-link.eu/career/",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/shorelink/",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "56",
    name: "Bigbank AS",
    description: "Banking.",
    boothCode: "46",
    initials: "BB",
    color: "#1E66FF",
    industries: ["Finance"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.bigbankLogo,
  },

  {
    id: "57",
    name: "Välisluureamet",
    description: "Foreign intelligence.",
    boothCode: "79",
    initials: "VA",
    color: "#1E66FF",
    industries: ["Government"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.välisluureametLogo,
  },
  {
    id: "58",
    name: "EY Eesti",
    description: {
      et: COMPANY_DESCRIPTIONS.et["58"],
      en: COMPANY_DESCRIPTIONS.en["58"],
    },
    boothCode: "115",
    initials: "EY",
    color: "#1E66FF",
    industries: ["Professionaalsed konsultatsiooniteenused"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.ernstLogo,
    links: [
      {
        label: "Website",
        url: "https://www.ey.com/et_ee",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://careers.ey.com/search/?createNewAlert=false&q=estonia&optionsFacetsDD_customfield1=&optionsFacetsDD_country=&optionsFacetsDD_city=",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/ernstandyoung/",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "59",
    name: "Lennuliiklusteeninduse AS",
    description: "Air navigation services.",
    boothCode: "67",
    initials: "LL",
    color: "#1E66FF",
    industries: ["Transportation"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.lennuliiklusteeninduseLogo,
  },
  {
    id: "60",
    name: "Fujitsu Estonia",
    description: "IT services and solutions.",
    boothCode: "61",
    initials: "FU",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.fujitsuLogo,
  },
  {
    id: "61",
    name: "Finantsinspektsioon",
    description: "Financial supervision.",
    boothCode: "57",
    initials: "FI",
    color: "#1E66FF",
    industries: ["Finance", "Government"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.finantsinspektsioonLogo,
  },
  {
    id: "62",
    name: "Connecto",
    description: {
      et: COMPANY_DESCRIPTIONS.et["62"],
      en: COMPANY_DESCRIPTIONS.en["62"],
    },
    boothCode: "28",
    initials: "CO",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.connectoLogo,
    links: [
      {
        label: "Website",
        url: "www.connecto.ee",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://karjaar.connecto.ee/",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/connecto-eesti/about/?viewAsMember=true",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "63",
    name: "Utilitas",
    description: {
      et: COMPANY_DESCRIPTIONS.et["63"],
      en: COMPANY_DESCRIPTIONS.en["63"],
    },
    boothCode: "40",
    initials: "UT",
    color: "#1E66FF",
    industries: ["Energeetika"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.utilitasLogo,
    links: [
      {
        label: "Website",
        url: "www.utilitas.ee",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://utilitas.ee/utilitas/tootamine-utilitases/#liitu-tiimiga",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/utilitas/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "64",
    name: "Genius Sports",
    description: {
      et: COMPANY_DESCRIPTIONS.et["64"],
      en: COMPANY_DESCRIPTIONS.en["64"],
    },
    boothCode: "117",
    initials: "GS",
    color: "#1E66FF",
    industries: ["Technology"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.geniussportsLogo,
    links: [
      {
        label: "Website",
        url: "geniussports.com",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://www.geniussports.com/careers/",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/geniussports/",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "65",
    name: "Scanfil OÜ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["65"],
      en: COMPANY_DESCRIPTIONS.en["65"],
    },
    boothCode: "25",
    initials: "SC",
    color: "#1E66FF",
    industries: ["Manufacturing"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.scanfilLogo,
    links: [
      {
        label: "Website",
        url: "www.scanfil.com",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://careersparnu.scanfil.com/",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/scanfil-plc",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "66",
    name: "AQ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["66"],
      en: COMPANY_DESCRIPTIONS.en["66"],
    },
    boothCode: "24",
    initials: "AQ",
    color: "#1E66FF",
    industries: ["Manufacturing"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.aqlasertoolLogo,
    links: [
      {
        label: "Website",
        url: "https://www.aqgroup.com/en/lasertool/aq-lasertool-ou",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://www.cvkeskus.ee/tootmisinsener-parnus-aq-components-kodara-ou-1007297",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/aq-lasertool/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "67",
    name: "Tartu Ülikool",
    description: "University of Tartu.",
    boothCode: "22",
    initials: "UT",
    color: "#1E66FF",
    industries: ["Education"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.tartuülikoolLogo,
  },
  {
    id: "68",
    name: "Ruukki Products AS",
    description: "Steel products.",
    boothCode: "23",
    initials: "RU",
    color: "#1E66FF",
    industries: ["Manufacturing"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.ruukkiLogo,
  },
  {
    id: "69",
    name: "HANZA Mechanics",
    description: {
      et: COMPANY_DESCRIPTIONS.et["69"],
      en: COMPANY_DESCRIPTIONS.en["69"],
    },
    boothCode: "64",
    initials: "HA",
    color: "#1E66FF",
    industries: ["Manufacturing"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.hanzaLogoImg,
    links: [
      {
        label: "Website",
        url: "https://karjaar.hanza.com/",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://karjaar.hanza.com/",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "http://linkedin.com/company/hanza-group/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "70",
    name: "AS Tallinna Lennujaam",
    description: {
      et: COMPANY_DESCRIPTIONS.et["70"],
      en: COMPANY_DESCRIPTIONS.en["70"],
    },
    boothCode: "39",
    initials: "TL",
    color: "#1E66FF",
    industries: ["Lennundus"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.tallinnalennujaamLogo,
    links: [
      {
        label: "Website",
        url: "https://airport.ee/ettevote/",
        icon: "globe",
      },

      {
        label: "Careers",
        url: "https://airport.ee/ettevote/karjaar-lennujaamas/",
        icon: "briefcase",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/tllairport/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "71",
    name: "Ettevõtluse ja Innovatsiooni Sihtasutus",
    description: "Enterprise Estonia.",
    boothCode: "77",
    initials: "EI",
    color: "#1E66FF",
    industries: ["Government"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.eisLogo,
  },
  {
    id: "72",
    name: "LEONHARD WEISS OÜ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["72"],
      en: COMPANY_DESCRIPTIONS.en["72"],
    },
    boothCode: "13",
    initials: "LW",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.leonhardweissLogo,
    links: [
      {
        label: "Website",
        url: "www.leonhard-weiss.ee",
        icon: "globe",
      },

      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/leonhard-weiss-o%C3%BC",
        icon: "linkedin",
      },
    ],
  },
];

export const companiesSeed: Company[] = [
  ...treasureHuntCompanies,
  ...regularCompanies,
];

export const companyEvents: CompanyEvent[] = [
  {
    id: "evt_bolt_1",
    companyId: "1",
    title: "Skaleeruva tehnoloogia loomine Boltis",
    startISO: "2025-03-12T10:00:00+02:00",
    endISO: "2025-03-12T10:30:00+02:00",
    locationText: "Stage A",
  },

  {
    id: "visit_nortal_1",
    companyId: "14",
    title: "Nortal Firmakülastus",
    startISO: "2025-03-12T15:00:00+02:00",
    endISO: "2025-03-12T17:00:00+02:00",
    locationText: "Peterburi tee 2-52",
  },
  {
    id: "visit_helmes",
    companyId: "44",
    title: "Helmes Firmakülastus",
    startISO: "2025-03-12T15:00:00+02:00",
    endISO: "2025-03-12T17:00:00+02:00",
    locationText: "Peterburi tee 2-52",
  },
];
