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
  "Kaubandus",
  "Hulgimüük",
  "Meelelahutus",
  "Turundus",
  "Kindlustus",
  "Pangandus",
  "Müük",
];

export const ALL_HIRING = [
  "Internship",
  "Full-time",
  "Part-time",
  "Graduate",
  "Heategevus",
] as const;

export { logos };

// REGULAR COMPANIES (NOT in Treasure Hunt)
const regularCompanies: Company[] = [
  {
    id: "81",
    name: "Watercom",
    description: {
      et: COMPANY_DESCRIPTIONS.et["81"],
      en: COMPANY_DESCRIPTIONS.en["81"],
    },
    boothCode: "35",
    initials: "WC",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.watercomLogoImgLogo,
    links: [
      { label: "Website", url: "https://watercom.eu/", icon: "globe" },
      {
        label: "Careers",
        url: "https://watercom.eu/tootamine-watercomis/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://ee.linkedin.com/company/watercom-ou",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "84",
    name: "Politsei- ja Piirivalveamet",
    description: {
      et: COMPANY_DESCRIPTIONS.et["84"],
      en: COMPANY_DESCRIPTIONS.en["84"],
    },
    boothCode: "27",
    initials: "PP",
    color: "#1E66FF",
    industries: ["Sisejulgeolek"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.politseiLogo,
    links: [
      { label: "Website", url: "http://karjaar.politsei.ee", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/eesti-politsei/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "85",
    name: "Coca-Cola HBC Eesti AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["85"],
      en: COMPANY_DESCRIPTIONS.en["85"],
    },
    boothCode: "78",
    initials: "CC",
    color: "#1E66FF",
    industries: ["Kaubandus", "Hulgimüük"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.cocacolaLogo,
    links: [
      {
        label: "Website",
        url: "https://poland-baltics.coca-colahellenic.com/et",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://poland-baltics.coca-colahellenic.com/et",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/coca-cola-hbc/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "86",
    name: "Apollo Group",
    description: {
      et: COMPANY_DESCRIPTIONS.et["86"],
      en: COMPANY_DESCRIPTIONS.en["86"],
    },
    boothCode: "111",
    initials: "AG",
    color: "#1E66FF",
    industries: ["Meelelahutus"],
    hiringTypes: ["Full-time", "Part-time"],
    localLogo: logos.apolloLogo,
    isFavorite: false,
    links: [
      { label: "Website", url: "https://apollogroup.ee/", icon: "globe" },
      {
        label: "Careers",
        url: "https://apolloee.teamdash.com/p/jobs/44/tule-apollosse-toole",
        icon: "briefcase",
      },
    ],
  },
  {
    id: "87",
    name: "Red Bull Wings For Life",
    description: {
      et: COMPANY_DESCRIPTIONS.et["87"],
      en: COMPANY_DESCRIPTIONS.en["87"],
    },
    boothCode: "113",
    initials: "RB",
    color: "#1E66FF",
    industries: ["Turundus"],
    hiringTypes: ["Heategevus"],
    isFavorite: false,
    localLogo: logos.redbullLogo,
    links: [
      {
        label: "Website",
        url: "https://www.wingsforlifeworldrun.com/en",
        icon: "globe",
      },
    ],
  },
  {
    id: "88",
    name: "Freel",
    description: {
      et: COMPANY_DESCRIPTIONS.et["88"],
      en: COMPANY_DESCRIPTIONS.en["88"],
    },
    boothCode: "76",
    initials: "FR",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Part-time"],
    isFavorite: false,
    localLogo: logos.freelLogo,
    links: [
      { label: "Website", url: "https://www.freel.ee", icon: "globe" },
      {
        label: "LinkedIn",
        url: "http://www.linkedin.com/company/freel-ee/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "82",
    name: "Elektrilevi OÜ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["82"],
      en: COMPANY_DESCRIPTIONS.en["82"],
    },
    boothCode: "5",
    initials: "EL",
    color: "#1E66FF",
    industries: ["Energeetika"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.elektrileviLogo,
    links: [
      { label: "Website", url: "http://www.elektrilevi.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://elektrilevi.ee/et/too",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/elektrilevi/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "83",
    name: "Konkurentsiamet",
    description: {
      et: COMPANY_DESCRIPTIONS.et["83"],
      en: COMPANY_DESCRIPTIONS.en["83"],
    },
    boothCode: "32",
    initials: "KA",
    color: "#1E66FF",
    industries: ["Avalik Sektor"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.konkurentsiametLogo,
    links: [
      {
        label: "Website",
        url: "https://www.konkurentsiamet.ee",
        icon: "globe",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/77263229/admin/",
        icon: "linkedin",
      },
    ],
  },
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
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.nortalAS,
    links: [
      { label: "Website", url: "https://nortal.com", icon: "globe" },
      {
        label: "Careers",
        url: "https://careers.nortal.com/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/nortal/",
        icon: "linkedin",
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
    industries: ["Avalik Sektor"],
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
    description: {
      et: COMPANY_DESCRIPTIONS.et["18"],
      en: COMPANY_DESCRIPTIONS.en["18"],
    },
    boothCode: "56",
    initials: "SE",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.stoneridgeLogo,
  },

  {
    id: "21",
    name: "Tallinna Vesi",
    description: {
      et: COMPANY_DESCRIPTIONS.et["21"],
      en: COMPANY_DESCRIPTIONS.en["21"],
    },
    boothCode: "34",
    initials: "TV",
    color: "#1E66FF",
    industries: ["Manufacturing"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.tallinnvesiLogo,
    links: [
      { label: "Website", url: "https://www.tallinnavesi.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://tallinnavesi.ee/karjaar/tookuulutused/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://ee.linkedin.com/company/as-tallinna-vesi",
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
    industries: ["Government", "Infotehnoloogia"],
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
    hiringTypes: ["Internship", "Full-time", "Part-time"],
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
    name: "Rail Baltic Estonia",
    description: {
      et: COMPANY_DESCRIPTIONS.et["24"],
      en: COMPANY_DESCRIPTIONS.en["24"],
    },
    boothCode: "55",
    initials: "RB",
    color: "#1E66FF",
    industries: ["Transportation"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.railBalticLogo,
    links: [
      { label: "Website", url: "https://www.rbestonia.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://rbestonia.teamdash.com/p/job/0DCyfC2b/rail-baltic-estonia",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://ee.linkedin.com/company/rail-baltic-estonia",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "25",
    name: "Sisekaitseakadeemia",
    description: {
      et: COMPANY_DESCRIPTIONS.et["25"],
      en: COMPANY_DESCRIPTIONS.en["25"],
    },
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
    description: {
      et: COMPANY_DESCRIPTIONS.et["26"],
      en: COMPANY_DESCRIPTIONS.en["26"],
    },
    boothCode: "10",
    initials: "TR",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.trev2Logo,
    links: [
      { label: "Website", url: "https://trev2.ee/", icon: "globe" },
      {
        label: "Careers",
        url: "https://trev2.ee/too-ja-praktika/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/trev-2-grupp",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "27",
    name: "AS Harju Elekter",
    description: {
      et: COMPANY_DESCRIPTIONS.et["27"],
      en: COMPANY_DESCRIPTIONS.en["27"],
    },
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
    description: {
      et: COMPANY_DESCRIPTIONS.et["28"],
      en: COMPANY_DESCRIPTIONS.en["28"],
    },
    boothCode: "6",
    initials: "EE",
    color: "#1E66FF",
    industries: ["Energeetika"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.enefitLogo,
    links: [
      { label: "Website", url: "https://www.enefit.com/", icon: "globe" },
      {
        label: "Careers",
        url: "https://www.enefit.com/et/too-ja-praktika/tule-toole",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/eesti-energia/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "29",
    name: "GPV Estonia AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["29"],
      en: COMPANY_DESCRIPTIONS.en["29"],
    },
    boothCode: "110",
    initials: "GP",
    color: "#1E66FF",
    industries: ["Tööstuselektroonika", "Tootmine"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.gpvLogo,
    links: [
      {
        label: "Careers",
        url: "https://gpvestonia.recruitee.com/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/gpv/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
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
    hiringTypes: ["Internship", "Full-time", "Part-time"],
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
    boothCode: "12",
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
    industries: ["Infotehnoloogia"],
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
    description: {
      et: COMPANY_DESCRIPTIONS.et["40"],
      en: COMPANY_DESCRIPTIONS.en["40"],
    },
    boothCode: "58",
    initials: "RA",
    color: "#1E66FF",
    industries: ["Majandus"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.rahapesuandmeburooLogo,
  },
  {
    id: "41",
    name: "Kaitseressursside Amet",
    description: {
      et: COMPANY_DESCRIPTIONS.et["41"],
      en: COMPANY_DESCRIPTIONS.en["41"],
    },
    boothCode: "29",
    initials: "KR",
    color: "#1E66FF",
    industries: ["Riigikaitse", "Merendus"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.kaitseressursideametLogo,
    links: [
      { label: "Website", url: "https://kra.ee/", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/kaitseressursside-amet?originalSubdomain=ee",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "42",
    name: "Tammer OÜ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["42"],
      en: COMPANY_DESCRIPTIONS.en["42"],
    },
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
    name: "Helmes",
    description: {
      et: COMPANY_DESCRIPTIONS.et["44"],
      en: COMPANY_DESCRIPTIONS.en["44"],
    },
    boothCode: "91",
    initials: "HE",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.helmesLogo,
    links: [
      { label: "Website", url: "https://helmes.com", icon: "globe" },
      {
        label: "Careers",
        url: "https://www.helmes.com/career/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/helmes-as",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "45",
    name: "INF Infra OÜ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["45"],
      en: COMPANY_DESCRIPTIONS.en["45"],
    },
    boothCode: "37",
    initials: "IN",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.infinfraLogo,
    links: [
      { label: "Website", url: "https://www.infinfra.ee", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/inf-infra/about/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "46",
    name: "NOBE OÜ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["46"],
      en: COMPANY_DESCRIPTIONS.en["46"],
    },
    boothCode: "19",
    initials: "NO",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.nobeLogo,
    links: [
      { label: "Website", url: "https://nobe.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://nobe.ee/toopakkumised/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://ee.linkedin.com/company/nobeehitus",
        icon: "linkedin",
      },
    ],
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
    industries: ["Infotehnoloogia"],
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
    name: "KH Energia-Konsult AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["49"],
      en: COMPANY_DESCRIPTIONS.en["49"],
    },
    boothCode: "101",
    initials: "KH",
    color: "#1E66FF",
    industries: ["Energeetika"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.khenergiaLogo,
    links: [
      { label: "Website", url: "https://www.khenergia.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://www.khenergia.ee/toopakkumised/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/105733331",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "50",
    name: "Hurtigruten Estonia",
    description: {
      et: COMPANY_DESCRIPTIONS.et["50"],
      en: COMPANY_DESCRIPTIONS.en["50"],
    },
    boothCode: "11",
    initials: "HU",
    color: "#1E66FF",
    industries: ["Turism"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.hurtigrutenLogo,
    links: [
      {
        label: "Website",
        url: "https://www.hurtigrutenestonia.ee",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://hurtigrutenestonia.ee/#jobs",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/hurtigrutengroup",
        icon: "linkedin",
      },
    ],
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
    industries: ["Infotehnoloogia"],
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
    description: {
      et: COMPANY_DESCRIPTIONS.et["56"],
      en: COMPANY_DESCRIPTIONS.en["56"],
    },
    boothCode: "46",
    initials: "BB",
    color: "#1E66FF",
    industries: ["Majandus"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.bigbankLogo,
    links: [
      { label: "Website", url: "https://www.bigbank.ee/", icon: "globe" },
      {
        label: "Careers",
        url: "https://jobs.bigbank.eu/et",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/bigbank-as/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },

  {
    id: "57",
    name: "Välisluureamet",
    description: {
      et: COMPANY_DESCRIPTIONS.et["57"],
      en: COMPANY_DESCRIPTIONS.en["57"],
    },
    boothCode: "79",
    initials: "VA",
    color: "#1E66FF",
    industries: ["Sisejulgeolek"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.valisluureametLogo,
    links: [
      { label: "Website", url: "https://valisluureamet.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://valisluureamet.ee/toole.html",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/valisluureamet",
        icon: "linkedin",
      },
    ],
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
    industries: ["Consulting"],
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
    description: {
      et: COMPANY_DESCRIPTIONS.et["59"],
      en: COMPANY_DESCRIPTIONS.en["59"],
    },
    boothCode: "67",
    initials: "LL",
    color: "#1E66FF",
    industries: ["Lennundus"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.lennuliiklusteeninduseLogo,
    links: [
      { label: "Website", url: "https://www.eans.ee", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/estonian-air-navigation-services/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "60",
    name: "Fujitsu Estonia",
    description: {
      et: COMPANY_DESCRIPTIONS.et["60"],
      en: COMPANY_DESCRIPTIONS.en["60"],
    },
    boothCode: "61",
    initials: "FU",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.fujitsuLogo,
  },
  {
    id: "61",
    name: "Finantsinspektsioon",
    description: {
      et: COMPANY_DESCRIPTIONS.et["61"],
      en: COMPANY_DESCRIPTIONS.en["61"],
    },
    boothCode: "57",
    initials: "FI",
    color: "#1E66FF",
    industries: ["Majandus", "Government"],
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
    description: {
      et: COMPANY_DESCRIPTIONS.et["67"],
      en: COMPANY_DESCRIPTIONS.en["67"],
    },
    boothCode: "22",
    initials: "UT",
    color: "#1E66FF",
    industries: ["Education"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.tartuulikoolLogo,
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
  {
    id: "74",
    name: "Omniva",
    description: {
      et: COMPANY_DESCRIPTIONS.et["74"],
      en: COMPANY_DESCRIPTIONS.en["74"],
    },
    boothCode: "107",
    initials: "OM",
    color: "#1E66FF",
    industries: ["Logistika"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.omnivaLogo,
    links: [
      { label: "Website", url: "https://www.omniva.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://www.omnivagroup.com/et/karjaar/toopakkumised/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/omnivagroup/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "75",
    name: "Space Estonia",
    description: {
      et: COMPANY_DESCRIPTIONS.et["75"],
      en: COMPANY_DESCRIPTIONS.en["75"],
    },
    boothCode: "77",
    initials: "SE",
    color: "#1E66FF",
    industries: ["Kosmos"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.spaceestoniaLogoImgLogo,
    links: [
      { label: "Website", url: "https://www.eis.ee/kosmos", icon: "globe" },
      {
        label: "Careers",
        url: "https://jobs.esa.int/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "http://linkedin.com/showcase/space-estonia/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "76",
    name: "CERN",
    description: {
      et: COMPANY_DESCRIPTIONS.et["76"],
      en: COMPANY_DESCRIPTIONS.en["76"],
    },
    boothCode: "59",
    initials: "CE",
    color: "#1E66FF",
    industries: ["Engineering"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.cernLogo,
    links: [
      { label: "Website", url: "https://home.cern/", icon: "globe" },
      {
        label: "Careers",
        url: "https://careers.cern/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/cern",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "77",
    name: "itestra Gmbh",
    description: {
      et: COMPANY_DESCRIPTIONS.et["77"],
      en: COMPANY_DESCRIPTIONS.en["77"],
    },
    boothCode: "4",
    initials: "IT",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.itestraLogoImgLogo,
    links: [
      { label: "Website", url: "https://itestra.com/", icon: "globe" },
      {
        label: "Careers",
        url: "https://itestra.com/en/join/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/itestra/?viewAsMember=true",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "78",
    name: "KMG OÜ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["78"],
      en: COMPANY_DESCRIPTIONS.en["78"],
    },
    boothCode: "45",
    initials: "KM",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.kmgLogo,
    links: [
      { label: "Website", url: "https://kmg.ee/katenditood/", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/kmg-o%C3%BC/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "89",
    name: "Kaitsepolitseiamet",
    description: {
      et: COMPANY_DESCRIPTIONS.et["89"],
      en: COMPANY_DESCRIPTIONS.en["89"],
    },
    boothCode: "68",
    initials: "KP",
    color: "#1E66FF",
    industries: ["Sisejulgeolek"],
    hiringTypes: ["Internship", "Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.kaitsepolitseiametLogo,
    links: [
      { label: "Website", url: "https://kapo.ee/", icon: "globe" },
      {
        label: "Careers",
        url: "https://kapo.ee/et/kandideeri/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://ee.linkedin.com/company/kaitsepolitsei",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "90",
    name: "Magnetic Group",
    description: {
      et: COMPANY_DESCRIPTIONS.et["90"],
      en: COMPANY_DESCRIPTIONS.en["90"],
    },
    initials: "MG",
    color: "#1E66FF",
    industries: ["Lennundus"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.magneticgroupLogo,
    links: [
      { label: "Website", url: "https://www.magneticgroup.co/", icon: "globe" },
      {
        label: "Careers",
        url: "https://www.magneticgroup.co/open-positions/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/magneticgroup/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "91",
    name: "Bolt",
    description: {
      et: COMPANY_DESCRIPTIONS.et["91"],
      en: COMPANY_DESCRIPTIONS.en["91"],
    },
    initials: "BO",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Internship", "Full-time"],
    isFavorite: false,
    localLogo: logos.boltLogo,
    links: [
      {
        label: "Website",
        url: "https://bolt.eu/en/careers/teams/early-careers/",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://bolt.eu/en/careers/teams/early-careers/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/bolt-eu",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "92",
    name: "Electric Wings UAS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["92"],
      en: COMPANY_DESCRIPTIONS.en["92"],
    },
    initials: "EW",
    color: "#1E66FF",
    industries: ["Kaitsetööstus"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.electricWingsLogo,
    links: [
      { label: "Website", url: "https://electricwings.ee/", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/electric-wings-uas/posts/?feedView=all",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "93",
    name: "Directo OÜ",
    description: {
      et: COMPANY_DESCRIPTIONS.et["93"],
      en: COMPANY_DESCRIPTIONS.en["93"],
    },
    initials: "DO",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Full-time", "Part-time"],
    isFavorite: false,
    localLogo: logos.directoLogo,
    links: [
      { label: "Website", url: "https://directo.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://directo.ee/pakume-tood-arendajale",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/directo-erp/",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "94",
    name: "Vanglateenistus",
    description: {
      et: COMPANY_DESCRIPTIONS.et["94"],
      en: COMPANY_DESCRIPTIONS.en["94"],
    },
    initials: "VA",
    color: "#1E66FF",
    industries: ["Sisejulgeolek"],
    hiringTypes: ["Full-time"],
    isFavorite: false,
    localLogo: logos.vanglateenistusLogo,
    links: [
      {
        label: "Website",
        url: "https://karjaar.vanglateenistus.ee/",
        icon: "globe",
      },
      {
        label: "Careers",
        url: "https://karjaar.vanglateenistus.ee/karjaar/vabad-tookohad",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/vanglateenistus/?originalSubdomain=ee",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "95",
    name: "GRK Eesti AS",
    description: {
      et: COMPANY_DESCRIPTIONS.et["95"],
      en: COMPANY_DESCRIPTIONS.en["95"],
    },
    initials: "GRK",
    color: "#1E66FF",
    industries: ["Construction"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.grkLogo,
    links: [
      { label: "Website", url: "https://www.grk.ee", icon: "globe" },
      {
        label: "Careers",
        url: "https://www.grk.fi/ee/tookohad/",
        icon: "briefcase",
      },
      {
        label: "LinkedIn",
        url: "https://fi.linkedin.com/company/grkfi",
        icon: "linkedin",
      },
    ],
  },
  {
    id: "96",
    name: "ÕF Kuhuuu",
    description: {
      et: COMPANY_DESCRIPTIONS.et["96"],
      en: COMPANY_DESCRIPTIONS.en["96"],
    },
    initials: "KU",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.kuhuuuLogo,
    links: [{ label: "Website", url: "https://kuhuuu.com", icon: "globe" }],
  },
  {
    id: "97",
    name: "SVARA AI",
    description: {
      et: COMPANY_DESCRIPTIONS.et["97"],
      en: COMPANY_DESCRIPTIONS.en["97"],
    },
    initials: "SV",
    color: "#1E66FF",
    industries: ["Infotehnoloogia"],
    hiringTypes: ["Internship"],
    isFavorite: false,
    localLogo: logos.svaraLogo,
    links: [
      { label: "Website", url: "https://svara-ai.com", icon: "globe" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/ai-svara/",
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
    eventType: "talk",
    startISO: "2025-03-12T10:00:00+02:00",
    endISO: "2025-03-12T10:30:00+02:00",
    locationText: "Stage A",
  },

  {
    id: "visit_elering_1",
    companyId: "43",
    title: "Elering Firmakülastus",
    eventType: "company-visit",
    startISO: "2025-03-10T10:00:00+02:00",
    endISO: "2025-03-10T12:00:00+02:00",
    locationText: "Kadaka tee 42, Mustamäe",
    registrationUrl: "https://forms.gle/4z5VTjSyhGKP8PwX9",
  },

  {
    id: "visit_rail_baltic_1",
    companyId: "24",
    title: "Rail Baltic Estonia Firmakülastus",
    eventType: "company-visit",
    startISO: "2025-03-11T10:00:00+02:00",
    endISO: "2025-03-11T12:00:00+02:00",
    locationText: "Veskiposti 2/1, Tallinn. Polarise hoone 8.korrus",
    registrationUrl: "https://forms.gle/4z5VTjSyhGKP8PwX9",
  },

  {
    id: "visit_tammer_1",
    companyId: "42",
    title: "Tammer OÜ Firmakülastus",
    eventType: "company-visit",
    startISO: "2025-03-12T14:00:00+02:00",
    endISO: "2025-03-12T16:00:00+02:00",
    locationText: "Väike Paala 4, Tallinn",
    registrationUrl: "https://forms.gle/4z5VTjSyhGKP8PwX9",
  },

  {
    id: "visit_fujitsu_1",
    companyId: "60",
    title: "Fujitsu Estonia Firmakülastus",
    eventType: "company-visit",
    startISO: "2025-03-05T11:30:00+02:00",
    endISO: "2025-03-05T12:30:00+02:00",
    locationText: "Sepise 7, Alma Tominga maja 5 korrus",
    registrationUrl: "https://forms.gle/4z5VTjSyhGKP8PwX9",
  },

  {
    id: "visit_estanc_1",
    companyId: "51",
    title: "Estanc AS Firmakülastus",
    eventType: "company-visit",
    startISO: "2025-03-13T12:00:00+02:00",
    endISO: "2025-03-13T14:00:00+02:00",
    locationText: "Põrguvälja tee 5a, Pildiküla, Rae vald, Harjumaa",
    registrationUrl: "https://forms.gle/4z5VTjSyhGKP8PwX9",
  },

  {
    id: "visit_nortal_1",
    companyId: "14",
    title: "Nortal Firmakülastus",
    eventType: "company-visit",
    startISO: "2025-03-12T15:00:00+02:00",
    endISO: "2025-03-12T17:00:00+02:00",
    locationText: "Peterburi tee 2-52",
    registrationUrl: "https://forms.gle/4z5VTjSyhGKP8PwX9",
  },

  {
    id: "shadow_elering_1",
    companyId: "43",
    title: "Töövarjupäev",
    eventType: "work-shadowing",
    locationText: "Täpsustamisel",
    registrationUrl: "https://forms.gle/hyBhmtU3PQZin5yz8",
  },

  {
    id: "shadow_space_estonia_1",
    companyId: "75",
    title: "Töövarjupäev",
    eventType: "work-shadowing",
    locationText: "Täpsustamisel",
    registrationUrl: "https://forms.gle/hyBhmtU3PQZin5yz8",
  },

  {
    id: "shadow_southwestern_1",
    companyId: "th-7",
    title: "Töövarjupäev",
    eventType: "work-shadowing",
    locationText: "Täpsustamisel",
    registrationUrl: "https://forms.gle/hyBhmtU3PQZin5yz8",
  },

  {
    id: "shadow_traffest_1",
    companyId: "th-5",
    title: "Töövarjupäev",
    eventType: "work-shadowing",
    locationText: "Täpsustamisel",
    registrationUrl: "https://forms.gle/hyBhmtU3PQZin5yz8",
  },
];
