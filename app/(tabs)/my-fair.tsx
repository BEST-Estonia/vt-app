import React from 'react';
import { Text, View } from 'react-native';

export default function MyFairScreen() {
  return (
    <View className="flex-1 bg-white justify-center items-center p-lg">
      <Text className="text-2xl font-bold text-primary mb-md">
        My Fair
      </Text>
      <Text className="text-base text-text-secondary text-center mb-xl">
        Your favorites, visited booths, and schedule
      </Text>
      <View className="w-48 h-48 bg-surface-secondary rounded-lg justify-center items-center border-2 border-border border-dashed">
        <Text className="text-5xl">👤</Text>
      </View>
    </View>
  );
}