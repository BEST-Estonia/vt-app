// app/components/FilterSheet.tsx
import { useI18n } from "@/lib/i18n";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

type SortMode = "A-Z" | "Relevance";

type Props = {
  visible: boolean;
  onClose: () => void;
  allIndustries: string[];
  allHiring: string[];
  selectedIndustries: string[];
  setSelectedIndustries: (v: string[]) => void;
  selectedHiring: string[];
  setSelectedHiring: (v: string[]) => void;
  sortMode: SortMode;
  setSortMode: (v: SortMode) => void;
  onClearAll: () => void;
  onApply: () => void;
};

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip,
        selected ? styles.chipSelected : styles.chipDefault,
        { borderColor: selected ? "#1E66FF" : "#D1D5DB" },
      ]}
    >
      <Text
        style={[styles.chipText, { color: selected ? "#1E66FF" : "#374151" }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function FilterSheet({
  visible,
  onClose,
  allIndustries,
  allHiring,
  selectedIndustries,
  setSelectedIndustries,
  selectedHiring,
  setSelectedHiring,
  sortMode,
  setSortMode,
  onClearAll,
  onApply,
}: Props) {
  const { lang } = useI18n();

  if (!visible) return null;

  const toggle = (
    arr: string[],
    setArr: (v: string[]) => void,
    val: string,
  ) => {
    if (arr.includes(val)) setArr(arr.filter((x) => x !== val));
    else setArr([...arr, val]);
  };

  return (
    <View style={styles.overlay}>
      <SafeAreaView edges={["top"]} style={styles.headerSafe}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity onPress={onClose} hitSlop={12}>
            <Feather name="x" size={22} color="#111827" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Industry</Text>
        <View style={styles.rowWrap}>
          {allIndustries.map((ind) => (
            <Chip
              key={ind}
              label={
                INDUSTRY_TRANSLATIONS[lang][
                  ind as keyof (typeof INDUSTRY_TRANSLATIONS)["en"]
                ] || ind
              }
              selected={selectedIndustries.includes(ind)}
              onPress={() =>
                toggle(selectedIndustries, setSelectedIndustries, ind)
              }
            />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Hiring Type
        </Text>
        <View style={styles.rowWrap}>
          {allHiring.map((h) => (
            <Chip
              key={h}
              label={
                HIRING_TRANSLATIONS[lang][
                  h as keyof (typeof HIRING_TRANSLATIONS)["en"]
                ] || h
              }
              selected={selectedHiring.includes(h)}
              onPress={() => toggle(selectedHiring, setSelectedHiring, h)}
            />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Sort By</Text>
        <View style={styles.row}>
          {(["A-Z", "Relevance"] as SortMode[]).map((mode) => {
            const active = sortMode === mode;
            return (
              <TouchableOpacity
                key={mode}
                onPress={() => setSortMode(mode)}
                activeOpacity={0.8}
                style={[
                  styles.sortBtn,
                  { borderColor: active ? "#1E66FF" : "#D1D5DB" },
                  active ? styles.sortActive : styles.sortDefault,
                ]}
              >
                <Text
                  style={[
                    styles.sortText,
                    { color: active ? "#1E66FF" : "#374151" },
                  ]}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.footerSafe}>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={onClearAll}
            activeOpacity={0.9}
            style={styles.clearBtn}
          >
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onApply();
              onClose();
            }}
            activeOpacity={0.9}
            style={styles.applyBtn}
          >
            <Text style={styles.applyText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    inset: 0 as unknown as number,
    backgroundColor: "#FFFFFF",
  },
  headerSafe: { backgroundColor: "#FFFFFF" },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  content: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 8 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  rowWrap: { flexDirection: "row", flexWrap: "wrap" },
  row: { flexDirection: "row" },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
  },
  chipText: { fontSize: 13, fontWeight: "600" },
  chipDefault: {},
  chipSelected: { backgroundColor: "#EFF6FF" },
  sortBtn: {
    paddingHorizontal: 16, // give a bit more breathing room
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 72, // ensures "A‑Z" fits comfortably on small widths
  },
  sortDefault: { backgroundColor: "#FFFFFF" },
  sortActive: { backgroundColor: "#EFF6FF" },
  sortText: { fontSize: 13, fontWeight: "600" },
  footerSafe: { backgroundColor: "#FFFFFF" },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopColor: "#E5E7EB",
    borderTopWidth: 1,
    gap: 12,
  },
  clearBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1E66FF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  clearText: { color: "#1E66FF", fontWeight: "700", fontSize: 15 },
  applyBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E66FF",
  },
  applyText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
});
