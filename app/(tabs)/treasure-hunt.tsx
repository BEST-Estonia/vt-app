import { companiesSeed, type Company } from '@/data/companies';
import { useI18n } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/userStore';
import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CompanyCard from '../../components/CompanyCard';
import TreasureHuntMap from '../../components/TreasureHuntMap';

export default function TreasureHuntScreen() {
  const { t } = useI18n();
  const ensureParticipantId = useUserStore((s) => s.ensureParticipantId);
  const initTreasureHunt = useUserStore((s) => s.initTreasureHunt);
  const participantId = useUserStore((s) => s.participantId);
  const scanned = useUserStore((s) => s.scanned) || [];
  const addScan = useUserStore((s) => s.addScan);
  
  const activeHuntIds = useUserStore((s) => s.activeHuntIds) || [];

  useEffect(() => {
    ensureParticipantId();
    initTreasureHunt(); 
  }, [ensureParticipantId, initTreasureHunt]);

  const huntCompanies = useMemo(() => {
    return activeHuntIds
      .map(id => companiesSeed.find(c => c.id === id))
      .filter(Boolean) as Company[];
  }, [activeHuntIds]);

  const [modalVisible, setModalVisible] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedRecent, setScannedRecent] = useState(false);
  const [winnerModalVisible, setWinnerModalVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRegisteredLocal, setHasRegisteredLocal] = useState(false);

  const carouselRef = useRef<FlatList<Company> | null>(null);

  useEffect(() => {
    if (!selectedCompany && huntCompanies.length > 0) {
      setSelectedCompany(huntCompanies[0]);
    }
  }, [selectedCompany, huntCompanies]);

  const total = huntCompanies.length; 
  const scannedCount = huntCompanies.filter(c => scanned.includes(c.id)).length; 
  const remaining = total - scannedCount;
  const isFinished = scannedCount >= total && total > 0;

  const openScanFor = (company: Company) => {
    if (scanned.includes(company.id)) {
      Alert.alert(t('treasure.alreadyScannedTitle'), t('treasure.alreadyScannedBody'));
      return;
    }
    setSelectedCompany(company);
    setManualCode('');
    setScannedRecent(false);
    setModalVisible(true);
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scannedRecent || !selectedCompany) return;
    const match =
      data === selectedCompany.id ||
      data === selectedCompany.boothCode ||
      data.toLowerCase() === selectedCompany.name.toLowerCase();

    if (match) {
      setScannedRecent(true);
      addScan(selectedCompany.id);
      Alert.alert(
        t('treasure.scanSuccessTitle'),
        t('treasure.scanSuccessBody', { name: selectedCompany.name }),
        [{ text: 'OK', onPress: () => setModalVisible(false) }]
      );
    }
  };

  const handleManualScan = () => {
    if (!selectedCompany) return;
    const input = manualCode.trim();
    if (!input) {
      Alert.alert(t('treasure.manual.enterCode'));
      return;
    }
    const match =
      input === selectedCompany.id ||
      input === selectedCompany.boothCode ||
      input.toLowerCase() === selectedCompany.name.toLowerCase();

    if (!match) {
      Alert.alert(t('treasure.manual.codeMismatch'));
      return;
    }
    addScan(selectedCompany.id);
    setModalVisible(false);
  };

  const handleSubmitWinner = async () => {
    if (!fullName.trim()) {
      Alert.alert(t('treasure.error.enterNameTitle'), t('treasure.error.enterNameBody'));
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('giveaway_entries')
        .upsert(
          { participant_id: participantId, full_name: fullName.trim() },
          { onConflict: 'participant_id' }
        );

      if (error) {
        console.log('[treasure] submit error:', {
          code: (error as any).code,
          message: (error as any).message,
          details: (error as any).details,
          hint: (error as any).hint,
        });
        Alert.alert(
          t('treasure.error.submitTitle'),
          `${t('treasure.error.submitBody')}${(error as any).message ? `\n${(error as any).message}` : ''}`
        );
        return;
      }

      setHasRegisteredLocal(true);
      Alert.alert(t('treasure.success.registeredTitle'), t('treasure.success.registeredBody'), [
        { text: 'OK', onPress: () => setWinnerModalVisible(false) }
      ]);
    } catch (e) {
      console.log('[treasure] submit error (exception):', e);
      Alert.alert(t('treasure.error.submitTitle'), t('treasure.error.submitBody'));
    } finally {
      setIsSubmitting(false);
    }
  };

    let buttonText = t('treasure.button.collectMore', { remaining });
  let buttonIcon = "qr-code-scanner";
  let buttonBg = "bg-gray-500";
  let handleMainButtonPress = () => {
      Alert.alert(t('treasure.notFinishedTitle'), t('treasure.notFinishedBody', { total }));
  };

  if (isFinished) {
        if (hasRegisteredLocal) {
          buttonText = t('treasure.button.registered');
          buttonIcon = "check-circle";
          buttonBg = "bg-blue-600";
          handleMainButtonPress = () => Alert.alert(t('treasure.success.registeredTitle'), t('treasure.success.registeredBody'));
      } else {
          buttonText = t('treasure.button.enterGiveaway');
          buttonIcon = "emoji-events";
          buttonBg = "bg-green-600";
          handleMainButtonPress = () => setWinnerModalVisible(true);
      }
  }

  const renderCompact = ({ item }: { item: Company }) => {
    const isScanned = scanned.includes(item.id);
    return (
      <CompanyCard
        company={item}
        compact
        scanned={isScanned}
        onPress={() => openScanFor(item)}
        showBoothCode={false}
      />
    );
  };

  if (!permission) return <View className="flex-1 bg-white" />;

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View className="mt-8 p-6 mb-2 items-center">
          <View className="rounded-full p-4 items-center justify-center shadow-sm border-2 border-blue-100">
            <MaterialIcons name="card-giftcard" size={40} color="#3B82F6" />
          </View>
          <Text className="text-2xl font-bold text-primary mt-3">{t('treasure.title')}</Text>
          {/* DYNAMIC TEXT HERE */}
          <Text className="text-sm text-text-secondary mt-1 text-center">{t('treasure.subtitle', { total })}</Text>

          <View className="flex-row items-center mt-3 bg-blue-50 px-4 py-2 rounded-full self-center">
            <Text className="text-base font-semibold text-blue-800 flex-shrink">{t('treasure.progress', { scanned: scannedCount, total })}</Text>
            {isFinished && (
              <View className="ml-2"><MaterialIcons name="check-circle" size={20} color="green" /></View>
            )}
          </View>

          <TouchableOpacity onPress={handleMainButtonPress} className={`mt-4 ${buttonBg} w-full max-w-xs px-6 py-3 rounded-xl shadow-md flex-row items-center justify-center`}>
            <MaterialIcons name={buttonIcon as any} size={24} color="white" />
            <Text className="text-white font-bold ml-2 text-lg">{buttonText}</Text>
          </TouchableOpacity>
        </View>

        <TreasureHuntMap
          companies={huntCompanies}
          scannedIds={scanned}
          selectedId={selectedCompany?.id}
          participantId={participantId}
          onSelect={(company) => openScanFor(company)}
        />

        <View style={{ height: 190 }} className="mt-2">
          <FlatList
            ref={(r) => { carouselRef.current = r; }}
            data={huntCompanies}
            horizontal
            renderItem={renderCompact}
            keyExtractor={(i) => i.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, alignItems: 'center' }}
            snapToInterval={156}
            decelerationRate="fast"
          />
        </View>
      </ScrollView>
      
      {/* (MODALS are identical to previous version, omitted for brevity but should be kept in your file) */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)} presentationStyle="pageSheet">
        <View className="flex-1 bg-black">
          <View className="absolute top-4 left-4 z-10">
            <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-black/50 p-2 rounded-full">
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 items-center justify-center">
             {!permission.granted ? (
               <View className="p-6 bg-white rounded-xl items-center mx-4">
                 <Text className="mb-4 text-center text-lg">{t('treasure.camera.permissionTitle')}</Text>
                 <TouchableOpacity onPress={requestPermission} className="bg-blue-600 px-6 py-3 rounded-lg"><Text className="text-white font-semibold">{t('treasure.camera.grantPermission')}</Text></TouchableOpacity>
               </View>
             ) : (
               <CameraView style={StyleSheet.absoluteFillObject} facing="back" onBarcodeScanned={scannedRecent ? undefined : handleBarCodeScanned} />
             )}
             <View className="absolute bottom-10 w-[90%] bg-white/90 p-4 rounded-2xl shadow-lg">
                <Text className="text-center font-semibold mb-1 text-lg">{selectedCompany?.name}</Text>
                <Text className="text-center text-sm text-gray-500 mb-4">{t('treasure.camera.scanPrompt')}</Text>
                <View className="flex-row">
                  <TextInput placeholder={t('treasure.manual.placeholder')} value={manualCode} onChangeText={setManualCode} className="flex-1 bg-white border border-gray-300 rounded-l-lg px-3 py-3" />
                  <TouchableOpacity onPress={handleManualScan} className="bg-blue-600 px-5 justify-center rounded-r-lg"><Text className="text-white font-bold">{t('treasure.manual.ok')}</Text></TouchableOpacity>
                </View>
             </View>
             <View pointerEvents="none" style={{ width: 260, height: 260, borderWidth: 2, borderColor: 'white', borderRadius: 24, opacity: 0.8 }} />
          </View>
        </View>
      </Modal>

      <Modal visible={winnerModalVisible} transparent animationType="fade" onRequestClose={() => setWinnerModalVisible(false)}>
        <View className="flex-1 bg-black/60 items-center justify-center p-4">
          <View className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-xl">
            <View className="items-center mb-5">
              <View className="h-16 w-16 bg-green-100 rounded-full items-center justify-center mb-3"><MaterialIcons name="emoji-events" size={36} color="#16a34a" /></View>
              <Text className="text-2xl font-bold text-center text-gray-900">{t('treasure.winner.title')}</Text>
              <Text className="text-gray-600 text-center mt-2 px-2">{t('treasure.winner.body')}</Text>
            </View>
            <Text className="text-sm font-bold text-gray-700 mb-1.5 ml-1">{t('treasure.winner.nameLabel')}</Text>
            <TextInput value={fullName} onChangeText={setFullName} placeholder={t('treasure.winner.namePlaceholder')} className="bg-gray-50 border border-gray-300 rounded-xl p-3.5 mb-5 text-base text-gray-900" autoFocus />
            <TouchableOpacity onPress={handleSubmitWinner} disabled={isSubmitting} className={`w-full py-3.5 rounded-xl flex-row justify-center items-center shadow-sm ${isSubmitting ? 'bg-gray-400' : 'bg-green-600'}`}>
              {isSubmitting ? <Text className="text-white font-semibold">{t('treasure.winner.submitLoading')}</Text> : <><Text className="text-white font-bold text-base mr-2">{t('treasure.winner.submitCta')}</Text><MaterialIcons name="arrow-forward" size={20} color="white" /></>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setWinnerModalVisible(false)} className="mt-4 py-2"><Text className="text-center text-gray-500 font-medium">{t('treasure.winner.close')}</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}