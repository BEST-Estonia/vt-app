import React from 'react';
import { Text, View } from 'react-native';

export default function MapScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center p-lg">
      <Text className="text-2xl font-bold text-primary mb-md">
        Interactive Map
      </Text>
      <Text className="text-base text-text-secondary text-center mb-xl">
        Floor plan with company booth locations will appear here
      </Text>
      <View className="w-48 h-48 bg-surface-secondary rounded-lg justify-center items-center border-2 border-border border-dashed">
        <Text className="text-5xl">🗺️</Text>
      </View>
    </View>
  );
}