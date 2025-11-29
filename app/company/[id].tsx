// app/company/[id].tsx
import {
  companiesSeed,
  companyEvents,
  type Company,
  type CompanyEvent,
  type CompanyLinkIcon,
} from '@/data/companies';
import { useUserStore } from '@/store/userStore';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView as SafeTopArea,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function CompanyProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Read and write from the shared store
  const {
    favorites,
    addVisited,
    toggleFavorite,
    schedule: scheduledEventIds,
    addToSchedule,
    removeFromSchedule,
  } = useUserStore();

  // Resolve the company and events
  const company: Company | undefined = useMemo(
    () => companiesSeed.find((c) => c.id === id),
    [id]
  );

  const events: CompanyEvent[] = useMemo(
    () => companyEvents.filter((e) => e.companyId === id),
    [id]
  );

  // Mark visited when viewing a company
  React.useEffect(() => {
    if (id) addVisited(id);
  }, [addVisited, id]);

  if (!company) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-600">Company not found.</Text>
        <TouchableOpacity className="mt-3" onPress={() => router.back()}>
          <Text className="text-blue-600 font-semibold">Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const isFavorite = favorites.includes(company.id);

  const openUrl = async (url?: string) => {
    if (!url) return;
    try {
      await Linking.openURL(url);
    } catch {}
  };

  const { width } = Dimensions.get('window');
  const isNarrow = width < 360;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <SafeTopArea edges={['top']} style={{ backgroundColor: '#FFFFFF' }}>
        <View className="flex-row items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
          <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
            <Feather name="arrow-left" size={22} color="#111827" />
          </TouchableOpacity>
          <Text
            className="text-[18px] font-semibold text-gray-900"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ maxWidth: '80%', paddingRight: 4 }}
          >
            {company.name}
          </Text>
          <View style={{ width: 22 }} />
        </View>
      </SafeTopArea>

      {/* Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: Math.max(insets.bottom + 16, 28),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header card */}
        <View className="rounded-2xl border border-gray-200 p-4 bg-white">
          <View className="flex-row">
            <View className="mr-3">
              <View
                className="h-14 w-14 rounded-xl overflow-hidden bg-white items-center justify-center"
                style={{ borderWidth: 1, borderColor: '#E5E7EB', padding: 4 }}
              >
                {company.localLogo ? (
                  <Image
                    source={company.localLogo}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                  />
                ) : (
                  <Text className="text-[16px] font-bold text-blue-700">
                    {company.initials}
                  </Text>
                )}
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-[18px] font-bold text-gray-900 pr-1">
                {company.name}
              </Text>
              <Text className="text-[14px] text-gray-700 mt-1 pr-1">
                {company.description}
              </Text>

              <View className="flex-row items-center mt-2">
                <Feather name="map-pin" size={14} color="#6B7280" />
                <Text className="ml-1 text-[13px] text-gray-600 pr-1">
                  {company.boothCode ? `Booth ${company.boothCode}` : 'Booth TBA'}
                </Text>
              </View>

              {/* Chips */}
              <View className="flex-row flex-wrap mt-2">
                {company.industries.map((i, idx) => (
                  <View
                    key={`ind-${idx}`}
                    className="mr-2 mb-2 rounded-full bg-blue-50 px-2.5 py-1"
                  >
                    <Text className="text-[12px] font-medium text-blue-700">
                      {i}
                    </Text>
                  </View>
                ))}
              </View>
              <View className="flex-row flex-wrap">
                {company.hiringTypes.map((h, idx) => (
                  <View
                    key={`hire-${idx}`}
                    className="mr-2 mb-2 rounded-full bg-gray-100 px-2.5 py-1"
                  >
                    <Text className="text-[12px] font-medium text-gray-700">
                      {h}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Actions row */}
          <View className="mt-4 -mx-1 flex-row">
            <ActionButton
              icon={<Feather name="star" size={18} color="#1E66FF" />}
              label={isFavorite ? 'Saved' : 'Save'}
              onPress={() => toggleFavorite(company.id)}
            />
            <ActionButton
              icon={<Feather name="navigation" size={18} color="#1E66FF" />}
              label="Navigate"
              onPress={() => {
                // TODO: navigate to Map and highlight booth
              }}
            />
            <ActionButton
              icon={
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={18}
                  color="#1E66FF"
                />
              }
              label="Scan"
              onPress={() => {
                // TODO: open scanner
              }}
            />
          </View>
        </View>

        {/* About */}
        {company.about && (
          <Section title="About">
            <Text className="text-[14px] leading-6 text-gray-700 pr-1">
              {company.about}
            </Text>
          </Section>
        )}

        {/* Links */}
        {company.links?.length ? (
          <Section title="Links">
            <View className="space-y-3">
              {company.links.map((l, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => openUrl(l.url)}
                  className="h-12 px-3 rounded-xl border border-gray-200 flex-row items-center justify-between bg-white"
                  activeOpacity={0.85}
                >
                  <View className="flex-row items-center">
                    <LinkIcon name={l.icon} />
                    <Text className="ml-8 text-[14px] text-gray-800 pr-1">
                      {l.label}
                    </Text>
                  </View>
                  <Feather name="external-link" size={16} color="#6B7280" />
                </TouchableOpacity>
              ))}
            </View>
          </Section>
        ) : null}

        {/* Events & Sessions with Add/Added behavior */}
        {events.length ? (
          <Section title="Events & Sessions">
            {events.map((e) => {
              const added = scheduledEventIds.includes(e.id);
              return (
                <EventCard
                  key={e.id}
                  event={e}
                  added={added}
                  onAdd={() => addToSchedule(e.id)}
                  onRemove={() => removeFromSchedule(e.id)}
                />
              );
            })}
          </Section>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({
  title,
  children,
  containerClass,
}: {
  title: string;
  children: React.ReactNode;
  containerClass?: string;
}) {
  return (
    <View className={`mt-6 ${containerClass ?? ''}`}>
      <Text className="text-[16px] font-semibold text-gray-900 mb-2">
        {title}
      </Text>
      {children}
    </View>
  );
}

function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <View className="flex-1 px-1">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        className="h-12 border border-blue-500 rounded-xl items-center justify-center bg-white"
        style={{ paddingHorizontal: 10, minWidth: 0 }}
      >
        <View className="flex-row items-center">
          {icon}
          <Text
            className="ml-2 text-[14px] font-semibold text-blue-600"
            numberOfLines={1}
            style={{ paddingRight: 2 }}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function LinkIcon({ name }: { name?: CompanyLinkIcon }) {
  if (name === 'linkedin') return <Feather name="linkedin" size={16} color="#6B7280" />;
  if (name === 'briefcase') return <Feather name="briefcase" size={16} color="#6B7280" />;
  return <Feather name="globe" size={16} color="#6B7280" />;
}

function EventCard({
  event,
  added,
  onAdd,
  onRemove,
}: {
  event: CompanyEvent;
  added: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const start = new Date(event.startISO);
  const end = event.endISO ? new Date(event.endISO) : undefined;
  const pad = (n: number) => n.toString().padStart(2, '0');
  const time =
    end && !isNaN(end.getTime())
      ? `${pad(start.getHours())}:${pad(start.getMinutes())} - ${pad(
          end.getHours()
        )}:${pad(end.getMinutes())}`
      : `${pad(start.getHours())}:${pad(start.getMinutes())}`;

  return (
    <View className="mb-3 rounded-2xl border border-gray-200 bg-white">
      <View className="p-4">
        <View className="flex-row items-center mb-2">
          <View className="h-7 w-7 rounded-lg bg-blue-50 items-center justify-center mr-2">
            <Feather name="calendar" size={16} color="#1E66FF" />
          </View>
          <Text className="text-[15px] font-semibold text-gray-900 pr-1">
            {event.title}
          </Text>
        </View>

        <View className="flex-row items-center mb-1">
          <Feather name="clock" size={14} color="#6B7280" />
          <Text className="ml-1 text-[13px] text-gray-700">{time}</Text>
        </View>
        <View className="flex-row items-center">
          <Feather name="map-pin" size={14} color="#6B7280" />
          <Text className="ml-1 text-[13px] text-gray-700">
            {event.locationText}
          </Text>
        </View>

        {added ? (
          <TouchableOpacity
            className="mt-3 h-11 rounded-xl bg-gray-100 items-center justify-center border border-gray-300"
            activeOpacity={0.9}
            onPress={onRemove}
          >
            <Text className="text-gray-700 font-semibold">
              Added • Tap to remove
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="mt-3 h-11 rounded-xl bg-[#1E66FF] items-center justify-center"
            activeOpacity={0.9}
            onPress={onAdd}
          >
            <Text className="text-white font-semibold">Add to Schedule</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}