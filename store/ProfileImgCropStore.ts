import { create } from 'zustand';

interface IProfileImgCropper {
  currentImg: string | null;
  changeCurrentImg: (img: string | null) => void;
}

export const useProfileImgCropperStore = create<IProfileImgCropper>()(
  (set, get) => ({
    currentImg: null,
    changeCurrentImg: (by) => {
      const prevUrl = get().currentImg;
      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }
      set({ currentImg: by });
    },
  }),
);
