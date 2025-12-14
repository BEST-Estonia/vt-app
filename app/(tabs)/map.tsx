// app/(tabs)/map.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { companiesSeed, Company } from '../../data/companies';

type SectionKey = 'fuajee' | 'aula' | 'tudengimaja' | 'kohvikusaal';

type BoothData = {
  boothNumber: string;
  x: number; // 0-1 relative to section map width
  y: number; // 0-1 relative to section map height
};

// Booths per section with coordinates relative to each section's map image
// Coordinates calibrated to match the actual map images
const SECTION_BOOTHS: Record<SectionKey, BoothData[]> = {
  fuajee: [
    // Fuajee: boksid 1-26 (pilt on horisontaalne, "FUAJEE" paremal)
    // Vasak ülemine ala: 1-4 (üleval keskel horisontaalselt)
    { boothNumber: '1', x: 0.533, y: 0.40 },
    { boothNumber: '2', x: 0.533, y: 0.369 },
    { boothNumber: '3', x: 0.533, y: 0.325 },
    { boothNumber: '4', x: 0.533, y: 0.292 },
    // Vasak veerg: 5-9 (vertikaalselt alla)
    { boothNumber: '5', x: 0.451, y: 0.397 },
    { boothNumber: '6', x: 0.451, y: 0.372 },
    { boothNumber: '7', x: 0.451, y: 0.347 },
    { boothNumber: '8', x: 0.451, y: 0.321 },
    { boothNumber: '9', x: 0.451, y: 0.295 },
    // Parem veerg: 10-14 (vertikaalselt alla)
    { boothNumber: '10', x: 0.61, y: 0.295 },
    { boothNumber: '11', x: 0.61, y: 0.321 },
    { boothNumber: '12', x: 0.61, y: 0.347 },
    { boothNumber: '13', x: 0.61, y: 0.372 },
    { boothNumber: '14', x: 0.61, y: 0.397 },
    // Parempoolne pikk veerg: 15-26 (vertikaalselt alla paremal äärel)
    { boothNumber: '15', x: 0.65, y: 0.427 },
    { boothNumber: '16', x: 0.65, y: 0.46 },
    { boothNumber: '17', x: 0.65, y: 0.523 },
    { boothNumber: '18', x: 0.65, y: 0.563 },
    { boothNumber: '19', x: 0.65, y: 0.601 },
    { boothNumber: '20', x: 0.65, y: 0.647 },
    { boothNumber: '21', x: 0.65, y: 0.685 },
    { boothNumber: '22', x: 0.65, y: 0.728 },
    { boothNumber: '23', x: 0.65, y: 0.7535 },
    { boothNumber: '24', x: 0.65, y: 0.7787 },
    { boothNumber: '25', x: 0.65, y: 0.804 },
    { boothNumber: '26', x: 0.65, y: 0.835 },
  ],
  kohvikusaal: [
    // Kohvikusaal: boksid 27-41
    // Ülemine veerg: 27-35 (vertikaalselt alla keskel)
    { boothNumber: '27', x: 0.466, y: 0.325 },
    { boothNumber: '28', x: 0.466, y: 0.357 },
    { boothNumber: '29', x: 0.466, y: 0.389 },
    { boothNumber: '30', x: 0.466, y: 0.421 },
    { boothNumber: '31', x: 0.466, y: 0.453 },
    { boothNumber: '32', x: 0.466, y: 0.485 },
    { boothNumber: '33', x: 0.466, y: 0.517 },
    { boothNumber: '34', x: 0.466, y: 0.549 },
    { boothNumber: '35', x: 0.466, y: 0.581 },
    // Alumine rida: 36-37 (horisontaalselt)
    { boothNumber: '36', x: 0.51, y: 0.601 },
    { boothNumber: '37', x: 0.571, y: 0.601 },
    // Parempoolne veerg: 38-41 (vertikaalselt)
    { boothNumber: '38', x: 0.686, y: 0.58 },
    { boothNumber: '39', x: 0.686, y: 0.549 },
    { boothNumber: '40', x: 0.686, y: 0.517 },
    { boothNumber: '41', x: 0.686, y: 0.485 },
  ],
  aula: [
    // Aula: boksid 42-83
    // Ülemine rida: 42-46 (horisontaalselt paremalt vasakule)
    { boothNumber: '42', x: 0.515, y: 0.296 },
    { boothNumber: '43', x: 0.451, y: 0.296 },
    { boothNumber: '44', x: 0.389, y: 0.296 },
    { boothNumber: '45', x: 0.326, y: 0.296 },
    { boothNumber: '46', x: 0.264, y: 0.296 },
    // Vasak veerg: 47-55 (vertikaalselt alla)
    { boothNumber: '47', x: 0.223, y: 0.337 },
    { boothNumber: '48', x: 0.223, y: 0.369 },
    { boothNumber: '49', x: 0.223, y: 0.401 },
    { boothNumber: '50', x: 0.223, y: 0.433 },
    { boothNumber: '51', x: 0.223, y: 0.465 },
    { boothNumber: '52', x: 0.223, y: 0.497 },
    { boothNumber: '53', x: 0.223, y: 0.529 },
    { boothNumber: '54', x: 0.223, y: 0.561 },
    { boothNumber: '55', x: 0.223, y: 0.593 },
    // Alumine rida: 56-62 (horisontaalselt vasakult paremale)
    { boothNumber: '56', x: 0.274, y: 0.633 },
    { boothNumber: '57', x: 0.337, y: 0.633 },
    { boothNumber: '58', x: 0.400, y: 0.633 },
    { boothNumber: '59', x: 0.463, y: 0.633 },
    { boothNumber: '60', x: 0.526, y: 0.633 },
    { boothNumber: '61', x: 0.589, y: 0.633 },
    { boothNumber: '62', x: 0.652, y: 0.633 },
    // Parem veerg: 63-67 (vertikaalselt üles)
    { boothNumber: '63', x: 0.705, y: 0.61 },
    { boothNumber: '64', x: 0.705, y: 0.579 },
    { boothNumber: '65', x: 0.705, y: 0.547 },
    { boothNumber: '66', x: 0.705, y: 0.515 },
    { boothNumber: '67', x: 0.705, y: 0.483 },
    // Üksik boks: 68 (paremal nurgas)
    { boothNumber: '68', x: 0.805, y: 0.444 },
    // Boks 69 (keskel paremal)
    { boothNumber: '69', x: 0.67, y: 0.403 },
    // Sisemine ruut ülemine rida: 70-71
    { boothNumber: '70', x: 0.465, y: 0.368 },
    { boothNumber: '71', x: 0.402, y: 0.368 },
    // Sisemine ruut vasak veerg: 72-76
    { boothNumber: '72', x: 0.34, y: 0.404 },
    { boothNumber: '73', x: 0.34, y: 0.436 },
    { boothNumber: '74', x: 0.34, y: 0.468 },
    { boothNumber: '75', x: 0.34, y: 0.500 },
    { boothNumber: '76', x: 0.34, y: 0.532 },
    // Sisemine ruut alumine rida: 77-78
    { boothNumber: '77', x: 0.402, y: 0.567 },
    { boothNumber: '78', x: 0.465, y: 0.567 },
    // Sisemine ruut parem veerg: 79-83
    { boothNumber: '79', x: 0.525, y: 0.532 },
    { boothNumber: '80', x: 0.525, y: 0.5 },
    { boothNumber: '81', x: 0.525, y: 0.468 },
    { boothNumber: '82', x: 0.525, y: 0.436 },
    { boothNumber: '83', x: 0.525, y: 0.404 },
  ],
  tudengimaja: [
    // Tudengimaja: boksid 84-125
    // Vasak veerg: 84-90 (vertikaalselt alla)
    { boothNumber: '84', x: 0.335, y: 0.283 },
    { boothNumber: '85', x: 0.335, y: 0.329 },
    { boothNumber: '86', x: 0.335, y: 0.359 },
    { boothNumber: '87', x: 0.335, y: 0.406 },
    { boothNumber: '88', x: 0.335, y: 0.436 },
    { boothNumber: '89', x: 0.335, y: 0.482 },
    { boothNumber: '90', x: 0.335, y: 0.513 },
    // Keskel ülemine veerg: 91-95
    { boothNumber: '91', x: 0.629, y: 0.318 },
    { boothNumber: '92', x: 0.629, y: 0.355 },
    { boothNumber: '93', x: 0.629, y: 0.386 },
    { boothNumber: '94', x: 0.629, y: 0.416 },
    { boothNumber: '95', x: 0.629, y: 0.446 },
    // Keskel alumine veerg: 96-100
    { boothNumber: '96', x: 0.629, y: 0.51 },
    { boothNumber: '97', x: 0.629, y: 0.549 },
    { boothNumber: '98', x: 0.629, y: 0.579 },
    { boothNumber: '99', x: 0.629, y: 0.61 },
    { boothNumber: '100', x: 0.629, y: 0.64 },
    // Alumine rida: 101-103 (horisontaalselt)
    { boothNumber: '101', x: 0.645, y: 0.686 },
    { boothNumber: '102', x: 0.705, y: 0.686 },
    { boothNumber: '103', x: 0.765, y: 0.686 },
    // Parem veerg alt üles: 104-114
    { boothNumber: '104', x: 0.812, y: 0.666 },
    { boothNumber: '105', x: 0.812, y: 0.636 },
    { boothNumber: '106', x: 0.812, y: 0.589 },
    { boothNumber: '107', x: 0.812, y: 0.559 },
    { boothNumber: '108', x: 0.812, y: 0.512 },
    { boothNumber: '109', x: 0.812, y: 0.482 },
    { boothNumber: '110', x: 0.812, y: 0.435 },
    { boothNumber: '111', x: 0.812, y: 0.405 },
    { boothNumber: '112', x: 0.812, y: 0.358 },
    { boothNumber: '113', x: 0.812, y: 0.328 },
    { boothNumber: '114', x: 0.812, y: 0.282 },
    // Ülemine rida: 115-117 (horisontaalselt)
    { boothNumber: '115', x: 0.772, y: 0.258 },
    { boothNumber: '116', x: 0.714, y: 0.258 },
    { boothNumber: '117', x: 0.655, y: 0.258 },
    // Keskel parem veerg: 118-125 (ülevalt alla)
    { boothNumber: '118', x: 0.72, y: 0.324 },
    { boothNumber: '119', x: 0.72, y: 0.363 },
    { boothNumber: '120', x: 0.72, y: 0.414 },
    { boothNumber: '121', x: 0.72, y: 0.452 },
    { boothNumber: '122', x: 0.72, y: 0.505 },
    { boothNumber: '123', x: 0.72, y: 0.543 },
    { boothNumber: '124', x: 0.72, y: 0.595 },
    { boothNumber: '125', x: 0.72, y: 0.633 },
  ],
};

// Section-specific map images
const SECTION_MAPS: Record<SectionKey, any> = {
  fuajee: require('../../assets/images/vt-fuajee.png'),
  aula: require('../../assets/images/vt-aula.png'),
  kohvikusaal: require('../../assets/images/vt-kohvikusaal.png'),
  tudengimaja: require('../../assets/images/vt-tudengimaja.png'),
};

// Create booth-to-company lookup from companiesSeed
const COMPANY_BY_BOOTH_CODE: Record<string, Company> = {};
companiesSeed.forEach((company) => {
  if (company.boothCode) {
    COMPANY_BY_BOOTH_CODE[company.boothCode] = company;
  }
});

// Collect all company logos for preloading
const COMPANY_LOGOS = companiesSeed
  .filter((company) => company.localLogo)
  .map((company) => company.localLogo);

type SelectedBoothState = {
  booth: BoothData;
  company?: Company;
};

const SECTION_ORDER: SectionKey[] = ['fuajee', 'kohvikusaal', 'aula', 'tudengimaja'];

type ButtonLayout = { x: number; width: number };

export default function MapScreen() {
  const [selected, setSelected] = useState<SelectedBoothState | null>(null);
  const [activeSection, setActiveSection] = useState<SectionKey>('fuajee');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [buttonLayouts, setButtonLayouts] = useState<Record<SectionKey, ButtonLayout>>({} as any);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(60)).current;

  // QR Scanner state
  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [scanCompany, setScanCompany] = useState<Company | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedRecent, setScannedRecent] = useState(false);
  const [manualCode, setManualCode] = useState('');

  // Animate slider when section changes or layouts are measured
  useEffect(() => {
    const layout = buttonLayouts[activeSection];
    if (layout) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: layout.x,
          useNativeDriver: false,
          tension: 100,
          friction: 12,
        }),
        Animated.spring(widthAnim, {
          toValue: layout.width,
          useNativeDriver: false,
          tension: 100,
          friction: 12,
        }),
      ]).start();
    }
  }, [activeSection, buttonLayouts]);

  // Preload all section map images and company logos on mount
  useEffect(() => {
    async function preloadImages() {
      try {
        // Load map images and company logos in parallel
        await Asset.loadAsync([
          SECTION_MAPS.fuajee,
          SECTION_MAPS.aula,
          SECTION_MAPS.kohvikusaal,
          SECTION_MAPS.tudengimaja,
          ...COMPANY_LOGOS,
        ]);
        setImagesLoaded(true);
      } catch (error) {
        console.warn('Failed to preload images:', error);
        setImagesLoaded(true); // Still show maps even if preload fails
      }
    }
    preloadImages();
  }, []);

  const { width, height: screenHeight } = Dimensions.get('window');
  const containerHeight = screenHeight - 80;
  const boothSize = 19;

  const currentMapImage = SECTION_MAPS[activeSection];
  const currentBooths = SECTION_BOOTHS[activeSection];

  function selectBooth(booth: BoothData) {
    const company = COMPANY_BY_BOOTH_CODE[booth.boothNumber];
    setSelected({ booth, company });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      {/* Map container */}
      <View
        style={{
          width,
          height: containerHeight,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#f0f0f0',
        }}
      >
        {/* Section map image */}
        <Image
          source={currentMapImage}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="contain"
        />

        {/* Booth markers overlay */}
        {currentBooths.map((booth) => {
          const company = COMPANY_BY_BOOTH_CODE[booth.boothNumber];
          // Kohvikusaali, aula ja tudengimaja boksid on suuremad
          const currentBoothSize =
            activeSection === 'kohvikusaal' || activeSection === 'aula' || activeSection === 'tudengimaja'
              ? 22
              : boothSize;
          const left = booth.x * width - currentBoothSize / 2;
          const top = booth.y * containerHeight - currentBoothSize / 2;

          return (
            <Pressable
              key={booth.boothNumber}
              onPress={() => selectBooth(booth)}
              style={{
                position: 'absolute',
                left,
                top,
                width: currentBoothSize,
                height: currentBoothSize,
                borderRadius: 4,
                backgroundColor: company ? '#fff' : 'rgba(100,100,100,0.5)',
                borderWidth: 1,
                borderColor: company ? '#1E66FF' : '#999',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              {company?.localLogo ? (
                <Image
                  source={company.localLogo}
                  style={{
                    width: currentBoothSize - 4,
                    height: currentBoothSize - 4,
                  }}
                  resizeMode="contain"
                />
              ) : (
                <Text
                  style={{
                    color: company ? '#1E66FF' : '#fff',
                    fontSize: 8,
                    fontWeight: '700',
                  }}
                >
                  {booth.boothNumber}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Section buttons at bottom */}
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
            position: 'relative',
            gap: 8,
          }}
        >
          {/* Animated sliding background */}
          <Animated.View
            style={{
              position: 'absolute',
              top: 6,
              left: slideAnim,
              width: widthAnim,
              height: 28,
              borderRadius: 999,
              backgroundColor: '#1E66FF',
            }}
          />
          {(
            [
              { key: 'fuajee', label: 'Fuajee' },
              { key: 'kohvikusaal', label: 'Kohvikusaal' },
              { key: 'aula', label: 'Aula' },
              { key: 'tudengimaja', label: 'Tudengimaja' },
            ] as { key: SectionKey; label: string }[]
          ).map((item) => {
            const isActive = activeSection === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => setActiveSection(item.key)}
                onLayout={(e) => {
                  const { x, width } = e.nativeEvent.layout;
                  setButtonLayouts((prev) => ({
                    ...prev,
                    [item.key]: { x, width },
                  }));
                }}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 999,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 11,
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

      {/* Booth info modal */}
      <Modal visible={!!selected} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setSelected(null)}
        >
          <Pressable
            style={{
              width: '85%',
              maxHeight: '70%',
              padding: 20,
              borderRadius: 16,
              backgroundColor: 'white',
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Company logo */}
              {selected?.company?.localLogo && (
                <View style={{ alignItems: 'center', marginBottom: 16 }}>
                  <Image
                    source={selected.company.localLogo}
                    style={{ width: 120, height: 60 }}
                    resizeMode="contain"
                  />
                </View>
              )}

              {/* Booth number badge */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 999,
                    backgroundColor: '#E5EDFF',
                  }}
                >
                  <Text style={{ color: '#1E66FF', fontSize: 12, fontWeight: '600' }}>
                    Boks {selected?.booth.boothNumber}
                  </Text>
                </View>
                {selected?.company?.isTreasureHunt && (
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 999,
                      backgroundColor: '#FEF3C7',
                    }}
                  >
                    <Text style={{ color: '#D97706', fontSize: 12, fontWeight: '600' }}>
                      🎯 Treasure Hunt
                    </Text>
                  </View>
                )}
              </View>

              {/* Company name */}
              <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 8 }}>
                {selected?.company?.name || 'Tühi boks'}
              </Text>

              {/* Industries */}
              {selected?.company?.industries && selected.company.industries.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {selected.company.industries.map((industry) => (
                    <View
                      key={industry}
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        borderRadius: 999,
                        backgroundColor: '#F1F5F9',
                      }}
                    >
                      <Text style={{ color: '#475569', fontSize: 11 }}>{industry}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Hiring types */}
              {selected?.company?.hiringTypes && selected.company.hiringTypes.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {selected.company.hiringTypes.map((type) => (
                    <View
                      key={type}
                      style={{
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        borderRadius: 999,
                        backgroundColor: '#DCFCE7',
                      }}
                    >
                      <Text style={{ color: '#16A34A', fontSize: 11 }}>{type}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Description */}
              {selected?.company?.description && (
                <Text style={{ fontSize: 14, color: '#64748B', lineHeight: 20 }}>
                  {selected.company.description}
                </Text>
              )}
            </ScrollView>

            {/* Action buttons */}
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
              {/* QR Scanner button - only show if company exists */}
              {selected?.company && (
                <Pressable
                  onPress={() => {
                    setScanCompany(selected.company!);
                    setManualCode('');
                    setScannedRecent(false);
                    setSelected(null);
                    setScanModalVisible(true);
                  }}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                    borderRadius: 999,
                    backgroundColor: '#10B981',
                    gap: 6,
                  }}
                >
                  <MaterialIcons name="qr-code-scanner" size={18} color="white" />
                  <Text style={{ color: 'white', fontWeight: '600' }}>Skänni</Text>
                </Pressable>
              )}

              {/* Close button */}
              <Pressable
                onPress={() => setSelected(null)}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 999,
                  backgroundColor: '#1E66FF',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600' }}>Sulge</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* QR Scanner Modal */}
      <Modal visible={scanModalVisible} animationType="slide" onRequestClose={() => setScanModalVisible(false)}>
        <View style={{ flex: 1, backgroundColor: 'black' }}>
          {/* Close button */}
          <View style={{ position: 'absolute', top: 50, left: 16, zIndex: 10 }}>
            <TouchableOpacity
              onPress={() => setScanModalVisible(false)}
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 999 }}
            >
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {!permission?.granted ? (
              <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 16, marginHorizontal: 16 }}>
                <Text style={{ marginBottom: 16, textAlign: 'center', fontSize: 16 }}>
                  Kaamera kasutamiseks on vaja luba
                </Text>
                <TouchableOpacity
                  onPress={requestPermission}
                  style={{ backgroundColor: '#1E66FF', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}
                >
                  <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>Anna luba</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={scannedRecent ? undefined : ({ data }) => {
                  if (!scanCompany) return;
                  const match =
                    data === scanCompany.id ||
                    data === scanCompany.boothCode ||
                    data.toLowerCase() === scanCompany.name.toLowerCase();

                  if (match) {
                    setScannedRecent(true);
                    Alert.alert('Õnnestus!', `Skännisid: ${scanCompany.name}`, [
                      { text: 'OK', onPress: () => setScanModalVisible(false) },
                    ]);
                  }
                }}
              />
            )}

            {/* Scan frame */}
            <View
              pointerEvents="none"
              style={{
                width: 260,
                height: 260,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 24,
                opacity: 0.8,
              }}
            />

            {/* Bottom info panel */}
            <View
              style={{
                position: 'absolute',
                bottom: 40,
                width: '90%',
                backgroundColor: 'rgba(255,255,255,0.95)',
                padding: 16,
                borderRadius: 16,
              }}
            >
              <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 16, marginBottom: 4 }}>
                {scanCompany?.name}
              </Text>
              <Text style={{ textAlign: 'center', color: '#666', fontSize: 13, marginBottom: 12 }}>
                Suuna kaamera QR koodile
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  placeholder="Sisesta kood käsitsi..."
                  value={manualCode}
                  onChangeText={setManualCode}
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    if (!scanCompany || !manualCode.trim()) {
                      Alert.alert('Sisesta kood');
                      return;
                    }
                    const input = manualCode.trim();
                    const match =
                      input === scanCompany.id ||
                      input === scanCompany.boothCode ||
                      input.toLowerCase() === scanCompany.name.toLowerCase();

                    if (match) {
                      Alert.alert('Õnnestus!', `Skännisid: ${scanCompany.name}`, [
                        { text: 'OK', onPress: () => setScanModalVisible(false) },
                      ]);
                    } else {
                      Alert.alert('Viga', 'Kood ei vasta antud ettevõttele');
                    }
                  }}
                  style={{
                    backgroundColor: '#1E66FF',
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: '600' }}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

