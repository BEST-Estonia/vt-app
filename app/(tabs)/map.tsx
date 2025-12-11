// app/(tabs)/map.tsx
import React, { memo, useState } from 'react';
import { Dimensions, Image, Modal, Pressable, Text, View } from 'react-native';
import FloorMap from './assets/realplan1.svg';

type PlaceholderBooth = {
  boothNumber: string;
  x: number; // 0..1 suhteline x (viewBox 1190)
  y: number; // 0..1 suhteline y (viewBox 1684)
};

type NodeId = string;

type PathNode = {
  id: NodeId;
  x: number; // 0..1 – sama koordinaatsüsteem mis boksidel
  y: number;
  neighbors: NodeId[];
};

// --- BOKSIDE KOORDINAADID SVG põhjal ---
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

const COMPANY_BY_BOOTH: Record<
  string,
  { name: string; logoUri?: string | number | React.ComponentType<any> }
> = {
  '1': { name: 'Coop Pank AS', logoUri: require('./assets/coop.jpg') },
  '5': { name: 'Enefit', logoUri: require('./assets/enefit-logo.png') },
  '6': { name: 'Enefit', logoUri: require('./assets/enefit-logo.png') },
  '10': { name: 'AS TREV-2 Grupp', logoUri: require('./assets/trev_2_grupp.jpg') },
  '11': { name: 'Hurtigruten Estonia OÜ', logoUri: require('./assets/hurtigruten.jpg') },
  '13': { name: 'LEONHARD WEISS OÜ', logoUri: require('./assets/Leonhard_Weiss_logo.png') },
  '14': { name: 'ERGO Insurance SE', logoUri: require('./assets/ergo.jpg') },
  '15': { name: 'KPMG Baltics OÜ', logoUri: require('./assets/kpmg.jpg') },
  '16': { name: 'KPMG Baltics OÜ', logoUri: require('./assets/kpmg.jpg') },
  '17': { name: 'Southwestern Advantage', logoUri: require('./assets/southwestern.png') },
  '18': { name: 'Ericsson Eesti AS', logoUri: require('./assets/ericsson-logo.png') },
  '19': { name: 'NOBE OÜ', logoUri: require('./assets/nobe.jpg') },
  '20': { name: 'Pipedrive OÜ', logoUri: require('./assets/pipedrive-logo.png') },
  '21': { name: 'Verston OÜ', logoUri: require('./assets/verston_logo.jpg') },
  '22': { name: 'Tartu Ülikool', logoUri: require('./assets/tartu_ulikool.jpg') },
  '23': { name: 'Ruukki Products AS', logoUri: require('./assets/Ruukki-Products-AS.png') },
  '24': { name: 'AQ Lasertool OÜ', logoUri: require('./assets/lasertool.jpg') },
  '25': { name: 'Scanfil OÜ', logoUri: require('./assets/scanfil.png') },
  '26': { name: 'Infragreen OÜ', logoUri: require('./assets/infragreen.jpg') },
  '27': { name: 'Tallinna Vesi AS', logoUri: require('./assets/tallinnavesi.png') },
  '28': { name: 'AS Connecto Infra', logoUri: require('./assets/connecto.jpeg') },
  '29': { name: 'Kaitseressursside Amet', logoUri: require('./assets/kaitseressursideamet.jpg') },
  '30': { name: 'Tech Group AS', logoUri: require('./assets/techgroup.jpg') },
  '31': { name: 'Swedbank AS', logoUri: require('./assets/swedbank-logo.png') },
  '32': { name: 'Konkurentsiamet', logoUri: require('./assets/konkurentsiamet.jpg') },
  '33': { name: 'Patendiamet', logoUri: require('./assets/patendiamet.jpg') },
  '36': { name: 'INF Infra OÜ', logoUri: require('./assets/infinfra.jpg') },
  '37': { name: 'INF Infra OÜ', logoUri: require('./assets/infinfra.jpg') },
  '38': { name: 'PLAYTECH ESTONIA OÜ', logoUri: require('./assets/playtech.png') },
  '39': { name: 'AS Tallinna Lennujaam', logoUri: require('./assets/tallinna-lennujaam.png') },
  '40': { name: 'Utilitas OÜ', logoUri: require('./assets/utilitas_logo.jpg') },
  '41': { name: 'Utilitas OÜ', logoUri: require('./assets/utilitas_logo.jpg') },
  '42': { name: 'Gunvor Services AS', logoUri: require('./assets/gunvor.jpg') },
  '43': { name: 'Gunvor Services AS', logoUri: require('./assets/gunvor.jpg') },
  '44': { name: 'Threod Systems AS', logoUri: require('./assets/threod-systems.jpg') },
  '46': { name: 'Bigbank AS', logoUri: require('./assets/Bigbank.png') },
  '47': { name: 'Telia Eesti AS', logoUri: require('./assets/telia-logo.png') },
  '48': { name: 'Smartecon OÜ', logoUri: require('./assets/smartecon_o_logo.jpg') },
  '49': { name: 'Keskkonnaagentuur', logoUri: require('./assets/Keskkonnaagentuur.png') },
  '55': { name: 'Rail Baltic Estonia OÜ', logoUri: require('./assets/rail_baltic_estonia_logo.jpg') },
  '56': { name: 'Stoneridge Electronics AS', logoUri: require('./assets/stoneridge-electronics-as.jpg') },
  '57': { name: 'Finantsinspektsioon', logoUri: require('./assets/Finantsinspektsioon.png') },
  '58': { name: 'Rahapesu Andmebüroo', logoUri: require('./assets/Rahapseuandmeburoo_logo_ruut.png') },
  '60': { name: 'Elering AS', logoUri: require('./assets/elering-logo.png') },
  '61': { name: 'Fujitsu Estonia', logoUri: require('./assets/fujitsu-logo.png') },
  '62': { name: 'Ehitus5ECO OÜ', logoUri: require('./assets/ehitus5eco_logo.png') },
  '63': { name: 'Sisekaitseakadeemia/Siseturvalisuse karjäärikeskus', logoUri: require('./assets/sisekaitseakadeemia.jpg') },
  '64': { name: 'HANZA SSC Tartu OÜ', logoUri: require('./assets/hanza-logo.png') },
  '65': { name: 'AS Eesti Raudtee', logoUri: require('./assets/eesti-raudtee.jpg') },
  '66': { name: 'AS Eesti Raudtee', logoUri: require('./assets/eesti-raudtee.jpg') },
  '67': { name: 'Lennuliiklusteeninduse AS', logoUri: require('./assets/Lennuliiklusteeninduse-AS.png') },
  '68': { name: 'Kaitsepolitseiamet', logoUri: require('./assets/Kaitsepolitseiamet.png') },
  '69': { name: 'Siseministeeriumi infotehnoloogia- ja arenduskeskus (SMIT)', logoUri: require('./assets/SMIT.png') },
  '70': { name: 'Nordecon AS', logoUri: require('./assets/nordecon.jpg') },
  '71': { name: 'TRAFFEST OÜ', logoUri: require('./assets/traffest.png') },
  '77': { name: 'Ettevõtluse ja Innovatsiooni Sihtasutus', logoUri: require('./assets/eis-Ettevotluse-ja-Innovatsiooni-Sihtasutus-1.png') },
  '78': { name: 'Tammer OÜ', logoUri: require('./assets/tammer.png') },
  '79': { name: 'Välisluureamet', logoUri: require('./assets/VALISLUUREAMET.jpeg') },
  '80': { name: 'Välisluureamet', logoUri: require('./assets/VALISLUUREAMET.jpeg') },
  '81': { name: 'Estanc AS', logoUri: require('./assets/estanc.png') },
  '82': { name: 'BLRT GRUPP AS', logoUri: require('./assets/BLRT-Grupp-AS.png') },
  '83': { name: 'FINEST AS', logoUri: require('./assets/finestmedia.jpg') },
  '88': { name: 'AS Harju Elekter', logoUri: require('./assets/IKP23_Harju_Elekter_AS.png') },
  '89': { name: 'Nordea Bank Abp Eesti filiaal', logoUri: require('./assets/nordea.jpg') },
  '90': { name: 'Nordea Bank Abp Eesti filiaal', logoUri: require('./assets/nordea.jpg') },
  '91': {
    name: 'Helmes AS',
    logoUri: require('./assets/helmes-logo.jpg'),
  },
  '94': { name: 'Compensa Vienna Insurance Group, ADB Eesti filiaal', logoUri: require('./assets/compensa.jpg') },
  '96': { name: 'Registrite ja Infosüsteemide Keskus', logoUri: require('./assets/registrite-ja-infosusteemide-keskus.jpg') },
  '98': { name: 'Kaitseliit', logoUri: require('./assets/kaitseliit.jpg') },
  '100': { name: 'CV Keskus', logoUri: require('./assets/cvkeskus.png') },
  '101': { name: 'AS KH Energia-Konsult', logoUri: require('./assets/khenergia.jpg') },
  '103': { name: 'Nortal AS', logoUri: require('./assets/nortal.jpg') },
  '104': { name: 'HEISI IT OÜ', logoUri: require('./assets/HEISI-IT-OU.png') },
  '108': { name: 'ABB AS', logoUri: require('./assets/abb-logo.png') },
  '109': { name: 'ABB AS', logoUri: require('./assets/abb-logo.png') },
  '110': { name: 'GPV Estonia AS', logoUri: require('./assets/gpv.jpg') },
  '111': { name: 'Fermi Energia AS', logoUri: require('./assets/fermi.png') },
  '112': { name: 'Inbank', logoUri: require('./assets/inbank.jpg') },
  '114': { name: 'CARIAD Estonia AS', logoUri: require('./assets/cariad.jpg') },
  '115': { name: 'Ernst & Young Baltic AS', logoUri: require('./assets/ernst.jpg') },
  '117': { name: 'Genius Sports', logoUri: require('./assets/geniussports.jpg') },
  '121': { name: 'Shore Link OÜ', logoUri: require('./assets/shorelink.png') },
};

// --- GRAAF: peauksest koridoripunktideni ---
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

// BFS: leia tee algusest siht-node'ini
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

// Leia lähim graafi-node antud (x, y) kaardikoordinaatidele
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

// --- SEKTSIOONID ---
// Need on umbkaudsed piirkonnad; vajadusel saad numbreid timmida.
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

// --- BOKSI MARKER ---
type BoothMarkerProps = {
  booth: PlaceholderBooth;
  company?: { name: string; logoUri?: any };
  width: number;
  baseHeight: number;
  size: number;
  onPress: () => void;
};

const BoothMarker = memo(function BoothMarker({
  booth,
  company,
  width,
  baseHeight,
  size,
  onPress,
}: BoothMarkerProps) {
  const half = size / 2;
  const left = booth.x * width - half;
  const top = booth.y * baseHeight - half;

  function getInitialsLocal(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const content = (() => {
    if (!company) {
      return <Text style={{ fontSize: 9, fontWeight: '600' }}>{booth.boothNumber}</Text>;
    }

    if (!company.logoUri) {
      return <Text style={{ fontSize: 11, fontWeight: '700' }}>{getInitialsLocal(company.name)}</Text>;
    }

    const src: any = company.logoUri;

    if (typeof src === 'string') {
      return (
        <Image
          source={{ uri: src }}
          style={{ width: size - 2, height: size - 2 }}
          resizeMode="contain"
        />
      );
    }

    if (typeof src === 'number') {
      return (
        <Image
          source={src}
          style={{ width: size - 2, height: size - 2 }}
          resizeMode="contain"
        />
      );
    }

    const SvgComp = (src && (src.default || src)) as any;
    if (typeof SvgComp === 'function') {
      return <SvgComp width={size - 2} height={size - 2} />;
    }

    if (src && typeof src === 'object' && src.uri) {
      return (
        <Image
          source={{ uri: src.uri }}
          style={{ width: size - 2, height: size - 2 }}
          resizeMode="contain"
        />
      );
    }

    return <Text style={{ fontSize: 11, fontWeight: '700' }}>{getInitialsLocal(company.name)}</Text>;
  })();

  return (
    <View
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
      }}
    >
      <Pressable
        onPress={onPress}
        hitSlop={10}
        style={{
          width: size,
          height: size,
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
});

// --- PÕHIKOMPONENT ---
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
  const baseHeight = (width * 1684) / 1190; // SVG viewBox ratio
  const boothSize = 16;

  const containerHeight = screenHeight - 80; // Leave space only for bottom buttons

  // Rotate map 90 degrees only when kohvikusaal section is active
  const rotation = activeSection === 'kohvikusaal' ? 270 : 0;
  const rotationRad = (rotation * Math.PI) / 180;
  const rotCos = Math.cos(rotationRad);
  const rotSin = Math.sin(rotationRad);

  // Compute transform for active section
  const sectionRegion = SECTIONS[activeSection];
  
  // Convert normalized coordinates to pixel coordinates
  const x1 = sectionRegion.xMin * width;
  const x2 = sectionRegion.xMax * width;
  const y1 = sectionRegion.yMin * baseHeight;
  const y2 = sectionRegion.yMax * baseHeight;
  const rectWidth = x2 - x1;
  const rectHeight = y2 - y1;

  // Compute scale to fit section in container with padding
  const viewWidth = width;
  const viewHeight = containerHeight;

  let scale = Math.min(
    (viewWidth * 0.9) / rectWidth,
    (viewHeight * 0.9) / rectHeight
  );
  if (!Number.isFinite(scale) || scale <= 0) scale = 1;

  // Compute section center in map coordinates
  const centerX = (x1 + x2) / 2;
  const centerY = (y1 + y2) / 2;

  // Compute translation so section center appears at container center
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
      {/* Map container with overflow hidden */}
      <View
        style={{
          width,
          height: containerHeight,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#f0f0f0',
        }}
      >
        {/* Transformed map view */}
        <View
          style={{
            position: 'absolute',
            width,
            height: baseHeight,
            transform: [{ scale }, { rotate: `${rotation}deg` }],
            left: translateX,
            top: translateY,
          }}
        >
          <View style={{ width, height: baseHeight }}>
            {/* SVG kaart */}
            <FloorMap width="100%" height="100%" />

          {/* PATH fuajeest boksini */}
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

              const x1 = prev.x * width;
              const y1 = prev.y * baseHeight;
              const x2 = node.x * width;
              const y2 = node.y * baseHeight;

              const x2p = x1 + (x2 - x1) * segProgress;
              const y2p = y1 + (y2 - y1) * segProgress;

              const left = Math.min(x1, x2p);
              const top = Math.min(y1, y2p);
              const segmentWidth = Math.max(Math.abs(x2p - x1), 2);
              const segmentHeight = Math.max(Math.abs(y2p - y1), 2);

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

            {/* PATH NODE ringid (algus/lõpp) */}
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

        {/* Overlay layer for booth markers (not scaled, positioned absolutely) */}
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

            // Check if booth is in active section
            const inside =
              b.x >= sectionRegion.xMin &&
              b.x <= sectionRegion.xMax &&
              b.y >= sectionRegion.yMin &&
              b.y <= sectionRegion.yMax;

            // Compute screen position with optional rotation: screen = t + R * (s * map)
            const offset = OVERLAY_OFFSETS[activeSection] ?? { dx: 0, dy: 0 };
            const mapX = (b.x + offset.dx) * width;
            const mapY = (b.y + offset.dy) * baseHeight;
            const sx = scale * mapX;
            const sy = scale * mapY;

            const rx = rotCos * sx - rotSin * sy;
            const ry = rotSin * sx + rotCos * sy;

            const screenX = translateX + rx;
            const screenY = translateY + ry;

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

      {/* SEKTSIOONI NUPUD ALL */}
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

      {/* Modal boksi info jaoks */}
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

