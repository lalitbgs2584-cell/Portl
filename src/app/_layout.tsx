import '../global.css'
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

export default function RootLayout() {
  const background = useThemeStore((s) => s.colors.background);

  // Keep the Android window background in sync with the theme so it never
  // flashes white when the keyboard opens/closes or views resize.
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(background);
  }, [background]);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          // Match the native screen background to the theme on Android
          contentStyle: { backgroundColor: background },
        }}
      />
    </SafeAreaProvider>
  );
}
