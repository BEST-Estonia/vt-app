import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CompanyCard from '../../components/CompanyCard';
import TreasureHuntMap from '../../components/TreasureHuntMap';
import { useUserStore } from '../state/userStore';
import { companiesSeed, type Company } from './data/companies';


export default function TreasureHuntScreen() {
  const ensureParticipantId = useUserStore((s) => s.ensureParticipantId);
  const participantId = useUserStore((s) => s.participantId);
  const scanned = useUserStore((s) => s.scanned);
  const pending = useUserStore((s) => s.pendingScans);
  const addScan = useUserStore((s) => s.addScan);
  const markScanSynced = useUserStore((s) => s.markScanSynced);

  const [modalVisible, setModalVisible] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const carouselRef = useRef<FlatList<Company> | null>(null);

  useEffect(() => {
    ensureParticipantId();
  }, [ensureParticipantId]);

  useEffect(() => {
    if (!selectedCompany && companiesSeed.length > 0) {
      setSelectedCompany(companiesSeed[0]);
    }
  }, [selectedCompany]);

  const total = companiesSeed.length;
  const scannedCount = scanned.length;

  const openScanFor = (company: Company) => {
    setSelectedCompany(company);
    setManualCode('');
    setModalVisible(true);
  };

  const handleManualScan = () => {
    if (!selectedCompany) return;

    const input = manualCode.trim();
    if (!input) {
      Alert.alert('Sisesta koodi või kasuta Simulate');
      return;
    }

    const match =
      input === selectedCompany.id ||
      input === selectedCompany.boothCode ||
      input.toLowerCase() === selectedCompany.name.toLowerCase();

    if (!match) {
      Alert.alert('Kood ei vasta antud ettevõttele');
      return;
    }

    addScan(selectedCompany.id);
    setModalVisible(false);
  };

  const simulateScan = (company: Company) => {
    addScan(company.id);
  };

  const syncPending = () => {
    if (pending.length === 0) {
      Alert.alert('Kõik skannid on sünkroniseeritud');
      return;
    }

    pending.forEach((p) => markScanSynced(p.clientId));
    Alert.alert('Sünkroonitud', `${pending.length} skannitud kirjet sünkroniseeritud`);
  };

  const renderCompact = ({ item }: { item: Company }) => {
    const isScanned = scanned.includes(item.id);
    return (
      <CompanyCard
        company={item}
        compact
        scanned={isScanned}
        onPress={() => openScanFor(item)}
      />
    );
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={['top', 'left', 'right', 'bottom']}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View className="mt-8 p-6 mb-2 items-center">
          <View className="rounded-full p-4 items-center justify-center shadow-sm border-2 border-blue-100">
            <MaterialIcons name="card-giftcard" size={40} color="#3B82F6" />
          </View>
          <Text className="text-2xl font-bold text-primary mt-3">
            Treasure Hunt
          </Text>
          <Text className="text-sm text-text-secondary mt-1 text-center">
            Scan the QR code for each company to receive a reward!
          </Text>
          <View className="flex-row justify-center items-center mt-3">
            <Text className="text-base font-medium mr-3">
              {scannedCount}/{total}
            </Text>
            <TouchableOpacity
              onPress={syncPending}
              className="px-3 py-2 rounded-lg bg-blue-600"
            >
              <Text className="text-white">
                Sync ({pending.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TreasureHuntMap
          companies={companiesSeed}
          scannedIds={scanned}
          selectedId={selectedCompany?.id}
          participantId={participantId}
          onSelect={(company) => {
            openScanFor(company);
          }}
        />


        <View style={{ height: 190 }} className="mt-2">
          <FlatList
            ref={(r) => {
              carouselRef.current = r;
            }}
            data={companiesSeed}
            horizontal
            renderItem={renderCompact}
            keyExtractor={(i) => i.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              alignItems: 'center',
            }}
            snapToInterval={156}
            decelerationRate="fast"
          />
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent
      >
        <View style={{ flex: 1 }} className="bg-black/60">
          <View className="flex-1 items-center justify-center">
            <View
              style={{ width: '92%', maxHeight: '80%' }}
              className="bg-white rounded-2xl p-4"
            >
              <Text className="text-lg font-semibold mb-1">
                Scan the QR code
              </Text>
              <Text className="text-xs text-gray-500 mb-3">
                {selectedCompany?.name}
              </Text>

              {/* QR placeholder */}
              <View className="rounded-xl overflow-hidden mb-4 bg-black">
                <View
                  style={{ height: 220 }}
                  className="items-center justify-center"
                >
                  <Text className="text-white text-sm opacity-70">
                    QR cam space (TODO)
                  </Text>
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                <Text className="text-sm text-gray-700 mb-2">
                  Can use simulate rn since its not ready yet lowk lowk
                </Text>

                <TextInput
                  placeholder="Sisesta kood (nt booth A1 või id)"
                  value={manualCode}
                  onChangeText={setManualCode}
                  className="border border-gray-200 rounded-md p-3 mb-3"
                />

                <View className="flex-row justify-between">
                  <TouchableOpacity
                    onPress={handleManualScan}
                    className="px-4 py-3 bg-green-600 rounded-md"
                  >
                    <Text className="text-white">Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedCompany) simulateScan(selectedCompany);
                      setModalVisible(false);
                    }}
                    className="px-4 py-3 bg-gray-200 rounded-md"
                  >
                    <Text>Simulate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    className="px-4 py-3 bg-red-500 rounded-md"
                  >
                    <Text className="text-white">Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
