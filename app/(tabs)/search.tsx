// app/(tabs)/search.tsx
// Search screen using extracted data, CompanyCard component, and the FilterSheet modal.

import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView as SafeTopArea,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import CompanyCard from '@/components/CompanyCard';
import FilterSheet from '@/components/FilterSheet';
import {
  ALL_HIRING,
  ALL_INDUSTRIES,
  companiesSeed,
  type Company,
  type SortMode,
} from './data/companies';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();

  // Data + favorites
  const [companies, setCompanies] = useState<Company[]>(companiesSeed);

  // Query + filters + sort
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedHiring, setSelectedHiring] = useState<string[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>('Relevance');

  const toggleFavorite = (id: string) =>
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );

  // Apply search + filters + sort
  const filtered = useMemo(() => {
    let list = companies;

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.industries.some((i) => i.toLowerCase().includes(q))
      );
    }

    if (selectedIndustries.length > 0) {
      list = list.filter((c) =>
        c.industries.some((i) => selectedIndustries.includes(i))
      );
    }

    if (selectedHiring.length > 0) {
      list = list.filter((c) =>
        c.hiringTypes.some((t) => selectedHiring.includes(t))
      );
    }

    if (sortMode === 'A-Z') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    // Relevance: keep existing order for now

    return list;
  }, [companies, query, selectedIndustries, selectedHiring, sortMode]);

  const clearAllFilters = () => {
    setSelectedIndustries([]);
    setSelectedHiring([]);
    setSortMode('Relevance');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <SafeTopArea edges={['top']} style={{ backgroundColor: '#FFFFFF' }}>
  <View className="px-5 pt-6 pb-3 border-b border-gray-200 bg-white">
          <View className="flex-row items-center justify-between">
            <Text className="text-[22px] font-bold text-gray-900">
              Search Companies
            </Text>
            <TouchableOpacity
              className="h-9 w-9 rounded-full items-center justify-center"
              activeOpacity={0.7}
              onPress={() => setFiltersOpen(true)}
            >
              <Feather name="sliders" size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Search bar */}
          <View className="mt-3 h-12 flex-row items-center rounded-xl border border-gray-300 bg-white px-3">
            <Feather name="search" size={18} color="#6B7280" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search companies..."
              placeholderTextColor="#9CA3AF"
              className="ml-2 flex-1 text-[16px] text-gray-900"
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <Feather name="x" size={16} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeTopArea>

      {/* Results count */}
      <View className="px-5 py-3">
        <Text className="text-[14px] text-gray-600">
          {filtered.length} companies found
        </Text>
      </View>

      {/* List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 72,
        }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((c) => (
          <CompanyCard
            key={c.id}
            company={c}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </ScrollView>

      {/* Filters sheet */}
      <FilterSheet
        visible={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        allIndustries={ALL_INDUSTRIES}
        allHiring={ALL_HIRING as unknown as string[]}
        selectedIndustries={selectedIndustries}
        setSelectedIndustries={setSelectedIndustries}
        selectedHiring={selectedHiring}
        setSelectedHiring={setSelectedHiring}
        sortMode={sortMode}
        setSortMode={setSortMode}
        onClearAll={clearAllFilters}
        onApply={() => {
          // State is already bound to the list
        }}
      />
    </SafeAreaView>
  );
}