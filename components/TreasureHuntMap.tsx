// app/components/TreasureHuntMap.tsx
import type { Company } from "@/data/companies";
import { useI18n } from "@/lib/i18n";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";

type Props = {
  companies: Company[];
  scannedIds?: string[];
  selectedId?: string;
  onSelect?: (company: Company) => void;
  participantId?: string;
  onPrizePress?: () => void;
};

// --- Helperid sõbraliku ID jaoks (nt TA37) ---

function hashStringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

function makeReadableId(participantId?: string): string {
  if (!participantId) return "—";

  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const digits = "23456789";

  let seed = hashStringToSeed(participantId);

  const next = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };

  const pick = (alphabet: string) =>
    alphabet[Math.floor(next() * alphabet.length)];

  return pick(letters) + pick(letters) + pick(digits) + pick(digits);
}

export default function TreasureHuntMap({
  companies,
  scannedIds = [],
  selectedId,
  onSelect,
  participantId,
  onPrizePress,
}: Props) {
  const { t } = useI18n();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!selectedId) return;
    scaleAnim.setValue(1);
    Animated.spring(scaleAnim, {
      toValue: 1.12,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [selectedId, scaleAnim]);

  const readableId = makeReadableId(participantId);
  const allScanned =
    companies.length > 0 && companies.every((c) => scannedIds.includes(c.id));

  // pulse animatsioon nii enne kui pärast – lihtsalt erineva "tugevusega"
  useEffect(() => {
    pulseAnim.setValue(0);
    const loop = Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: allScanned ? 1400 : 2200, // lõpupoole veidi kiirem ja intensiivsem
        useNativeDriver: true,
      }),
    );
    loop.start();

    return () => {
      loop.stop();
    };
  }, [allScanned, pulseAnim]);

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: allScanned ? [1, 2.3] : [1, 1.08], // enne: õrn "hingamine", pärast: suur pulse
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: allScanned ? [0.7, 0.2, 0] : [0.25, 0.12, 0.05],
  });

  return (
    <View className="w-full mb-4 px-4">
      <LinearGradient
        colors={["#003983", "#005AC8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 32,
          paddingHorizontal: 24,
          paddingVertical: 24,
          overflow: "hidden",
        }}
      >
        {/* terve kaardi “stack”: rada taustal, sisu ees */}
        <View style={{ alignItems: "center" }}>
          {/* vertikaalne rada otse keskel, taustal */}
          <View
            style={{
              position: "absolute",
              top: 32,
              bottom: 80, // et nupp jääks raja lõpu peale
              width: 12,
              borderRadius: 999,
              backgroundColor: "rgba(0, 90, 200, 0.35)",
              alignSelf: "center",
            }}
          />

          {/* ettevõtete “sammud” rajal */}
          <View style={{ marginTop: 24, marginBottom: 32 }}>
            {companies.map((company, index) => {
              const isScanned = scannedIds.includes(company.id);
              const isSelected = selectedId === company.id;

              const iconScaleStyle = {
                transform: [{ scale: isSelected ? scaleAnim : 1 }],
              };

              return (
                <TouchableOpacity
                  key={company.id}
                  activeOpacity={0.9}
                  onPress={() => onSelect?.(company)}
                  style={{
                    alignItems: "center",
                    marginBottom: index === companies.length - 1 ? 0 : 100,
                  }}
                >
                  {/* väike punkt rajal */}
                  <View
                    className="mb-2"
                    style={{
                      height: 18,
                      width: 18,
                      borderRadius: 999,
                      borderWidth: 2,
                      borderColor: isScanned ? "#22c55e" : "#bfdbfe",
                      backgroundColor: isSelected
                        ? "#dbeafe"
                        : "rgba(15, 23, 42, 0.7)",
                    }}
                  />

                  {/* ikooni mull (animated) */}
                  <Animated.View
                    className="items-center justify-center shadow-md overflow-hidden"
                    style={[
                      {
                        height: 56,
                        width: 56,
                        borderRadius: 20,
                        backgroundColor: "rgba(248, 250, 252, 0.96)",
                        borderWidth: isSelected ? 2 : 1,
                        borderColor: isSelected
                          ? "#38bdf8"
                          : "rgba(148, 163, 184, 0.6)",
                      },
                      iconScaleStyle,
                    ]}
                  >
                    {company.localLogo ? (
                      <Image
                        source={company.localLogo}
                        style={{ width: "100%", height: "100%" }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Text className="text-[12px] font-semibold text-blue-700 text-center px-1">
                        {company.initials}
                      </Text>
                    )}
                  </Animated.View>

                  {/* nimi all – keskjoondatud */}
                  <Text
                    className="mt-2 text-[11px] text-blue-50 text-center px-16"
                    numberOfLines={1}
                  >
                    {company.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Raja lõpp: visuaalne nupp "Kraba auhind" – kood ja õnnesoov ainult Alertis */}
          <View style={{ alignItems: "center", marginBottom: 4 }}>
            {/* pulss + lõpp-punkt rajal (visuaalne state) */}
            <View
              style={{
                marginBottom: 12,
                width: 32,
                height: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Animated.View
                style={{
                  position: "absolute",
                  height: 32,
                  width: 32,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: allScanned
                    ? "rgba(45, 212, 191, 0.7)" // rohekas – done
                    : "rgba(191, 219, 254, 0.9)", // sinakas – lowkey state
                  opacity: pulseOpacity,
                  transform: [{ scale: pulseScale }],
                }}
              />

              <View
                style={{
                  height: 22,
                  width: 22,
                  borderRadius: 999,
                  borderWidth: 3,
                  borderColor: allScanned ? "#22c55e" : "#facc15",
                  backgroundColor: allScanned ? "#4ade80" : "#fbbf24",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name={allScanned ? "check" : "stars"}
                  size={14}
                  color={allScanned ? "#064e3b" : "#0f172a"}
                />
              </View>
            </View>

            {/* AINULT nupu visuaal – tekst "Kraba auhind" */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onPrizePress}
              className="rounded-full px-5 py-2.5 flex-row items-center"
              style={{
                backgroundColor: allScanned
                  ? "#22c55e"
                  : "rgba(248, 250, 252, 0.95)",
              }}
            >
              <MaterialIcons
                name="card-giftcard"
                size={18}
                color={allScanned ? "#022c22" : "#0f172a"}
              />
              <Text
                className="ml-2 text-sm font-semibold"
                style={{
                  color: allScanned ? "#022c22" : "#0f172a",
                }}
              >
                {t("treasure.prize.button")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
