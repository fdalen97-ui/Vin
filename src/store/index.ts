import { create } from "zustand";
import type { WineType } from "@/types";

interface WineFilters {
  search: string;
  type: WineType | null;
  region: string | null;
  minRating: number | null;
  maxPrice: number | null;
}

interface AppStore {
  // Wine filters
  filters: WineFilters;
  setFilters: (filters: Partial<WineFilters>) => void;
  resetFilters: () => void;

  // UI state
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const defaultFilters: WineFilters = {
  search: "",
  type: null,
  region: null,
  minRating: null,
  maxPrice: null,
};

export const useAppStore = create<AppStore>((set) => ({
  filters: defaultFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: defaultFilters }),

  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
