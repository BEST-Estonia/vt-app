// app/(tabs)/search.tsx
import { Feather, MaterialIcons } from '@expo/vector-icons';
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
import { SafeAreaView as SafeTopArea, useSafeAreaInsets } from 'react-native-safe-area-context';

type Company = {
  id: string;
  name: string;
  description: string;
  initials: string;
  color: string;
  industries: string[];
  hiringTypes: string[];
  isFavorite: boolean;
};

const seed: Company[] = [
  {
    id: '1',
    name: 'Bolt',
    description: 'Building the future of mobility',
    initials: 'BO',
    color: '#1E66FF',
    industries: ['Technology', 'Transportation'],
    hiringTypes: ['Internship', 'Full-time', 'Graduate'],
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Cleveron',
    description: 'Automated parcel solutions',
    initials: 'CL',
    color: '#1E66FF',
    industries: ['Technology', 'Engineering'],
    hiringTypes: ['Internship', 'Full-time'],
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Eesti Energia',
    description: 'Energy for the future',
    initials: 'EE',
    color: '#1E66FF',
    industries: ['Energy', 'Engineering'],
    hiringTypes: ['Internship', 'Full-time', 'Graduate'],
    isFavorite: false,
  },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [companies, setCompanies] = useState<Company[]>(seed);
  const insets = useSafeAreaInsets();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.industries.some(i => i.toLowerCase().includes(q))
    );
  }, [companies, query]);

  const toggleFavorite = (id: string) =>
    setCompanies(prev =>
      prev.map(c => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header within safe TOP inset */}
      <SafeTopArea edges={['top']} style={{ backgroundColor: '#FFFFFF' }}>
        <View className="px-5 pt-3 pb-3 border-b border-gray-200 bg-white">
          <View className="flex-row items-center justify-between">
            <Text className="text-[22px] font-bold text-gray-900">
              Search Companies
            </Text>
            <TouchableOpacity
              className="h-9 w-9 rounded-full items-center justify-center"
              activeOpacity={0.7}
              onPress={() => {}}
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

      {/* List with extra bottom padding to clear the lifted tab bar */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 72, // clear tab bar + extra space
        }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map(c => (
          <CompanyCard
            key={c.id}
            company={c}
            onToggleFavorite={id => toggleFavorite(id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function CompanyCard({
  company,
  onToggleFavorite,
}: {
  company: Company;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="mb-3 rounded-2xl border border-gray-200 bg-white"
      onPress={() => {}}
    >
      <View className="p-4">
        <View className="flex-row">
          {/* Avatar */}
          <View className="mr-3">
            <View
              className="h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: company.color }}
            >
              <Text className="text-[16px] font-bold text-white">
                {company.initials}
              </Text>
            </View>
          </View>

          {/* Main */}
          <View className="flex-1">
            <View className="mb-1 flex-row items-start justify-between">
              <Text className="text-[16px] font-semibold text-gray-900">
                {company.name}
              </Text>
              <TouchableOpacity
                className="ml-3"
                onPress={() => onToggleFavorite(company.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialIcons
                  name={company.isFavorite ? 'star' : 'star-border'}
                  size={22}
                  color={company.isFavorite ? '#F59E0B' : '#9CA3AF'}
                />
              </TouchableOpacity>
            </View>

            <Text className="mb-3 text-[14px] leading-5 text-gray-700">
              {company.description}
            </Text>

            {/* Industries */}
            <View className="mb-2 flex-row flex-wrap">
              {company.industries.map((tag, idx) => (
                <Tag key={`ind-${idx}`} label={tag} type="blue" />
              ))}
            </View>

            {/* Hiring types */}
            <View className="flex-row flex-wrap">
              {company.hiringTypes.map((tag, idx) => (
                <Tag key={`hire-${idx}`} label={tag} type="gray" />
              ))}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Tag({ label, type }: { label: string; type: 'blue' | 'gray' }) {
  if (type === 'blue') {
    return (
      <View className="mr-2 mb-2 rounded-full bg-blue-50 px-2.5 py-1">
        <Text className="text-[12px] font-medium text-blue-700">{label}</Text>
      </View>
    );
  }
  return (
    <View className="mr-2 mb-2 rounded-full bg-gray-100 px-2.5 py-1">
      <Text className="text-[12px] font-medium text-gray-700">{label}</Text>
    </View>
  );
}