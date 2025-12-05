import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Simple UUID generator
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

type UserState = {
  favorites: string[];
  visited: string[];
  schedule: string[];
  participantId?: string;
  scanned: string[];
  pendingScans: { companyId: string; timestamp: number; clientId: string }[];

  toggleFavorite: (companyId: string) => void;
  addVisited: (companyId: string) => void;
  addToSchedule: (eventId: string) => void;
  removeFromSchedule: (eventId: string) => void;
  ensureParticipantId: () => string;
  addScan: (companyId: string) => void;
  markScanSynced: (clientId: string) => void;
  clearAll: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      favorites: [],
      visited: [],
      schedule: [],
      participantId: undefined,
      scanned: [],
      pendingScans: [],

      toggleFavorite: (companyId) =>
        set((s) => ({
          favorites: s.favorites.includes(companyId)
            ? s.favorites.filter((id) => id !== companyId)
            : [...s.favorites, companyId],
        })),

      addVisited: (companyId) =>
        set((s) =>
          s.visited.includes(companyId) ? s : { visited: [...s.visited, companyId] }
        ),

      addToSchedule: (eventId) =>
        set((s) =>
          s.schedule.includes(eventId) ? s : { schedule: [...s.schedule, eventId] }
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

      clearAll: () =>
        set({
          favorites: [],
          visited: [],
          schedule: [],
          scanned: [],
          pendingScans: [],
          // We usually DO NOT clear participantId so they stay the same user
        }),
    }),
    {
      name: 'vt-app-storage', // unique name for storage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);