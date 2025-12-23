import { useI18n } from '@/lib/i18n';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

export default function LanguageSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { t, lang, setLanguage } = useI18n();

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View className="flex-1 bg-black/30 items-center justify-end">
        <TouchableOpacity className="flex-1 w-full" activeOpacity={1} onPress={onClose} />
        <View className="w-full bg-white rounded-t-2xl p-5 shadow-xl">
          <Text className="text-[18px] font-bold text-gray-900 mb-3">{t('settings.languageTitle')}</Text>

          <TouchableOpacity
            className={`flex-row items-center justify-between border border-gray-200 rounded-xl p-4 mb-3 ${lang === 'et' ? 'bg-blue-50' : 'bg-white'}`}
            activeOpacity={0.9}
            onPress={() => {
              setLanguage('et');
              onClose();
            }}
          >
            <Text className="text-[16px] font-semibold text-gray-900">{t('settings.estonian')}</Text>
            {lang === 'et' && <Text className="text-blue-600 font-semibold">✓</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-row items-center justify-between border border-gray-200 rounded-xl p-4 ${lang === 'en' ? 'bg-blue-50' : 'bg-white'}`}
            activeOpacity={0.9}
            onPress={() => {
              setLanguage('en');
              onClose();
            }}
          >
            <Text className="text-[16px] font-semibold text-gray-900">{t('settings.english')}</Text>
            {lang === 'en' && <Text className="text-blue-600 font-semibold">✓</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
