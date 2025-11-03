import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        // Modern tab bar styling
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].primary,
        tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#6B7280',
        tabBarStyle: {
          backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
          borderTopColor: isDark ? '#374151' : '#E5E7EB',
          borderTopWidth: 1,
          height: 90,
          paddingBottom: 25,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        
        // Modern header styling
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: Colors[colorScheme ?? 'light'].textOnPrimary,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        
        // Haptic feedback
        tabBarButton: HapticTab,
      }}>
      
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          headerTitle: 'Võti Tulevikku',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name="map" 
              size={focused ? 26 : 24} 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerTitle: 'Search Companies',
          tabBarIcon: ({ color, focused }) => (
            <Feather 
              name="search" 
              size={focused ? 26 : 24} 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="treasure-hunt"
        options={{
          title: 'Hunt',
          headerTitle: 'Treasure Hunt',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons 
              name="stars" 
              size={focused ? 26 : 24} 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="my-fair"
        options={{
          title: 'My Fair',
          headerTitle: 'My Fair',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="person" 
              size={focused ? 26 : 24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
