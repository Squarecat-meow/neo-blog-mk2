import { IUser } from '@/types/UserType';
import { create } from 'zustand';

interface IUserStore {
  currentUser: IUser | null;
  addCurrentUser: (user: IUser) => void;
}

export const useUserStore = create<IUserStore>()((set) => ({
  currentUser: null,
  addCurrentUser: (by) => set(() => ({ currentUser: by })),
}));
