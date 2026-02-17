import CompanyLogoLightbox from "@/components/CompanyLogoLightbox";
import LanguageSheet from "@/components/LanguageSheet";
import {
    companiesSeed,
    companyEvents,
    type Company,
    type CompanyEvent,
} from "@/data/companies";
import { useI18n } from "@/lib/i18n";
import { useUserStore } from "@/store/userStore";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Linking,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

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

export default function MyFairScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t, lang } = useI18n();
  const [languageOpen, setLanguageOpen] = React.useState(false);

  const { favorites, visited, schedule, clearAll } = useUserStore();

  const favCompanies: Company[] = React.useMemo(
    () =>
      favorites
        .map((id) => companiesSeed.find((c) => c.id === id))
        .filter(Boolean) as Company[],
    [favorites],
  );

  const visitedCompanies: Company[] = React.useMemo(
    () =>
      visited
        .map((id) => companiesSeed.find((c) => c.id === id))
        .filter(Boolean) as Company[],
    [visited],
  );

  const scheduleEvents: CompanyEvent[] = React.useMemo(
    () =>
      schedule
        .map((id) => companyEvents.find((e) => e.id === id))
        .filter(Boolean) as CompanyEvent[],
    [schedule],
  );

  const goExploreCompanies = () => {
    router.push("/(tabs)/search");
  };

  const goBrowseCompanies = () => {
    router.push("/(tabs)/search");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      edges={["top", "bottom"]}
    >
      <StatusBar barStyle="dark-content" />
      {/* --- HEADER --- */}
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-gray-200">
        <View className="flex-row items-center">
          <Image
            source={require("./_assets/vt-logo.png")}
            style={{ width: 28, height: 28, marginRight: 8 }}
            resizeMode="contain"
          />
          <Text className="text-[22px] font-bold text-gray-900">
            {t("header.myFair")}
          </Text>
        </View>
        <TouchableOpacity hitSlop={8} onPress={() => setLanguageOpen(true)}>
          <Feather name="settings" size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: Math.max(insets.bottom + 16, 24),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Favorites */}
        <SectionHeader
          icon={<Feather name="star" size={18} color="#1E66FF" />}
          title={t("myFair.favorites")}
          count={favCompanies.length}
        />
        {favCompanies.length === 0 ? (
          <EmptyState
            icon={<Feather name="star" size={26} color="#9CA3AF" />}
            title={t("myFair.noFavoritesTitle")}
            caption={t("myFair.noFavoritesCaption")}
            cta={t("myFair.exploreCta")}
            onPress={goExploreCompanies}
          />
        ) : (
          <View className="mt-3">
            {favCompanies.map((c) => (
              <CompanyRow
                key={c.id}
                company={c}
                lang={lang}
                onPress={() =>
                  router.push({
                    pathname: "/company/[id]",
                    params: { id: c.id },
                  })
                }
              />
            ))}
          </View>
        )}

        {/* Visited Booths */}
        <SectionHeader
          icon={<Feather name="map-pin" size={18} color="#1E66FF" />}
          title={t("myFair.visitedBooths")}
          count={visitedCompanies.length}
          containerClass="mt-6"
        />
        {visitedCompanies.length === 0 ? (
          <EmptyState
            icon={<Feather name="map" size={26} color="#9CA3AF" />}
            title={t("myFair.noVisitsTitle")}
            caption={t("myFair.noVisitsCaption")}
            cta={t("myFair.exploreCta")}
            onPress={goExploreCompanies}
          />
        ) : (
          <View className="mt-3">
            {visitedCompanies.map((c) => (
              <CompanyRow
                key={c.id}
                company={c}
                lang={lang}
                onPress={() =>
                  router.push({
                    pathname: "/company/[id]",
                    params: { id: c.id },
                  })
                }
              />
            ))}
          </View>
        )}

        {/* My Schedule */}
        <SectionHeader
          icon={<Feather name="calendar" size={18} color="#1E66FF" />}
          title={t("myFair.mySchedule")}
          count={scheduleEvents.length}
          containerClass="mt-6"
        />
        {scheduleEvents.length === 0 ? (
          <EmptyState
            icon={<Feather name="calendar" size={26} color="#9CA3AF" />}
            title={t("myFair.noEventsTitle")}
            caption={t("myFair.noEventsCaption")}
            cta={t("myFair.browseEventsCta")}
            onPress={goBrowseCompanies}
          />
        ) : (
          <View className="mt-3">
            {scheduleEvents.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </View>
        )}

        {/* Footer: Clear All Data */}
        <View className="mt-8 w-full">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={clearAll}
            className="h-12 w-full rounded-xl border border-blue-500 items-center justify-center bg-white"
          >
            <View className="flex-row items-center">
              <Feather name="trash-2" size={16} color="#1E66FF" />
              <Text className="ml-2 text-[15px] font-semibold text-blue-600">
                {t("myFair.clearAllData")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LanguageSheet
        visible={languageOpen}
        onClose={() => setLanguageOpen(false)}
      />
    </SafeAreaView>
  );
}

function SectionHeader({
  icon,
  title,
  count,
  containerClass,
}: {
  icon: React.ReactNode;
  title: string;
  count?: number;
  containerClass?: string;
}) {
  return (
    <View className={`flex-row items-center ${containerClass ?? ""}`}>
      {icon}
      <Text
        className="ml-2 text-[18px] font-semibold text-gray-900 flex-1"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      {typeof count === "number" && (
        <Text className="ml-1.5 text-[14px] text-gray-500">({count})</Text>
      )}
    </View>
  );
}

function EmptyState({
  icon,
  title,
  caption,
  cta,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  caption: string;
  cta: string;
  onPress: () => void;
}) {
  return (
    <View className="items-center justify-center py-8 w-full">
      <View className="h-16 w-16 rounded-full bg-gray-100 items-center justify-center mb-3">
        {icon}
      </View>
      <Text className="text-[16px] font-semibold text-gray-900">{title}</Text>
      <Text className="mt-2 text-[14px] text-gray-600 text-center px-6">
        {caption}
      </Text>

      {/* Full-width CTA aligned to content width */}
      <View className="mt-4 w-full">
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          className="h-12 w-full rounded-xl bg-[#1E66FF] items-center justify-center"
        >
          <Text
            className="text-white font-semibold text-[15px] text-center w-full"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {cta}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CompanyRow({
  company,
  onPress,
  lang,
}: {
  company: Company;
  onPress: () => void;
  lang: "en" | "et";
}) {
  const [logoOpen, setLogoOpen] = React.useState(false);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        className="w-full rounded-2xl border border-gray-200 bg-white mb-3"
      >
        <View className="p-4">
          <View className="flex-row">
            <View className="mr-3">
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setLogoOpen(true)}
                className="h-12 w-12 rounded-xl overflow-hidden items-center justify-center border border-gray-200 bg-white"
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
            </View>
            <View className="flex-1">
              <Text className="text-[16px] font-semibold text-gray-900">
                {company.name}
              </Text>
              <Text className="text-[14px] text-gray-700 mt-1">
                {company.description[lang]}
              </Text>
              <View className="flex-row flex-wrap mt-2">
                {company.industries.slice(0, 2).map((i, idx) => (
                  <View
                    key={`ind-${idx}`}
                    className="mr-2 mb-2 rounded-full bg-blue-50 px-2.5 py-1"
                  >
                    <Text className="text-[12px] font-medium text-blue-700">
                      {INDUSTRY_TRANSLATIONS[lang][
                        i as keyof (typeof INDUSTRY_TRANSLATIONS)["en"]
                      ] || i}
                    </Text>
                  </View>
                ))}
              </View>
              <View className="flex-row flex-wrap">
                {company.hiringTypes.slice(0, 3).map((h, idx) => (
                  <View
                    key={`hire-${idx}`}
                    className="mr-2 mb-2 rounded-full bg-gray-100 px-2.5 py-1"
                  >
                    <Text className="text-[12px] font-medium text-gray-700">
                      {HIRING_TRANSLATIONS[lang][
                        h as keyof (typeof HIRING_TRANSLATIONS)["en"]
                      ] || h}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <CompanyLogoLightbox
        visible={logoOpen}
        onClose={() => setLogoOpen(false)}
        logoSource={company.localLogo}
        fallbackText={company.initials}
      />
    </>
  );
}

function EventRow({ event }: { event: CompanyEvent }) {
  const start = event.startISO ? new Date(event.startISO) : undefined;
  const end = event.endISO ? new Date(event.endISO) : undefined;
  const pad = (n: number) => n.toString().padStart(2, "0");
  const time =
    start && end && !isNaN(end.getTime())
      ? `${pad(start.getHours())}:${pad(start.getMinutes())} - ${pad(
          end.getHours(),
        )}:${pad(end.getMinutes())}`
      : start
        ? `${pad(start.getHours())}:${pad(start.getMinutes())}`
        : undefined;

  return (
    <View className="w-full rounded-2xl border border-gray-200 bg-white mb-3">
      <View className="p-4">
        <View className="flex-row items-center">
          <View className="h-7 w-7 rounded-lg bg-blue-50 items-center justify-center mr-2">
            <Feather name="calendar" size={16} color="#1E66FF" />
          </View>
          <Text className="text-[16px] font-semibold text-gray-900">
            {event.title}
          </Text>
        </View>
        {time ? (
          <View className="flex-row items-center mt-2">
            <Feather name="clock" size={14} color="#6B7280" />
            <Text className="ml-1 text-[13px] text-gray-700">{time}</Text>
          </View>
        ) : (
          <View className="flex-row items-center mt-2">
            <Feather name="clock" size={14} color="#6B7280" />
            <Text className="ml-1 text-[13px] text-gray-700">
              Kuupäev täpsustamisel
            </Text>
          </View>
        )}
        <View className="flex-row items-center">
          <Feather name="map-pin" size={14} color="#6B7280" />
          <Text className="ml-1 text-[13px] text-gray-700">
            {event.locationText}
          </Text>
        </View>
        {event.registrationUrl ? (
          <TouchableOpacity
            onPress={() => Linking.openURL(event.registrationUrl!)}
            className="mt-3 flex-row items-center justify-center rounded-lg border border-blue-200 bg-blue-50 py-2"
          >
            <Feather name="external-link" size={14} color="#1E66FF" />
            <Text className="ml-2 text-[13px] font-semibold text-blue-700">
              Registreeru
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
