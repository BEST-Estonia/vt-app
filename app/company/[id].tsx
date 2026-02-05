// app/company/[id].tsx
import {
  companiesSeed,
  companyEvents,
  type Company,
  type CompanyEvent,
} from "@/data/companies";
import { useI18n } from "@/lib/i18n";
import { useUserStore } from "@/store/userStore";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

export default function CompanyProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { lang } = useI18n();

  // Store hooks
  const {
    favorites,
    toggleFavorite,
    schedule: scheduledEventIds,
    addToSchedule,
    removeFromSchedule,
  } = useUserStore();

  // 1. Get Company Data
  const company: Company | undefined = useMemo(
    () => companiesSeed.find((c) => c.id === id),
    [id],
  );

  // 2. Get Events (Firmakülastus, Workshops, etc.)
  const events = useMemo(
    () => companyEvents.filter((e) => e.companyId === id),
    [id],
  );

  if (!company) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Ettevõtet ei leitud.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-blue-600 px-6 py-2 rounded-full"
        >
          <Text className="text-white font-semibold">Tagasi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isFav = favorites.includes(company.id);

  // Helper for Link Icons
  const getLinkIcon = (type: string) => {
    switch (type) {
      case "linkedin":
        return "linkedin";
      case "briefcase":
        return "briefcase";
      default:
        return "globe";
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* NAVIGATION HEADER (White background, Dark icons) */}
      <SafeAreaView className="bg-white z-10">
        <View className="flex-row justify-between items-center px-4 py-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
          >
            <Feather name="arrow-left" size={24} color="#1F2937" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleFavorite(company.id)}
            className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
          >
            <MaterialCommunityIcons
              name={isFav ? "heart" : "heart-outline"}
              size={24}
              color={isFav ? "#EF4444" : "#1F2937"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* CONTENT SCROLL */}
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-2">
          {/* HEADER SECTION: Name Left, Logo Right */}
          <View className="mb-6">
            <View className="flex-row justify-between items-start mb-2">
              {/* Left Side: Info */}
              <View className="flex-1 mr-4">
                <Text className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                  {company.name}
                </Text>

                <View className="flex-row flex-wrap items-center gap-2 mb-3">
                  {company.industries.map((ind) => (
                    <View
                      key={ind}
                      className="bg-blue-50 px-2.5 py-1 rounded-md"
                    >
                      <Text className="text-blue-700 text-xs font-medium">
                        {INDUSTRY_TRANSLATIONS[lang][
                          ind as keyof (typeof INDUSTRY_TRANSLATIONS)["en"]
                        ] || ind}
                      </Text>
                    </View>
                  ))}
                  {company.boothCode && (
                    <View className="bg-green-50 px-2.5 py-1 rounded-md border border-green-100">
                      <Text className="text-green-700 text-xs font-semibold">
                        Boks {company.boothCode}
                      </Text>
                    </View>
                  )}
                </View>

                {/* Hiring Types */}
                <View className="flex-row flex-wrap gap-2">
                  {company.hiringTypes.map((type) => (
                    <View
                      key={type}
                      className="flex-row items-center border border-gray-200 px-3 py-1.5 rounded-full"
                    >
                      <Feather name="check" size={12} color="#1E66FF" />
                      <Text className="ml-1.5 text-xs text-gray-700 font-medium">
                        {HIRING_TRANSLATIONS[lang][
                          type as keyof (typeof HIRING_TRANSLATIONS)["en"]
                        ] || type}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Right Side: Logo Box */}
              <View className="w-20 h-20 bg-white border border-gray-100 rounded-2xl items-center justify-center shadow-sm p-1">
                {company.localLogo ? (
                  <Image
                    source={company.localLogo}
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                ) : (
                  <Text className="text-2xl font-bold text-gray-300">
                    {company.initials}
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View className="h-[1px] bg-gray-100 mb-6" />

          {/* ABOUT SECTION */}
          <Text className="text-lg font-bold text-gray-900 mb-2">Meist</Text>
          <Text className="text-base text-gray-600 leading-6 mb-6">
            {company.description[lang]}
            {company.about?.[lang] ? `\n\n${company.about[lang]}` : ""}
          </Text>

          {/* LINKS SECTION */}
          {company.links && company.links.length > 0 && (
            <View className="mb-8">
              <Text className="text-lg font-bold text-gray-900 mb-3">
                Kontaktid ja lingid
              </Text>
              <View className="gap-3">
                {company.links.map((link, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => Linking.openURL(link.url)}
                    className="flex-row items-center bg-gray-50 p-4 rounded-xl active:bg-gray-100"
                  >
                    <View className="w-10 h-10 bg-white items-center justify-center rounded-full shadow-sm mr-3">
                      <Feather
                        name={getLinkIcon(link.icon || "globe") as any}
                        size={20}
                        color="#1E66FF"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        {link.label}
                      </Text>
                      <Text
                        className="text-base font-semibold text-gray-900"
                        numberOfLines={1}
                      >
                        {link.url
                          .replace(/^https?:\/\//, "")
                          .replace(/\/$/, "")}
                      </Text>
                    </View>
                    <Feather name="external-link" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* EVENTS / FIRMAKÜLASTUS SECTION */}
          {events.length > 0 && (
            <View>
              <Text className="text-lg font-bold text-gray-900 mb-3">
                Üritused ja Firmakülastused
              </Text>
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isAdded={scheduledEventIds.includes(event.id)}
                  onToggle={() => {
                    if (scheduledEventIds.includes(event.id)) {
                      removeFromSchedule(event.id);
                    } else {
                      addToSchedule(event.id);
                    }
                  }}
                />
              ))}
            </View>
          )}
        </View>

        <View className="w-full px-6 mt-2 mb-4">
          <TouchableOpacity
            className="flex-row items-center justify-center w-full bg-blue-600 py-3.5 rounded-2xl shadow-sm active:bg-blue-700"
            onPress={() => {
              if (!company.boothCode) return;
              router.push({
                pathname: "/(tabs)/map",
                params: { boothCode: company.boothCode },
              });
            }}
          >
            <Feather name="map" size={18} color="white" />
            <Text className="ml-2 text-white font-semibold text-base">
              Näita kaardil
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Simple Event Component
function EventCard({
  event,
  isAdded,
  onToggle,
}: {
  event: CompanyEvent;
  isAdded: boolean;
  onToggle: () => void;
}) {
  // Format time (e.g. 10:00 - 11:30)
  const start = new Date(event.startISO);
  const end = event.endISO ? new Date(event.endISO) : null;

  const timeString =
    `${start.getHours()}:${String(start.getMinutes()).padStart(2, "0")}` +
    (end
      ? ` - ${end.getHours()}:${String(end.getMinutes()).padStart(2, "0")}`
      : "");

  // Format date (e.g. 12. märts)
  const dateString = start.toLocaleDateString("et-EE", {
    month: "long",
    day: "numeric",
  });

  return (
    <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <View className="bg-blue-50 px-2 py-1 rounded-md">
          <Text className="text-blue-700 text-xs font-bold uppercase">
            {event.locationText}
          </Text>
        </View>
        <Text className="text-gray-500 text-xs font-medium">{dateString}</Text>
      </View>

      <Text className="text-lg font-bold text-gray-900 mb-1">
        {event.title}
      </Text>

      <View className="flex-row items-center mb-4">
        <Feather name="clock" size={14} color="#6B7280" />
        <Text className="text-gray-500 text-sm ml-1.5">{timeString}</Text>
      </View>

      <TouchableOpacity
        onPress={onToggle}
        className={`flex-row items-center justify-center py-2.5 rounded-xl border ${
          isAdded
            ? "bg-transparent border-gray-300"
            : "bg-blue-600 border-blue-600"
        }`}
      >
        <Feather
          name={isAdded ? "check" : "plus"}
          size={18}
          color={isAdded ? "#374151" : "white"}
        />
        <Text
          className={`ml-2 font-semibold ${
            isAdded ? "text-gray-700" : "text-white"
          }`}
        >
          {isAdded ? "Minu kavas" : "Lisa kavasse"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
