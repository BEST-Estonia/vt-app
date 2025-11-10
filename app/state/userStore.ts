// app/state/userStore.ts
import { create } from 'zustand';

type UserState = {
  favorites: string[]; // company IDs
  visited: string[]; // company IDs
  schedule: string[]; // event IDs

  toggleFavorite: (companyId: string) => void;
  addVisited: (companyId: string) => void;

  addToSchedule: (eventId: string) => void;
  removeFromSchedule: (eventId: string) => void;

  clearAll: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  favorites: [],
  visited: [],
  schedule: [],

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
}));