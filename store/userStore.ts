// app/state/userStore.ts
import { create } from 'zustand';

// Simple UUID v4 generator (non-crypto). Good enough for anonymous participantId.
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
type UserState = {
  favorites: string[]; // company IDs
  visited: string[]; // company IDs
  schedule: string[]; // event IDs

  toggleFavorite: (companyId: string) => void;
  addVisited: (companyId: string) => void;
  ensureParticipantId: () => string;
  addScan: (companyId: string) => void;
  markScanSynced: (clientId: string) => void;
  // Treasure-hunt specific
  participantId?: string;
  scanned: string[]; // company IDs scanned (local state)
  pendingScans: Array<{ companyId: string; timestamp: number; clientId: string }>;

  addToSchedule: (eventId: string) => void;
  removeFromSchedule: (eventId: string) => void;

  clearAll: () => void;
};

export const useUserStore = create<UserState>((set, get) => ({
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

    ensureParticipantId: () => {
      const s = get();
      if (s.participantId) return s.participantId;
      const id = uuidv4();
      set({ participantId: id });
      return id;
    },

  addVisited: (companyId) =>
    set((s) =>
      s.visited.includes(companyId)
        ? s
        : { visited: [...s.visited, companyId] }
    ),

  addToSchedule: (eventId) =>
    set((s) =>
      s.schedule.includes(eventId)
        ? s
        : { schedule: [...s.schedule, eventId] }
    ),

  removeFromSchedule: (eventId) =>
    set((s) => ({ schedule: s.schedule.filter((id) => id !== eventId) })),

  clearAll: () => set({ favorites: [], visited: [], schedule: [] }),
    addScan: (companyId: string) => {
      const s = get();
      // avoid duplicate scans for same company
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

    markScanSynced: (clientId: string) =>
      set((s) => ({
        pendingScans: s.pendingScans.filter((p) => p.clientId !== clientId),
      })),
}));