// data/treasureHuntCompanies.ts
import { COMPANY_DESCRIPTIONS } from "./companyTranslations";
import { logos } from "./logos";

export type CompanyLinkIcon = "globe" | "linkedin" | "briefcase";

export type CompanyLink = {
  label: string;
  url: string;
  icon?: CompanyLinkIcon;
};

export type CompanyEventType = "talk" | "company-visit" | "work-shadowing";

export type CompanyEvent = {
  id: string;
  companyId: string;
  title: string;
  eventType: CompanyEventType;
  startISO?: string;
  endISO?: string;
  locationText: string;
  registrationUrl?: string;
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
  "Infotehnoloogia",
  "Majandus",
  "Healthcare",
  "Consulting",
  "Engineering",
  "Energy",
  "Retail",
  "Education",
  "Transportation",
  "Logistika",
  "Government",
  "Construction",
  "Manufacturing",
  "Tööstuselektroonika",
  "Tourism",
  "Turism",
  "Other",
  "Kosmos",
  "Energeetika",
  "Transport",
  "Merendus",
  "Riigikaitse",
  "Kaitsetööstus",
  "Lennundus",
  "Sisejulgeolek",
  "Keskkond",
  "Avalik Sektor",
  "Tootmine",
  "Kindlustus",
  "Pangandus",
  "Müük",
  "Meelelahutus",
  "Turundus",
];

export const ALL_HIRING = [
  "Internship",
  "Full-time",
  "Part-time",
  "Graduate",
  "Heategevus",
] as const;

export { logos };

export const treasureHuntCompanies: Company[] = [
  {
    id: "th-1",
    name: "Verston Eesti OÜ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-1"],
      en: COMPANY_DESCRIPTIONS.en["th-1"],
    },
    boothCode: "21",
    initials: "VE",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship", "Part-time"],
    isFavorite: false,
    localLogo: logos.verstonLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "https://www.verston.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://verston.ee/tootamine/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/verston",
        icon: "linkedin",
      },
    ],
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
    industries: ["Infotehnoloogia"],
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
      et: "Gunvor on ettevõte, mis tegutseb oma töötajate heaolu nimel. Meie eesmärk on pakkuda keskkonda, kus töötajad saavad läbi avatud koostöö ja suhtlemise oma loovust rakendada.\n\nGunvori meeskonnad tegelevad järjepidevalt sellega, et parandada meie ettevõtte toimimist, järgides samal ajal kõrgeid eetilisi ja ärilisi standardeid.\n\nGunvor peab esmatähtsaks oma töötajate, klientide ja kogukondade tervise, heaolu, inimõiguste ja ohutuse säilitamise ning austab ja kaitseb keskkonda riikides, kus me tegutseme.",
      en: "Gunvor is a company that acts for the well-being of its employees. Our goal is to provide an environment where employees can apply their creativity through open collaboration and communication.\n\nGunvor teams consistently work to improve how our company operates while following high ethical and business standards.\n\nGunvor prioritizes the health, well-being, human rights, and safety of our employees, customers, and communities, and respects and protects the environment in the countries where we operate.",
    },
    boothCode: "42",
    initials: "GU",
    color: "#1E66FF",
    industries: ["Logistika"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.gunvorServicesLogo,
    isTreasureHunt: true,
    links: [
      {
        label: "Website",
        url: "https://www.gunvorservices.com",
        icon: "globe",
      },
    ],
  },
  {
    id: "th-4",
    name: "ABB AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-4"],
      en: COMPANY_DESCRIPTIONS.en["th-4"],
    },
    boothCode: "108",
    initials: "ABB",
    color: "#1E66FF",
    industries: ["Turundus"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.ABBLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "http://abb.com", icon: "globe" },
      { label: "Careers", url: "https://careers.abb", icon: "briefcase" },
    ],
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
    localLogo: logos.TRAFFESTOULogo,
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
    industries: ["Majandus"],
    hiringTypes: ["Full-time", "Internship"],
    isFavorite: false,
    localLogo: logos.smitLogo,
    isTreasureHunt: true,
  },
  {
    id: "th-13",
    name: "Enginaator",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-13"],
      en: COMPANY_DESCRIPTIONS.en["th-13"],
    },
    boothCode: "105",
    initials: "EN",
    color: "#1E66FF",
    industries: ["Engineering"],
    hiringTypes: [""],
    isFavorite: false,
    localLogo: logos.enginaatorLogo,
    isTreasureHunt: true,
    links: [{ label: "Website", url: "https://enginaator.ee/", icon: "globe" }],
  },
  {
    id: "th-14",
    name: "Kaitseliit",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-14"],
      en: COMPANY_DESCRIPTIONS.en["th-14"],
    },
    boothCode: "98",
    initials: "KL",
    color: "#1E66FF",
    industries: ["Sisejulgeolek"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.kaitseliitLogo,
    isTreasureHunt: true,
    links: [{ label: "Website", url: "http://akmalevkond.ee", icon: "globe" }],
  },
  {
    id: "th-15",
    name: "Kliimaministeerium",
    description: {
      et: COMPANY_DESCRIPTIONS.et["80"],
      en: COMPANY_DESCRIPTIONS.en["80"],
    },
    initials: "KM",
    color: "#1E66FF",
    industries: ["Energeetika", "Transport", "Merendus", "Keskkond"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    isTreasureHunt: true,
    localLogo: logos.kliimaministeeriumLogo,
    links: [
      {
        label: "Website",
        url: "https://www.kliimaministeerium.ee",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://kliimaministeerium.ee/t%C3%B6%C3%B6pakkumised",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/ministry-of-climate-of-estonia",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "th-16",
    name: "Postimees Grupp",
    description: {
      et: COMPANY_DESCRIPTIONS.et["79"],
      en: COMPANY_DESCRIPTIONS.en["79"],
    },
    initials: "PG",
    color: "#1E66FF",
    industries: ["Majandus"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    isTreasureHunt: true,
    localLogo: logos.postimeesLogo,
    links: [
      { label: "Website", url: "https://postimeesgrupp.ee/", icon: "globe" },
      {
        label: "Careers",
        url: "https://postimeesgrupp.ee/praktika",
        icon: "briefcase",
      },
      {
        label: "Careers",
        url: "https://postimeesgrupp.ee/toole",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/postimeesgrupp/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "th-17",
    name: "Smartecon OÜ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["19"],
      en: COMPANY_DESCRIPTIONS.en["19"],
    },
    boothCode: "48",
    initials: "SM",
    color: "#1E66FF",
    industries: ["Energy"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.smarteconLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "https://smartecon.com/et/", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/smartecon",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "th-18",
    name: "Seesam kindlustus",
    description: {
      et: COMPANY_DESCRIPTIONS.et["20"],
      en: COMPANY_DESCRIPTIONS.en["20"],
    },
    boothCode: "94",
    initials: "CO",
    color: "#1E66FF",
    industries: ["Kindlustus", "Majandus"],
    hiringTypes: ["Tööpakkumised puuduvad"],
    isFavorite: false,
    localLogo: logos.compensaLogo,
    isTreasureHunt: true,
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
    id: "th-19",
    name: "CVKeskus.ee",
    description: {
      et: COMPANY_DESCRIPTIONS.et["35"],
      en: COMPANY_DESCRIPTIONS.en["35"],
    },
    boothCode: "100",
    initials: "CV",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: [""],
    isFavorite: false,
    localLogo: logos.cvkeskusLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "https://www.cvkeskus.ee/", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/441415/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "th-20",
    name: "Genius Sports",
    description: {
      et: COMPANY_DESCRIPTIONS.et["64"],
      en: COMPANY_DESCRIPTIONS.en["64"],
    },
    boothCode: "117",
    initials: "GS",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.geniussportsLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "geniussports.com", icon: "globe" },
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
    id: "th-21",
    name: "Ruukki Products AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["68"],
      en: COMPANY_DESCRIPTIONS.en["68"],
    },
    boothCode: "23",
    initials: "RU",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.ruukkiLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "http://www.ruukki.ee/", icon: "globe" },
      {
        label: "Careers",
        url: "https://forms.office.com/pages/responsepage.aspx?id=hPbGfBkW-0m-b5qdmv44666LXwKpnvhAlTngVctTWGxUOUNOTFNJU1FWQk9GT1BHTDc2MVBHN1hVVy4u&origin=QRCode&route=shorturl",
        icon: "briefcase",
      },
    ],
  },
  {
    id: "th-22",
    name: "KPMG Baltics",
    description: {
      et: COMPANY_DESCRIPTIONS.et["th-22"],
      en: COMPANY_DESCRIPTIONS.en["th-22"],
    },
    initials: "KPMG",
    color: "#1E66FF",
    industries: ["Majandus"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.kpmgBalticsLogo,
    isTreasureHunt: true,
    links: [
      { label: "Website", url: "https://www.kpmg.ee", icon: "globe" },
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
];
