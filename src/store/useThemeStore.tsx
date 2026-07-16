// store/useThemeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import theme, { ThemeMode, radius } from '@/lib/theme';

type ThemeState = {
  mode: ThemeMode;
  colors: typeof theme.light;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: Appearance.getColorScheme() as ThemeMode ?? 'dark',
      colors: theme[Appearance.getColorScheme() as ThemeMode ?? 'dark'],

      setMode: (mode) => set({ mode, colors: theme[mode] }),

      toggleTheme: () => {
        const next = get().mode === 'light' ? 'dark' : 'light';
        set({ mode: next, colors: theme[next] });
      },
    }),
    {
      name: 'portl-theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ mode: state.mode }),
      onRehydrateStorage: () => (state) => {
        if (state) state.colors = theme[state.mode];
      },
    }
  )
);

export const themeRadius = radius;