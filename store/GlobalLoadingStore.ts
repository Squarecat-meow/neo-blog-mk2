import { create } from 'zustand';

interface IGlobalLoadingStore {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}

export const useGlobalLoadingStore = create<IGlobalLoadingStore>()((set) => ({
  isVisible: false,
  setIsVisible: (by) => set({ isVisible: by }),
}));
