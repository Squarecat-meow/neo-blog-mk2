import { create } from 'zustand';

interface IGlobalModalStore {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  content: string | null;
  setContent: (content: string) => void;
}

export const useGlobalModalStore = create<IGlobalModalStore>()((set) => ({
  isVisible: false,
  setIsVisible: (by) =>
    set(() => ({
      isVisible: by,
    })),
  content: null,
  setContent: (by) =>
    set(() => ({
      content: by,
    })),
}));
