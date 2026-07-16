import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRole } from '@/constants/user.constants';

type RoleState = {
  role: UserRole | null;
  setRole: (role: UserRole) => void;
};

export const useRoleStore = create<RoleState>()(
  persist(
    (set, get) => ({
      role: null,
      setRole: (role) => set({ role }),
    }),
    {
      name: 'portl-role-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ role: state.role }),
    }
  )
);
