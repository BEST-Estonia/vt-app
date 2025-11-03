import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Temporary mock data - we'll replace this with real data later
const mockCompanies = [
  {
    id: '1',
    name: 'Bolt',
    description: 'Building the future of mobility',
    initials: 'BO',
    color: '#0066CC',
    industries: ['Technology', 'Transportation'],
    hiringTypes: ['Internship', 'Full-time', 'Graduate'],
    isFavorite: false,
  },
  {
    id: '2', 
    name: 'Cleveron',
    description: 'Automated parcel solutions',
    initials: 'CL',
    color: '#0066CC',
    industries: ['Technology', 'Engineering'],
    hiringTypes: ['Internship', 'Full-time'],
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Eesti Energia',
    description: 'Energy for the future',
    initials: 'EE',
    color: '#0066CC',
    industries: ['Energy', 'Engineering'],
    hiringTypes: ['Internship', 'Full-time', 'Graduate'],
    isFavorite: false,
  },
];

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState(mockCompanies);

  const handleFilterPress = () => {
    setShowFilters(!showFilters);
    console.log('Filter button pressed');
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    // Simple search filter
    const filtered = mockCompanies.filter(company => 
      company.name.toLowerCase().includes(text.toLowerCase()) ||
      company.description.toLowerCase().includes(text.toLowerCase())
    );
    setCompanies(filtered);
  };

  const toggleFavorite = (companyId: string) => {
    setCompanies(prev => prev.map(company => 
      company.id === companyId 
        ? { ...company, isFavorite: !company.isFavorite }
        : company
    ));
  };

  const CompanyCard = ({ company }: { company: typeof mockCompanies[0] }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl p-4 mb-3 border border-gray-100"
      activeOpacity={0.7}
      onPress={() => console.log('Company pressed:', company.name)}
    >
      <View className="flex-row items-start">
        {/* Company Logo/Initials */}
        <View 
          className="w-12 h-12 rounded-xl justify-center items-center mr-3"
          style={{ backgroundColor: company.color }}
        >
          <Text className="text-white font-bold text-lg">
            {company.initials}
          </Text>
        </View>

        {/* Company Info */}
        <View className="flex-1">
          <View className="flex-row justify-between items-start mb-1">
            <Text className="text-lg font-semibold text-gray-900">
              {company.name}
            </Text>
            <TouchableOpacity 
              onPress={() => toggleFavorite(company.id)}
              className="p-1"
            >
              <MaterialIcons 
                name={company.isFavorite ? "favorite" : "favorite-border"} 
                size={22} 
                color={company.isFavorite ? "#EF4444" : "#9CA3AF"} 
              />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-600 text-sm mb-3">
            {company.description}
          </Text>

          {/* Industry Tags */}
          <View className="flex-row flex-wrap mb-2">
            {company.industries.map((industry, index) => (
              <View 
                key={index}
                className="bg-blue-100 px-2 py-1 rounded-md mr-2 mb-1"
              >
                <Text className="text-primary text-xs font-medium">
                  {industry}
                </Text>
              </View>
            ))}
          </View>

          {/* Hiring Type Tags */}
          <View className="flex-row flex-wrap">
            {company.hiringTypes.map((type, index) => (
              <View 
                key={index}
                className="bg-gray-100 px-2 py-1 rounded-md mr-2 mb-1"
              >
                <Text className="text-gray-700 text-xs font-medium">
                  {type}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor={Colors[colorScheme ?? 'light'].primary} />
      
      {/* Header Section */}
      <View className="bg-primary px-4 py-3">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-lg font-bold">
            Search Companies
          </Text>
          <TouchableOpacity 
            onPress={handleFilterPress}
            className="p-2 rounded-lg bg-white bg-opacity-20"
            activeOpacity={0.7}
          >
            <Feather name="sliders" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-gray-50">
        {/* Search Input Section */}
        <View className="px-4 py-4 bg-white">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Feather name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search companies..."
              value={searchQuery}
              onChangeText={handleSearchChange}
              className="flex-1 ml-3 text-base text-gray-900"
              placeholderTextColor="#9CA3AF"
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Feather name="x" size={18} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results Count */}
        <View className="px-4 py-2">
          <Text className="text-sm text-gray-500">
            {companies.length} companies found
          </Text>
        </View>

        {/* Company List */}
        <ScrollView className="flex-1 px-4 pb-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}