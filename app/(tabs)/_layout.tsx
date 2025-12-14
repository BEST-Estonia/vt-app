// app/(tabs)/_layout.tsx
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const baseHeight = 60; // visual height for the bar itself
  const bottomPad = Math.max(insets.bottom, 12); // ensure at least 12px padding

  return (
    <Tabs
      initialRouteName="treasure-hunt"
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: '#FFFFFF' },
        tabBarActiveTintColor: '#1E66FF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          borderTopWidth: 1,
          height: baseHeight + bottomPad, // lifts above the home indicator
          paddingTop: 8,
          paddingBottom: bottomPad,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      {/* Hidden redirect screen */}
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Hides from tab bar
        }}
      />
      <Tabs.Screen
        name="treasure-hunt"
        options={{
          title: 'Hunt',
          tabBarIcon: ({ color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-fair"
        options={{
          title: 'My Fair',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={size} color={color} />
          ),
        }}
      />
      {/* Hidden folders */}
      <Tabs.Screen name="assets" options={{ href: null }} />
      <Tabs.Screen name="data" options={{ href: null }} />
    </Tabs>
  );
}