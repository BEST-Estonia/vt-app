// app/(tabs)/map.tsx
import React, { useState } from 'react';
import { Dimensions, Image, Modal, Pressable, Text, View } from 'react-native';
import FloorMap from './assets/realplan1.svg';
// Import the central logos object
import { logos } from './data/logos';

type PlaceholderBooth = {
  boothNumber: string;
  x: number;
  y: number;
};

type NodeId = string;

type PathNode = {
  id: NodeId;
  x: number;
  y: number;
  neighbors: NodeId[];
};

// --- BOKSIDE KOORDINAADID ---
const BOOTHS: PlaceholderBooth[] = [
  { boothNumber: '1', x: 0.5006, y: 0.2050 },
  { boothNumber: '2', x: 0.5006, y: 0.185 },
  { boothNumber: '3', x: 0.5006, y: 0.1594 },
  { boothNumber: '4', x: 0.5006, y: 0.1400 },
  { boothNumber: '5', x: 0.4646, y: 0.2036 },
  { boothNumber: '6', x: 0.4646, y: 0.1884 },
  { boothNumber: '7', x: 0.4646, y: 0.1732 },
  { boothNumber: '8', x: 0.4646, y: 0.1580 },
  { boothNumber: '9', x: 0.4646, y: 0.1429 },
  { boothNumber: '10', x: 0.5347, y: 0.1427 },
  { boothNumber: '11', x: 0.5347, y: 0.1582 },
  { boothNumber: '12', x: 0.5347, y: 0.173 },
  { boothNumber: '13', x: 0.5347, y: 0.1882 },
  { boothNumber: '14', x: 0.5347, y: 0.2033 },

  { boothNumber: '15', x: 0.5520, y: 0.2216 },
  { boothNumber: '16', x: 0.5524, y: 0.2407 },

  { boothNumber: '17', x: 0.5514, y: 0.2786 },
  { boothNumber: '18', x: 0.5514, y: 0.299 },
  { boothNumber: '19', x: 0.5514, y: 0.3217 },
  { boothNumber: '20', x: 0.5514, y: 0.3495 },
  { boothNumber: '21', x: 0.5514, y: 0.3727 },
  { boothNumber: '22', x: 0.5514, y: 0.4012 },
  { boothNumber: '23', x: 0.5514, y: 0.4164 },
  { boothNumber: '24', x: 0.5514, y: 0.4312 },
  { boothNumber: '25', x: 0.5514, y: 0.4466 },
  { boothNumber: '26', x: 0.5514, y: 0.4618 },

  { boothNumber: '27', x: 0.4061, y: 0.340 },
  { boothNumber: '28', x: 0.3842, y: 0.340 },
  { boothNumber: '29', x: 0.3631, y: 0.34 },
  { boothNumber: '30', x: 0.3415, y: 0.34 },
  { boothNumber: '31', x: 0.3201, y: 0.34 },
  { boothNumber: '32', x: 0.2985, y: 0.34 },
  { boothNumber: '33', x: 0.2771, y: 0.34 },
  { boothNumber: '34', x: 0.2558, y: 0.34 },
  { boothNumber: '35', x: 0.2345, y: 0.34 },

  { boothNumber: '36', x: 0.22, y: 0.3501 },
  { boothNumber: '37', x: 0.22, y: 0.3655 },

  { boothNumber: '38', x: 0.2337, y: 0.3935 },
  { boothNumber: '39', x: 0.2555, y: 0.3935 },
  { boothNumber: '40', x: 0.277, y: 0.3935 },
  { boothNumber: '41', x: 0.298, y: 0.3935 },

  { boothNumber: '42', x: 0.353, y: 0.5280 },
  { boothNumber: '43', x: 0.353, y: 0.5129 },
  { boothNumber: '44', x: 0.353, y: 0.4978 },
  { boothNumber: '45', x: 0.353, y: 0.4827 },
  { boothNumber: '46', x: 0.353, y: 0.4676 },

  { boothNumber: '47', x: 0.3279, y: 0.4569 },
  { boothNumber: '48', x: 0.3069, y: 0.4569 },
  { boothNumber: '49', x: 0.285, y: 0.4569 },
  { boothNumber: '50', x: 0.2634, y: 0.4569 },
  { boothNumber: '51', x: 0.242, y: 0.4569 },
  { boothNumber: '52', x: 0.22, y: 0.4569 },
  { boothNumber: '53', x: 0.199, y: 0.4569 },
  { boothNumber: '54', x: 0.1775, y: 0.4569 },
  { boothNumber: '55', x: 0.156, y: 0.4569 },

  { boothNumber: '56', x: 0.1299, y: 0.47 },
  { boothNumber: '57', x: 0.1299, y: 0.4852 },
  { boothNumber: '58', x: 0.1299, y: 0.5003 },
  { boothNumber: '59', x: 0.1299, y: 0.5156 },
  { boothNumber: '60', x: 0.1299, y: 0.5307 },
  { boothNumber: '61', x: 0.1299, y: 0.5463 },
  { boothNumber: '62', x: 0.1299, y: 0.561 },

  { boothNumber: '63', x: 0.1442, y: 0.575 },
  { boothNumber: '64', x: 0.1655, y: 0.575 },
  { boothNumber: '65', x: 0.1871, y: 0.575 },
  { boothNumber: '66', x: 0.2085, y: 0.575 },
  { boothNumber: '67', x: 0.2301, y: 0.575 },

  { boothNumber: '68', x: 0.2561, y: 0.598 },

  { boothNumber: '69', x: 0.2829, y: 0.5664 },

  { boothNumber: '70', x: 0.3323, y: 0.5414 },
  { boothNumber: '71', x: 0.3323, y: 0.5260 },

  { boothNumber: '72', x: 0.3079, y: 0.5119 },
  { boothNumber: '73', x: 0.2863, y: 0.5119 },
  { boothNumber: '74', x: 0.2650, y: 0.5119 },
  { boothNumber: '75', x: 0.2434, y: 0.5119 },
  { boothNumber: '76', x: 0.2220, y: 0.5119 },

  { boothNumber: '77', x: 0.1975, y: 0.5260 },
  { boothNumber: '78', x: 0.1975, y: 0.5414 },

  { boothNumber: '79', x: 0.2222, y: 0.5557 },
  { boothNumber: '80', x: 0.2439, y: 0.5557 },
  { boothNumber: '81', x: 0.2653, y: 0.5557 },
  { boothNumber: '82', x: 0.2867, y: 0.5557 },
  { boothNumber: '83', x: 0.3081, y: 0.5557 },

  { boothNumber: '84', x: 0.5244, y: 0.6967 },

  { boothNumber: '85', x: 0.5244, y: 0.72 },
  { boothNumber: '86', x: 0.5244, y: 0.735 },
  { boothNumber: '87', x: 0.5244, y: 0.7583 },
  { boothNumber: '88', x: 0.5244, y: 0.7739 },
  { boothNumber: '89', x: 0.5244, y: 0.797 },
  { boothNumber: '90', x: 0.5244, y: 0.8126 },

  { boothNumber: '91', x: 0.6325, y: 0.7151 },
  { boothNumber: '92', x: 0.6325, y: 0.7341 },
  { boothNumber: '93', x: 0.6325, y: 0.7491 },
  { boothNumber: '94', x: 0.6325, y: 0.7641 },
  { boothNumber: '95', x: 0.6325, y: 0.7791 },

  { boothNumber: '96', x: 0.6325, y: 0.8121 },
  { boothNumber: '97', x: 0.6325, y: 0.8311 },
  { boothNumber: '98', x: 0.6325, y: 0.8463 },
  { boothNumber: '99', x: 0.6325, y: 0.8613 },
  { boothNumber: '100', x: 0.6325, y: 0.8763 },

  { boothNumber: '101', x: 0.6815, y: 0.8999 },
  { boothNumber: '102', x: 0.6601, y: 0.8999 },
  { boothNumber: '103', x: 0.6383, y: 0.8999 },

  { boothNumber: '104', x: 0.6996, y: 0.8899 },
  { boothNumber: '105', x: 0.6996, y: 0.8748 },
  { boothNumber: '106', x: 0.6996, y: 0.851 },
  { boothNumber: '107', x: 0.6996, y: 0.8362 },
  { boothNumber: '108', x: 0.6996, y: 0.8123 },
  { boothNumber: '109', x: 0.6996, y: 0.7975 },
  { boothNumber: '110', x: 0.6996, y: 0.7739 },
  { boothNumber: '111', x: 0.6996, y: 0.7583 },
  { boothNumber: '112', x: 0.6996, y: 0.7349 },
  { boothNumber: '113', x: 0.6996, y: 0.7197 },
  { boothNumber: '114', x: 0.6996, y: 0.6976 },

  { boothNumber: '115', x: 0.6835, y: 0.6846 },
  { boothNumber: '116', x: 0.6621, y: 0.6846 },
  { boothNumber: '117', x: 0.641, y: 0.6846 },

  { boothNumber: '118', x: 0.6649, y: 0.7187 },
  { boothNumber: '119', x: 0.6649, y: 0.7348 },
  { boothNumber: '120', x: 0.6649, y: 0.7653 },
  { boothNumber: '121', x: 0.6649, y: 0.7804 },
  { boothNumber: '122', x: 0.6649, y: 0.8107 },
  { boothNumber: '123', x: 0.6649, y: 0.8258 },
  { boothNumber: '124', x: 0.6649, y: 0.8558 },
  { boothNumber: '125', x: 0.6649, y: 0.8728 },
];

// Use centralized logos where available
const COMPANY_BY_BOOTH: Record<
  string,
  { name: string; logoUri?: any }
> = {
  '1': { name: 'Coop Pank AS', logoUri: logos.cooppankLogo },
  '5': { name: 'Enefit', logoUri: logos.enefitLogo },
  '6': { name: 'Enefit', logoUri: logos.enefitLogo },
  '10': { name: 'AS TREV-2 Grupp', logoUri: logos.trev2Logo },
  '11': { name: 'Hurtigruten Estonia OÜ', logoUri: logos.hurtigrutenLogo },
  '13': { name: 'LEONHARD WEISS OÜ', logoUri: logos.leonhardweissLogo },
  '14': { name: 'ERGO Insurance SE', logoUri: logos.ergoInsuranceLogo },
  '15': { name: 'KPMG Baltics OÜ', logoUri: logos.kpmgBalticsLogo },
  '16': { name: 'KPMG Baltics OÜ', logoUri: logos.kpmgBalticsLogo },
  '17': { name: 'Southwestern Advantage', logoUri: logos.southwesternAdvantageLogo },
  '18': { name: 'Ericsson Eesti AS', logoUri: logos.ericssonLogo },
  '19': { name: 'NOBE OÜ', logoUri: logos.nobeLogo },
  '20': { name: 'Pipedrive OÜ', logoUri: logos.pipedriveLogo },
  '21': { name: 'Verston OÜ', logoUri: logos.verstonLogo },
  '22': { name: 'Tartu Ülikool', logoUri: logos.tartuülikoolLogo },
  '23': { name: 'Ruukki Products AS', logoUri: logos.ruukkiLogo },
  '24': { name: 'AQ Lasertool OÜ', logoUri: logos.aqlasertoolLogo },
  '25': { name: 'Scanfil OÜ', logoUri: logos.scanfilLogo },
  '26': { name: 'Infragreen OÜ', logoUri: logos.infragreenLogo },
  '27': { name: 'Tallinna Vesi AS', logoUri: logos.tallinnvesiLogo },
  '28': { name: 'AS Connecto Infra', logoUri: logos.connectoLogo },
  '29': { name: 'Kaitseressursside Amet', logoUri: logos.kaitseressursideametLogo },
  '30': { name: 'Tech Group AS', logoUri: logos.techGroupLogo },
  '31': { name: 'Swedbank AS', logoUri: logos.swedbankLogo },
  '32': { name: 'Konkurentsiamet', logoUri: require('./assets/konkurentsiamet.jpg') }, // Keep if needed
  '33': { name: 'Patendiamet', logoUri: logos.patendiAmet },
  '36': { name: 'INF Infra OÜ', logoUri: logos.infinfraLogo },
  '37': { name: 'INF Infra OÜ', logoUri: logos.infinfraLogo },
  '38': { name: 'PLAYTECH ESTONIA OÜ', logoUri: logos.playtechLogo },
  '39': { name: 'AS Tallinna Lennujaam', logoUri: logos.tallinnalennujaamLogo },
  '40': { name: 'Utilitas OÜ', logoUri: logos.utilitasLogo },
  '41': { name: 'Utilitas OÜ', logoUri: logos.utilitasLogo },
  '42': { name: 'Gunvor Services AS', logoUri: logos.gunvorServicesLogo },
  '43': { name: 'Gunvor Services AS', logoUri: logos.gunvorServicesLogo },
  '44': { name: 'Threod Systems AS', logoUri: logos.threodSystemsLogo },
  '46': { name: 'Bigbank AS', logoUri: logos.bigbankLogo },
  '47': { name: 'Telia Eesti AS', logoUri: logos.telia },
  '48': { name: 'Smartecon OÜ', logoUri: logos.smarteconLogo },
  '49': { name: 'Keskkonnaagentuur', logoUri: logos.keskkonnaagentuurLogo },
  '55': { name: 'Rail Baltic Estonia OÜ', logoUri: logos.railBalticLogo },
  '56': { name: 'Stoneridge Electronics AS', logoUri: logos.stoneridgeLogo },
  '57': { name: 'Finantsinspektsioon', logoUri: logos.finantsinspektsioonLogo },
  '58': { name: 'Rahapesu Andmebüroo', logoUri: logos.rahapesuandmebürooLogo },
  '60': { name: 'Elering AS', logoUri: logos.eleringLogo },
  '61': { name: 'Fujitsu Estonia', logoUri: logos.fujitsuLogo },
  '62': { name: 'Ehitus5ECO OÜ', logoUri: logos.ehitus5ecoLogo },
  '63': { name: 'Sisekaitseakadeemia', logoUri: logos.sisekaitseakadeemiaLogo },
  '64': { name: 'HANZA SSC Tartu OÜ', logoUri: require('./assets/hanza-logo.png') }, // Keep if needed
  '65': { name: 'AS Eesti Raudtee', logoUri: logos.eestiRaudteeLogo },
  '66': { name: 'AS Eesti Raudtee', logoUri: logos.eestiRaudteeLogo },
  '67': { name: 'Lennuliiklusteeninduse AS', logoUri: logos.lennuliiklusteeninduseLogo },
  '68': { name: 'Kaitsepolitseiamet', logoUri: logos.kaitsepolitseiametLogo },
  '69': { name: 'SMIT', logoUri: logos.smitLogo },
  '70': { name: 'Nordecon AS', logoUri: logos.nordeconLogo },
  '71': { name: 'TRAFFEST OÜ', logoUri: logos.TRAFFESTOÜLogo },
  '77': { name: 'Ettevõtluse ja Innovatsiooni Sihtasutus', logoUri: logos.eisLogo },
  '78': { name: 'Tammer OÜ', logoUri: logos.tammerLogo },
  '79': { name: 'Välisluureamet', logoUri: logos.välisluureametLogo },
  '80': { name: 'Välisluureamet', logoUri: logos.välisluureametLogo },
  '81': { name: 'Estanc AS', logoUri: logos.estancLogo },
  '82': { name: 'BLRT GRUPP AS', logoUri: logos.blrtGruppLogo },
  '83': { name: 'FINEST AS', logoUri: logos.finestLogo },
  '88': { name: 'AS Harju Elekter', logoUri: logos.harjuElekterLogo },
  '89': { name: 'Nordea Bank Abp Eesti filiaal', logoUri: logos.nordeaLogo },
  '90': { name: 'Nordea Bank Abp Eesti filiaal', logoUri: logos.nordeaLogo },
  '91': { name: 'Helmes AS', logoUri: logos.helmesLogo },
  '94': { name: 'Compensa Vienna Insurance Group', logoUri: logos.compensaLogo },
  '96': { name: 'Registrite ja Infosüsteemide Keskus', logoUri: logos.rikLogo },
  '98': { name: 'Kaitseliit', logoUri: logos.kaitseliitLogo },
  '100': { name: 'CV Keskus', logoUri: logos.cvkeskusLogo },
  '101': { name: 'AS KH Energia-Konsult', logoUri: logos.khenergiaLogo },
  '103': { name: 'Nortal AS', logoUri: logos.nortalAS },
  '104': { name: 'HEISI IT OÜ', logoUri: logos.heisiLogo },
  '108': { name: 'ABB AS', logoUri: logos.ABBLogo },
  '109': { name: 'ABB AS', logoUri: logos.ABBLogo },
  '110': { name: 'GPV Estonia AS', logoUri: logos.gpvLogo },
  '111': { name: 'Fermi Energia AS', logoUri: require('./assets/fermi.png') }, // Keep if needed
  '112': { name: 'Inbank', logoUri: logos.inbank },
  '114': { name: 'CARIAD Estonia AS', logoUri: logos.cariadLogo },
  '115': { name: 'Ernst & Young Baltic AS', logoUri: logos.ernstLogo },
  '117': { name: 'Genius Sports', logoUri: logos.geniussportsLogo },
  '121': { name: 'Shore Link OÜ', logoUri: logos.shorelinkLogo },
};

// --- GRAAF ja muu loogika jääb samaks ---
const START_NODE_ID: NodeId = 'fuajee-uks';

const NODES: PathNode[] = [
  { id: 'fuajee-uks', x: 0.486, y: 0.26, neighbors: ['fuajee-16-box', 'fuajee-7-box'] },
  { id: 'fuajee-7-box', x: 0.486, y: 0.18, neighbors: ['fuajee-uks', 'fuajee-12-box', 'fuajee-9-box'] },
  { id: 'fuajee-12-box', x: 0.522, y: 0.18, neighbors: ['fuajee-7-box', 'fuajee-10-box', 'fuajee-16-box'] },
  { id: 'fuajee-9-box', x: 0.486, y: 0.13, neighbors: ['fuajee-7-box', 'fuajee-10-box'] },
  { id: 'fuajee-10-box', x: 0.522, y: 0.13, neighbors: ['fuajee-9-box', 'fuajee-12-box'] },
  { id: 'fuajee-16-box', x: 0.522, y: 0.26, neighbors: ['fuajee-uks', 'fuajee-12-box', 'fuajee-19-box'] },
  { id: 'fuajee-19-box', x: 0.522, y: 0.33, neighbors: ['fuajee-16-box', 'fuajee-kohvik-rist'] },
  { id: 'fuajee-kohvik-rist', x: 0.522, y: 0.37, neighbors: ['fuajee-19-box', 'kohvik-29-box', 'fuajee-koridor-25-box'] },
  { id: 'kohvik-29-box', x: 0.365, y: 0.37, neighbors: ['fuajee-kohvik-rist', 'kohvik-tupik'] },
  { id: 'kohvik-tupik', x: 0.265, y: 0.37, neighbors: ['kohvik-29-box'] },
  { id: 'fuajee-koridor-25-box', x: 0.522, y: 0.45, neighbors: ['fuajee-kohvik-rist', 'aula-fuajee-rist'] },
  { id: 'aula-fuajee-rist', x: 0.422, y: 0.45, neighbors: ['fuajee-koridor-25-box', 'aula-uks-out'] },
  { id: 'aula-uks-out', x: 0.422, y: 0.625, neighbors: ['aula-fuajee-rist', 'aula-uks-in', 'koridor-aula'] },
  { id: 'aula-uks-in', x: 0.352, y: 0.625, neighbors: ['aula-uks-out', 'aula-43-box', 'aula-68-box'] },
  { id: 'aula-43-box', x: 0.352, y: 0.54, neighbors: ['aula-uks-in', 'aula-47-box'] },
  { id: 'aula-47-box', x: 0.352, y: 0.50, neighbors: ['aula-43-box', 'aula-51-box'] },
  { id: 'aula-51-box', x: 0.262, y: 0.50, neighbors: ['aula-47-box', 'aula-56-box'] },
  { id: 'aula-56-box', x: 0.175, y: 0.50, neighbors: ['aula-51-box', 'aula-62-box'] },
  { id: 'aula-62-box', x: 0.175, y: 0.58, neighbors: ['aula-56-box', 'aula-82-box'] },
  { id: 'aula-82-box', x: 0.282, y: 0.58, neighbors: ['aula-62-box', 'aula-68-box'] },
  { id: 'aula-68-box', x: 0.305, y: 0.625, neighbors: ['aula-82-box', 'aula-uks-in'] },
  { id: 'koridor-aula', x: 0.365, y: 0.625, neighbors: ['aula-uks-out', 'koridor-aula-rist'] },
  { id: 'koridor-aula-rist', x: 0.365, y: 0.68, neighbors: ['koridor-aula', 'koridor-tudengimajja'] },
  { id: 'koridor-tudengimajja', x: 0.545, y: 0.68, neighbors: ['koridor-aula-rist', 'tudengimaja-86-box'] },
  { id: 'tudengimaja-86-box', x: 0.545, y: 0.75, neighbors: ['koridor-tudengimajja', 'tudengimaja-89-box'] },
  { id: 'tudengimaja-89-box', x: 0.545, y: 0.80, neighbors: ['tudengimaja-86-box', 'tudengimaja-95-box', 'tudengimaja-vasak-all'] },
  { id: 'tudengimaja-95-box', x: 0.651, y: 0.80, neighbors: ['tudengimaja-89-box', 'tudengimaja-93-box', 'tudengimaja-109-box'] },
  { id: 'tudengimaja-93-box', x: 0.651, y: 0.756, neighbors: ['tudengimaja-95-box', 'tudengimaja-91-box', 'tudengimaja-111-box'] },
  { id: 'tudengimaja-91-box', x: 0.651, y: 0.71, neighbors: ['tudengimaja-95-box', 'tudengimaja-114-box'] },
  { id: 'tudengimaja-114-box', x: 0.688, y: 0.71, neighbors: ['tudengimaja-91-box'] },
  { id: 'tudengimaja-111-box', x: 0.688, y: 0.756, neighbors: ['tudengimaja-114-box', 'tudengimaja-93-box', 'tudengimaja-109-box'] },
  { id: 'tudengimaja-109-box', x: 0.688, y: 0.80, neighbors: ['tudengimaja-95-box', 'tudengimaja-111-box', 'tudengimaja-107-box'] },
  { id: 'tudengimaja-107-box', x: 0.688, y: 0.85, neighbors: ['tudengimaja-97-box', 'tudengimaja-109-box', 'tudengimaja-104-box'] },
  { id: 'tudengimaja-104-box', x: 0.688, y: 0.89, neighbors: ['tudengimaja-100-box', 'tudengimaja-107-box'] },
  { id: 'tudengimaja-100-box', x: 0.651, y: 0.89, neighbors: ['tudengimaja-104-box', 'tudengimaja-97-box', 'tudengimaja-vasak-all'] },
  { id: 'tudengimaja-97-box', x: 0.651, y: 0.85, neighbors: ['tudengimaja-100-box', 'tudengimaja-95-box'] },
  { id: 'tudengimaja-vasak-all', x: 0.545, y: 0.89, neighbors: ['tudengimaja-89-box', 'tudengimaja-100-box'] },
];

function findPath(startId: NodeId, endId: NodeId): PathNode[] {
  const byId: Record<string, PathNode> = {};
  NODES.forEach((n) => {
    byId[n.id] = n;
  });

  if (!byId[startId] || !byId[endId]) return [];

  const queue: NodeId[] = [startId];
  const visited: Record<string, boolean> = { [startId]: true };
  const prev: Record<string, NodeId | null> = { [startId]: null };

  let found = false;

  while (queue.length > 0) {
    const current = queue.shift() as NodeId;
    if (current === endId) {
      found = true;
      break;
    }
    const node = byId[current];
    for (const neighbor of node.neighbors) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        prev[neighbor] = current;
        queue.push(neighbor);
      }
    }
  }

  if (!found) return [];

  const path: PathNode[] = [];
  let cur: NodeId | null = endId;
  while (cur) {
    path.push(byId[cur]);
    cur = prev[cur] ?? null;
  }

  return path.reverse();
}

function findNearestNodeId(x: number, y: number): NodeId | null {
  if (NODES.length === 0) return null;

  let bestId: NodeId | null = null;
  let bestDistSq = Number.POSITIVE_INFINITY;

  for (const node of NODES) {
    const dx = node.x - x;
    const dy = node.y - y;
    const distSq = dx * dx + dy * dy;

    if (distSq < bestDistSq) {
      bestDistSq = distSq;
      bestId = node.id;
    }
  }

  return bestId;
}

type SectionKey = 'fuajee' | 'aula' | 'tudengimaja' | 'kohvikusaal';

type SectionRegion = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

const SECTIONS: Record<SectionKey, SectionRegion> = {
  fuajee: {
    xMin: 0.0,
    xMax: 0.36,
    yMin: -0.23,
    yMax: 0.18,
  },
  aula: {
    xMin: -0.2,
    xMax: 0.1,
    yMin: 0.07,
    yMax: 0.34,
  },
  tudengimaja: {
    xMin: 0.18,
    xMax: 0.32,
    yMin: 0.24,
    yMax: 0.62,
  },
  kohvikusaal: {
    xMin: -0.2,
    xMax: 0.1,
    yMin: 0.25,
    yMax: 0.35,
  },
};

type SelectedBoothState = {
  booth: PlaceholderBooth;
  companyName?: string;
};

export default function MapScreen() {
  const [selected, setSelected] = useState<SelectedBoothState | null>(null);
  const [pathNodes, setPathNodes] = useState<PathNode[]>([]);
  const [pathProgress, setPathProgress] = useState(1);
  const [activeSection, setActiveSection] = useState<SectionKey>('fuajee');

  const { width, height: screenHeight } = Dimensions.get('window');
  const baseHeight = (width * 1684) / 1190;
  const boothSize = 16;

  const containerHeight = screenHeight - 80;

  const sectionRegion = SECTIONS[activeSection];

  const x1 = sectionRegion.xMin * width;
  const x2 = sectionRegion.xMax * width;
  const y1 = sectionRegion.yMin * baseHeight;
  const y2 = sectionRegion.yMax * baseHeight;
  const rectWidth = x2 - x1;
  const rectHeight = y2 - y1;

  const viewWidth = width;
  const viewHeight = containerHeight;

  let scale = Math.min(
    (viewWidth * 0.9) / rectWidth,
    (viewHeight * 0.9) / rectHeight
  );
  if (!Number.isFinite(scale) || scale <= 0) scale = 1;

  const centerX = (x1 + x2) / 2;
  const centerY = (y1 + y2) / 2;

  const cx = viewWidth / 2;
  const cy = viewHeight / 2;

  const translateX = cx - scale * centerX;
  const translateY = cy - scale * centerY;

  function animatePath(duration = 700) {
    const start = Date.now();
    setPathProgress(0);

    function step() {
      const now = Date.now();
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      setPathProgress(eased);

      if (t < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function selectBooth(booth: PlaceholderBooth) {
    const company = COMPANY_BY_BOOTH[booth.boothNumber];
    setSelected({ booth, companyName: company?.name });

    const nodeId = findNearestNodeId(booth.x, booth.y);

    if (nodeId) {
      const path = findPath(START_NODE_ID, nodeId);
      setPathNodes(path);

      if (path.length > 1) animatePath(700);
      else setPathProgress(1);
    } else {
      setPathNodes([]);
      setPathProgress(0);
    }
  }

  const startNode = pathNodes.length > 0 ? pathNodes[0] : null;
  const endNode = pathNodes.length > 1 ? pathNodes[pathNodes.length - 1] : null;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width,
          height: containerHeight,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#f0f0f0',
        }}
      >
        <View
          style={{
            position: 'absolute',
            width,
            height: baseHeight,
            left: translateX,
            top: translateY,
            transform: [{ scale }],
          }}
        >
          <View style={{ width, height: baseHeight }}>
            <FloorMap width="100%" height="100%" />

            {pathNodes.length > 1 &&
              pathNodes.map((node, index) => {
                if (index === 0) return null;

                const prev = pathNodes[index - 1];

                const totalSegments = pathNodes.length - 1;
                const maxIndexFloat = pathProgress * totalSegments;

                const segmentIndex = index;
                const startForThis = segmentIndex - 1;

                if (maxIndexFloat <= startForThis) return null;

                const rawProgress = maxIndexFloat - startForThis;
                const segProgress = Math.min(Math.max(rawProgress, 0), 1);

                const sx1 = prev.x * width;
                const sy1 = prev.y * baseHeight;
                const sx2 = node.x * width;
                const sy2 = node.y * baseHeight;

                const x2p = sx1 + (sx2 - sx1) * segProgress;
                const y2p = sy1 + (sy2 - sy1) * segProgress;

                const left = Math.min(sx1, x2p);
                const top = Math.min(sy1, y2p);
                const segmentWidth = Math.max(Math.abs(x2p - sx1), 2);
                const segmentHeight = Math.max(Math.abs(y2p - sy1), 2);

                return (
                  <View
                    key={`${prev.id}-${node.id}`}
                    style={{
                      position: 'absolute',
                      left,
                      top,
                      width: segmentWidth,
                      height: segmentHeight,
                      backgroundColor: 'rgba(16,185,129,0.7)',
                      borderRadius: 999,
                    }}
                  />
                );
              })}

            {startNode && (
              <View
                key={`start-${startNode.id}`}
                style={{
                  position: 'absolute',
                  left: startNode.x * width - 3,
                  top: startNode.y * baseHeight - 3,
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#ef4444',
                  borderWidth: 1,
                  borderColor: '#ffffff',
                }}
              />
            )}

            {endNode && endNode.id !== startNode?.id && (
              <View
                key={`end-${endNode.id}`}
                style={{
                  position: 'absolute',
                  left: endNode.x * width - 3,
                  top: endNode.y * baseHeight - 3,
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#22c55e',
                  borderWidth: 1,
                  borderColor: '#ffffff',
                }}
              />
            )}
          </View>
        </View>

        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width,
            height: containerHeight,
          }}
        >
          {BOOTHS.map((b) => {
            const company = COMPANY_BY_BOOTH[b.boothNumber];

            const inside =
              b.x >= sectionRegion.xMin &&
              b.x <= sectionRegion.xMax &&
              b.y >= sectionRegion.yMin &&
              b.y <= sectionRegion.yMax;

            const mapX = b.x * width;
            const mapY = b.y * baseHeight;
            const screenX = translateX + scale * mapX;
            const screenY = translateY + scale * mapY;

            const half = boothSize / 2;
            const left = screenX - half;
            const top = screenY - half;

            function getInitialsLocal(name: string): string {
              const parts = name.trim().split(/\s+/);
              if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
              return (parts[0][0] + parts[1][0]).toUpperCase();
            }

            let content: React.ReactNode;
            if (!company) {
              content = (
                <Text style={{ fontSize: 9, fontWeight: '600' }}>
                  {b.boothNumber}
                </Text>
              );
            } else if (!company.logoUri) {
              content = (
                <Text style={{ fontSize: 11, fontWeight: '700' }}>
                  {getInitialsLocal(company.name)}
                </Text>
              );
            } else {
              const src: any = company.logoUri;
              if (typeof src === 'string') {
                content = (
                  <Image
                    source={{ uri: src }}
                    style={{ width: boothSize - 2, height: boothSize - 2 }}
                    resizeMode="contain"
                  />
                );
              } else if (typeof src === 'number') {
                content = (
                  <Image
                    source={src}
                    style={{ width: boothSize - 2, height: boothSize - 2 }}
                    resizeMode="contain"
                  />
                );
              } else if (src && (src.default || typeof src === 'function')) {
                const SvgComp = (src.default || src) as any;
                content = (
                  <SvgComp width={boothSize - 2} height={boothSize - 2} />
                );
              } else if (src && typeof src === 'object' && src.uri) {
                content = (
                  <Image
                    source={{ uri: src.uri }}
                    style={{ width: boothSize - 2, height: boothSize - 2 }}
                    resizeMode="contain"
                  />
                );
              } else {
                content = (
                  <Text style={{ fontSize: 11, fontWeight: '700' }}>
                    {getInitialsLocal(company.name)}
                  </Text>
                );
              }
            }

            return (
              <View
                key={b.boothNumber}
                style={{
                  position: 'absolute',
                  left,
                  top,
                  width: boothSize,
                  height: boothSize,
                  opacity: inside ? 1 : 0.3,
                }}
              >
                <Pressable
                  onPress={() => selectBooth(b)}
                  hitSlop={10}
                  style={{
                    width: boothSize,
                    height: boothSize,
                    borderRadius: 3,
                    borderWidth: 0.5,
                    borderColor: '#1E66FF',
                    backgroundColor: 'rgba(30,102,255,0.18)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {content}
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 24,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'rgba(15,23,42,0.9)',
            borderRadius: 999,
            paddingHorizontal: 8,
            paddingVertical: 6,
            gap: 8,
          }}
        >
          {(
            [
              { key: 'fuajee', label: 'Fuajee' },
              { key: 'aula', label: 'Aula' },
              { key: 'tudengimaja', label: 'Tudengimaja' },
              { key: 'kohvikusaal', label: 'Kohvikusaal' },
            ] as { key: SectionKey; label: string }[]
          ).map((item) => {
            const isActive = activeSection === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => setActiveSection(item.key)}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: isActive ? '#1E66FF' : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <Modal visible={!!selected} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '80%',
              padding: 16,
              borderRadius: 12,
              backgroundColor: 'white',
              gap: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '700' }}>
              Boks {selected?.booth.boothNumber}
            </Text>
            {!!selected?.companyName && (
              <Text style={{ fontSize: 15, fontWeight: '500', marginTop: 4 }}>
                {selected.companyName}
              </Text>
            )}
            <Text style={{ fontSize: 14, marginTop: 8 }}>
              Praegu placeholder. Hiljem loeme siia ettevõtte info otse
              veebirakenduse andmebaasist ja kuvame logo + kirjelduse.
            </Text>
            <Pressable
              onPress={() => setSelected(null)}
              style={{
                marginTop: 12,
                alignSelf: 'flex-end',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: '#1E66FF',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>Sulge</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}