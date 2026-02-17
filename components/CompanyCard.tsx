// app/components/CompanyCard.tsx
import type { Company } from "@/data/companies";
import { useI18n } from "@/lib/i18n";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CompanyLogoLightbox from "./CompanyLogoLightbox";

// Industry and hiring type translations
const INDUSTRY_TRANSLATIONS = {
  en: {
    Majandus: "Finance",
    Healthcare: "Healthcare",
    Consulting: "Consulting",
    Engineering: "Engineering",
    Energy: "Energy",
    Retail: "Retail",
    Education: "Education",
    Transportation: "Transportation",
    Logistika: "Logistics",
    Government: "Government",
    Construction: "Construction",
    Manufacturing: "Manufacturing",
    Tourism: "Tourism",
    Other: "Other",
    Kosmos: "Space",
    Infotehnoloogia: "Information Technology",
    Energeetika: "Energy",
    Transport: "Transport",
    Merendus: "Maritime",
    Keskkond: "Environment",
    "Avalik Sektor": "Public Sector",
    Tootmine: "Manufacturing",
    Kindlustus: "Insurance",
    Pangandus: "Banking",
    Müük: "Sales",
  },
  et: {
    Majandus: "Majandus",
    Healthcare: "Tervishoiu",
    Consulting: "Konsulteerimine",
    Engineering: "Tehisehitus",
    Energy: "Energia",
    Retail: "Jaemüük",
    Education: "Haridus",
    Transportation: "Transport",
    Logistika: "Logistika",
    Government: "Valitsus",
    Construction: "Ehitus",
    Manufacturing: "Tootmine",
    Tourism: "Turisim",
    Other: "Muu",
    Kosmos: "Kosmos",
    Infotehnoloogia: "Infotehnoloogia",
    Energeetika: "Energeetika",
    Transport: "Transport",
    Merendus: "Merendus",
    Keskkond: "Keskkond",
    "Avalik Sektor": "Avalik Sektor",
    Tootmine: "Tootmine",
    Kindlustus: "Kindlustus",
    Pangandus: "Pangandus",
    Müük: "Müük",
  },
};

const HIRING_TRANSLATIONS = {
  en: {
    Internship: "Internship",
    "Full-time": "Full-time",
    Graduate: "Graduate",
  },
  et: {
    Internship: "Praktika",
    "Full-time": "Täiskohaga",
    Graduate: "Magistrant",
  },
};

function Tag({ label, type }: { label: string; type: "blue" | "gray" }) {
  if (type === "blue") {
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

type Props = {
  company: Company;
  onToggleFavorite?: (id: string) => void;
  onPress?: () => void;
  scanned?: boolean;
  compact?: boolean;
  showBoothCode?: boolean;
};

export default function CompanyCard({
  company,
  onToggleFavorite = () => {},
  onPress,
  scanned = false,
  compact = false,
  showBoothCode = true,
}: Props) {
  const { lang } = useI18n();
  const [logoOpen, setLogoOpen] = React.useState(false);

  const logoModal = (
    <CompanyLogoLightbox
      visible={logoOpen}
      onClose={() => setLogoOpen(false)}
      logoSource={company.localLogo}
      fallbackText={company.initials}
    />
  );

  // --- COMPACT VIEW (The Carousel Items) ---
  if (compact) {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPress}
          className="mr-4"
          style={{ width: 140 }}
        >
          <View className="bg-white rounded-2xl p-4 items-center shadow-sm border border-gray-100">
            {/* Logo Container Wrapper for positioning Checkmark */}
            <View className="relative mb-3">
              {/* The Logo Circle */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setLogoOpen(true)}
                style={{ width: 80, height: 80 }}
                className="rounded-full bg-white border border-gray-100 items-center justify-center overflow-hidden"
              >
                {company.localLogo ? (
                  <Image
                    source={company.localLogo}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                ) : (
                  <Text className="text-2xl font-bold text-blue-700">
                    {company.initials}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Checkmark - Moved OUTSIDE the overflow-hidden view so it floats on top */}
              {scanned && (
                <View className="absolute -top-1 -right-1 z-10 bg-white rounded-full p-0.5 shadow-sm">
                  <View className="h-7 w-7 rounded-full bg-green-600 items-center justify-center">
                    <MaterialIcons name="check" size={16} color="white" />
                  </View>
                </View>
              )}
            </View>

            <Text
              className="text-sm font-bold text-gray-900 text-center leading-5"
              numberOfLines={1}
            >
              {company.name}
            </Text>

            {showBoothCode && company.boothCode ? (
              <Text className="text-xs text-gray-500 mt-1 font-medium">
                {company.boothCode}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
        {logoModal}
      </>
    );
  }

  // --- REGULAR LIST VIEW ---
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        className="mb-3 rounded-2xl border border-gray-200 bg-white shadow-sm"
        onPress={onPress}
      >
        <View className="p-4">
          <View className="flex-row">
            {/* Logo Column */}
            <View className="mr-3">
              <View className="relative">
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setLogoOpen(true)}
                  className="h-14 w-14 rounded-xl overflow-hidden bg-white items-center justify-center border border-gray-200"
                >
                  {company.localLogo ? (
                    <Image
                      source={company.localLogo}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text className="text-[16px] font-bold text-blue-700">
                      {company.initials}
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Scanned Checkmark for List View */}
                {scanned && (
                  <View className="absolute -top-2 -right-2 z-10 bg-white rounded-full">
                    <View className="h-6 w-6 rounded-full bg-green-600 items-center justify-center shadow-sm border-2 border-white">
                      <MaterialIcons name="check" size={12} color="white" />
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Main Content Column */}
            <View className="flex-1">
              <View className="mb-1 flex-row items-start justify-between">
                <View className="flex-1 pr-2">
                  <Text className="text-[16px] font-bold text-gray-900">
                    {company.name}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => onToggleFavorite(company.id)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MaterialIcons
                    name={company.isFavorite ? "star" : "star-border"}
                    size={24}
                    color={company.isFavorite ? "#F59E0B" : "#9CA3AF"}
                  />
                </TouchableOpacity>
              </View>

              <Text
                className="mb-3 text-[14px] leading-5 text-gray-600"
                numberOfLines={2}
              >
                {company.description[lang]}
              </Text>

              <View className="flex-row flex-wrap gap-2">
                {company.industries.slice(0, 2).map((tag, idx) => (
                  <Tag
                    key={`ind-${idx}`}
                    label={
                      INDUSTRY_TRANSLATIONS[lang][
                        tag as keyof (typeof INDUSTRY_TRANSLATIONS)["en"]
                      ] || tag
                    }
                    type="blue"
                  />
                ))}
                {company.hiringTypes.slice(0, 1).map((tag, idx) => (
                  <Tag
                    key={`hire-${idx}`}
                    label={
                      HIRING_TRANSLATIONS[lang][
                        tag as keyof (typeof HIRING_TRANSLATIONS)["en"]
                      ] || tag
                    }
                    type="gray"
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {logoModal}
    </>
  );
}
