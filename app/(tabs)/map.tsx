// app/(tabs)/map.tsx
import React, { useState } from 'react';
import { Dimensions, Modal, Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
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
  { boothNumber: '12', x: 0.5347, y: 0.17299999999999999 },
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

  { boothNumber: '42', x: 0.378, y: 0.5530 },
  { boothNumber: '43', x: 0.378, y: 0.5379 },
  { boothNumber: '44', x: 0.378, y: 0.5228 },
  { boothNumber: '45', x: 0.378, y: 0.5077 },
  { boothNumber: '46', x: 0.378, y: 0.4926 },

  { boothNumber: '47', x: 0.3529, y: 0.4819 },
  { boothNumber: '48', x: 0.3319, y: 0.4819 },
  { boothNumber: '49', x: 0.310, y: 0.4819 },
  { boothNumber: '50', x: 0.2884, y: 0.4819 },
  { boothNumber: '51', x: 0.267, y: 0.4819 },
  { boothNumber: '52', x: 0.245, y: 0.4819 },
  { boothNumber: '53', x: 0.224, y: 0.4819 },
  { boothNumber: '54', x: 0.2025, y: 0.4819 },
  { boothNumber: '55', x: 0.181, y: 0.4819 },

  { boothNumber: '56', x: 0.1549, y: 0.495 },
  { boothNumber: '57', x: 0.1549, y: 0.5102 },
  { boothNumber: '58', x: 0.1549, y: 0.5253 },
  { boothNumber: '59', x: 0.1549, y: 0.5406 },
  { boothNumber: '60', x: 0.1549, y: 0.5557 },
  { boothNumber: '61', x: 0.1549, y: 0.5713 },
  { boothNumber: '62', x: 0.1549, y: 0.586 },


  { boothNumber: '63', x: 0.1692, y: 0.6 },
  { boothNumber: '64', x: 0.1905, y: 0.6 },
  { boothNumber: '65', x: 0.2121, y: 0.6 },
  { boothNumber: '66', x: 0.2335, y: 0.6 },
  { boothNumber: '67', x: 0.2551, y: 0.6 },

  { boothNumber: '68', x: 0.2811, y: 0.623 },

  { boothNumber: '69', x: 0.3079, y: 0.5914 },

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
    // Use the raster JPEG version
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

  function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

// bfs type shift
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

// Leia lähim node antud (x, y) jaoks
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

  // soovi korral võid panna ka mingi max kauguse filtri
  // const MAX_DIST_SQ = 0.05 * 0.05;
  // if (bestDistSq > MAX_DIST_SQ) return null;

  return bestId;
}


  // --- ZOOMI SEADED ---
  const MIN_SCALE = 0.8;
  const MAX_SCALE = 6;

  type SelectedBoothState = {
    booth: PlaceholderBooth;
    companyName?: string;
  };

export default function MapScreen() {
  const [selected, setSelected] = useState<SelectedBoothState | null>(null);
  const [pathNodes, setPathNodes] = useState<PathNode[]>([]);
  const [visibleSegments, setVisibleSegments] = useState(0);
  const [pathProgress, setPathProgress] = useState(1);

  const { width, height: screenHeight } = Dimensions.get('window');
  const baseHeight = (width * 1684) / 1190; // SVG viewBox ratio
  const boothSize = 8;


  const ENTRANCE_X = 0.27;
  const ENTRANCE_Y = 0.34;
  const INITIAL_SCALE = 1.3;

  const INITIAL_TX = width / 2 - ENTRANCE_X * width * INITIAL_SCALE;
  const INITIAL_TY = baseHeight / 2 - ENTRANCE_Y * baseHeight * INITIAL_SCALE;

  const scale = useSharedValue(INITIAL_SCALE);
  const translateX = useSharedValue(INITIAL_TX);
  const translateY = useSharedValue(INITIAL_TY);
  const startScale = useSharedValue(INITIAL_SCALE);

  const ZOOM_STEP = 1.5; // double tap zoom step
  const EPS = 0.05;

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

  // pinch zoom
  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      let next = startScale.value * event.scale;
      if (next < MIN_SCALE) next = MIN_SCALE;
      if (next > MAX_SCALE) next = MAX_SCALE;
      scale.value = next;
    });

  const pan = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  // double tap zoom
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .maxDelay(300)
    .maxDistance(20)
    .onEnd((_event, success) => {
      if (!success) return;

      const next = Math.min(scale.value * 1.5, MAX_SCALE);
      scale.value = withTiming(next);
    });



  const panZoom = Gesture.Simultaneous(pinch, pan);

  const gesture = Gesture.Exclusive(doubleTap, panZoom);


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const containerHeight = Math.max(baseHeight, screenHeight * 0.7);

  const startNode = pathNodes.length > 0 ? pathNodes[0] : null;
  const endNode =
    pathNodes.length > 1 ? pathNodes[pathNodes.length - 1] : null;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              width,
              height: containerHeight,
              justifyContent: 'center',
              alignItems: 'center',
            },
            animatedStyle,
          ]}
        >
        <View style={{ width, height: baseHeight }}>
          {/* SVG kaart */}
          <FloorMap width="100%" height="100%" />

          {/* MASK, mis katab parempoolse osa (legendi) */}
          <View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: width * 0.25,
              height: baseHeight,
              backgroundColor: '#fff',
            }}
          />

          {/* PATH, ringid, boksid – kõik jääb samaks */}
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


            {/*debug type shift*/}
            {/* PATH NODE ringid (algus/lõpp ja vahepunktid) */}
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
                  backgroundColor: '#ef4444', // punane algus
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
                  backgroundColor: '#22c55e', // sihtpunkt
                  borderWidth: 1,
                  borderColor: '#ffffff',
                }}
              />
            )}

            {/* BOKSID kaardi peal */}
           {BOOTHS.map((b) => {
            const company = COMPANY_BY_BOOTH[b.boothNumber];

            return (
            <Pressable
              key={b.boothNumber}
              onPress={() => {
                // salvesta valik koos ettevõtte nimega
                setSelected({
                  booth: b,
                  companyName: company?.name,
                });

                const nodeId = findNearestNodeId(b.x, b.y);

                if (nodeId) {
                  const path = findPath(START_NODE_ID, nodeId);
                  setPathNodes(path);

                  if (path.length > 1) {
                    animatePath(700);
                  } else {
                    setPathProgress(1);
                  }
                } else {
                  setPathNodes([]);
                  setPathProgress(0);
                }
              }}
              style={{
                position: 'absolute',
                left: b.x * width - boothSize / 2,
                top: b.y * baseHeight - boothSize / 2,
                width: boothSize,
                height: boothSize,
                borderRadius: 2,
                borderWidth: 0.5,
                borderColor: '#1E66FF',
                backgroundColor: 'rgba(30,102,255,0.18)',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden', // kui logo läheb äärest välja
              }}
            >
              {/* Kui logoUri olemas, näitame logo, muidu initsiaalid / boksi number */}
              {company?.logoUri ? (
                (() => {
                  const src: any = company.logoUri;

                  // remote URL string
                  if (typeof src === 'string') {
                    return (
                      <Animated.Image
                        source={{ uri: src }}
                        style={{
                          width: boothSize - 2,
                          height: boothSize - 2,
                          resizeMode: 'contain',
                        }}
                      />
                    );
                  }

                  // bundler asset (require) returns a number (asset id)
                  if (typeof src === 'number') {
                    return (
                      <Animated.Image
                        source={src}
                        style={{
                          width: boothSize - 2,
                          height: boothSize - 2,
                          resizeMode: 'contain',
                        }}
                      />
                    );
                  }

                  // If the require/import returned a React component (SVG transformer), render it
                  // (some setups export the SVG as the default export/component)
                  const SvgComp = (src && (src.default || src)) as any;
                  if (typeof SvgComp === 'function') {
                    return <SvgComp width={boothSize - 2} height={boothSize - 2} />;
                  }

                  // Fallback: try object with uri
                  if (src && typeof src === 'object' && src.uri) {
                    return (
                      <Animated.Image
                        source={{ uri: src.uri }}
                        style={{
                          width: boothSize - 2,
                          height: boothSize - 2,
                          resizeMode: 'contain',
                        }}
                      />
                    );
                  }

                  // last resort, render initials
                  return (
                    <Text
                      style={{
                        fontSize: 5,
                        fontWeight: '700',
                      }}
                    >
                      {getInitials(company.name)}
                    </Text>
                  );
                })()
              ) : company ? (
                <Text
                  style={{
                    fontSize: 5,
                    fontWeight: '700',
                  }}
                >
                  {getInitials(company.name)}
                </Text>
              ) : (
                <Text style={{ fontSize: 4, fontWeight: '600' }}>
                  {b.boothNumber}
                </Text>
              )}
            </Pressable>
          );
        })}

          </View>
        </Animated.View>
      </GestureDetector>

       <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        left: 16,
        bottom: 24,
      }}
    >
      <Pressable
        onPress={() => {
          scale.value = withTiming(INITIAL_SCALE);
          translateX.value = withTiming(INITIAL_TX);
          translateY.value = withTiming(INITIAL_TY);
        }}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 999,
          backgroundColor: 'rgba(15,23,42,0.9)',
        }}
        accessibilityLabel="Reset map view"
      >
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            lineHeight: 18,
          }}
        >
          ⌖
        </Text>
      </Pressable>
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
            Praegu placeholder. Hiljem loeme siia ettevõtte info
            otse veebirakenduse andmebaasist ja kuvame logo + kirjelduse.
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
