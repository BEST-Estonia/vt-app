// app/state/userStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// Import the paid pool directly
import { treasureHuntCompanies } from "@/data/treasureHuntCompanies";

// Simple UUID generator
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Deterministic Fisher-Yates shuffle using an LCG
function shuffleArrayWithSeed<T>(array: T[], seed: number): T[] {
  const arr = [...array];
  let state = seed || 1;

  const next = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 2 ** 32;
  };

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Deterministic hash for stable per-user selection
function hashStringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash || 1;
}

type UserState = {
  favorites: string[];
  visited: string[];
  schedule: string[];
  participantId?: string;
  language: "et" | "en";
  scanned: string[];
  pendingScans: { companyId: string; timestamp: number; clientId: string }[];

  // The list of 12 specific companies for this user
  activeHuntIds: string[];

  toggleFavorite: (companyId: string) => void;
  addVisited: (companyId: string) => void;
  addToSchedule: (eventId: string) => void;
  removeFromSchedule: (eventId: string) => void;
  ensureParticipantId: () => string;
  addScan: (companyId: string) => void;
  markScanSynced: (clientId: string) => void;
  clearAll: () => void;
  setLanguage: (lang: "et" | "en") => void;

  // Action to generate the list
  initTreasureHunt: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      favorites: [],
      visited: [],
      schedule: [],
      participantId: undefined,
      language: "et",
      scanned: [],
      pendingScans: [],
      activeHuntIds: [], // Starts empty

      toggleFavorite: (companyId) =>
        set((s) => ({
          favorites: s.favorites.includes(companyId)
            ? s.favorites.filter((id) => id !== companyId)
            : [...s.favorites, companyId],
        })),

      addVisited: (companyId) =>
        set((s) =>
          s.visited.includes(companyId)
            ? s
            : { visited: [...s.visited, companyId] },
        ),

      addToSchedule: (eventId) =>
        set((s) =>
          s.schedule.includes(eventId)
            ? s
            : { schedule: [...s.schedule, eventId] },
        ),

      removeFromSchedule: (eventId) =>
        set((s) => ({ schedule: s.schedule.filter((id) => id !== eventId) })),

      ensureParticipantId: () => {
        const s = get();
        if (s.participantId) return s.participantId;
        const id = uuidv4();
        set({ participantId: id });
        return id;
      },

      addScan: (companyId) => {
        const s = get();
        if (s.scanned.includes(companyId)) return;
        const clientId = uuidv4();
        const timestamp = Date.now();
        set((state) => ({
          scanned: [...state.scanned, companyId],
          pendingScans: [
            ...state.pendingScans,
            { companyId, timestamp, clientId },
          ],
        }));
      },

      markScanSynced: (clientId) =>
        set((s) => ({
          pendingScans: s.pendingScans.filter((p) => p.clientId !== clientId),
        })),

      // THE MAGIC LOGIC
      initTreasureHunt: () => {
        const s = get();
        // If we already have a list, DO NOT change it.
        // This ensures the user keeps the same companies on restart.
        // 1. Get pool directly from the treasureHuntCompanies file
        const pool = treasureHuntCompanies;

        const desiredCount = Math.min(10, pool.length);

        if (s.activeHuntIds.length > 0) {
          const poolIds = new Set(pool.map((c) => c.id));
          const hasInvalidIds = s.activeHuntIds.some((id) => !poolIds.has(id));
          const wrongCount = s.activeHuntIds.length !== desiredCount;
          if (!hasInvalidIds && !wrongCount) return;
        }

        if (pool.length === 0) {
          set({ activeHuntIds: [] });
          return;
        }

        // Ensure user has a stable participant id
        const participantId = s.participantId || get().ensureParticipantId();

        // Deterministic selection based on participantId so users get
        // a stable list and the distribution is approximately uniform.
        const seed = hashStringToSeed(participantId);
        const shuffled = shuffleArrayWithSeed(pool, seed);
        const selected = shuffled.slice(0, desiredCount).map((c) => c.id);

        set({ activeHuntIds: selected });
      },

      clearAll: () =>
        set({
          favorites: [],
          visited: [],
          schedule: [],
        }),
      setLanguage: (lang: "et" | "en") => {
        set({ language: lang });
      },
    }),
    {
      name: "vt-app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
