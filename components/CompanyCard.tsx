// components/CompanyCard.tsx
// Moved out of app/(tabs) so it is not treated as a route by expo-router.
import type { Company } from '@/app/(tabs)/data/companies';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

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

export default function CompanyCard({
  company,
  onToggleFavorite,
  onPress,
}: {
  company: Company;
  onToggleFavorite: (id: string) => void;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="mb-3 rounded-2xl border border-gray-200 bg-white"
      onPress={onPress}
    >
      <View className="p-4">
        <View className="flex-row">
          <View className="mr-3">
            <View
              className="h-12 w-12 rounded-xl overflow-hidden bg-white items-center justify-center"
              style={{ borderWidth: 1, borderColor: '#E5E7EB', padding: 4 }}
            >
              {company.localLogo ? (
                <Image
                  source={company.localLogo}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="contain"
                />
              ) : (
                <Text className="text-[16px] font-bold text-blue-700">
                  {company.initials}
                </Text>
              )}
            </View>
          </View>

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

            <View className="mb-2 flex-row flex-wrap">
              {company.industries.map((tag, idx) => (
                <Tag key={`ind-${idx}`} label={tag} type="blue" />
              ))}
            </View>

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
