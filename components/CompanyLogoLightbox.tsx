import React from "react";
import {
    Image,
    Modal,
    Pressable,
    Text,
    View,
    type ImageSourcePropType,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  logoSource?: ImageSourcePropType;
  fallbackText: string;
};

export default function CompanyLogoLightbox({
  visible,
  onClose,
  logoSource,
  fallbackText,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(15, 23, 42, 0.55)",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            width: 280,
            height: 280,
            borderRadius: 28,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 6,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 28,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {logoSource ? (
              <Image
                source={logoSource}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            ) : (
              <Text
                style={{ fontSize: 36, fontWeight: "700", color: "#1E66FF" }}
              >
                {fallbackText}
              </Text>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
