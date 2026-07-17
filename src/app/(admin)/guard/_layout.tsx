import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '@/store/useTheme';


export default function GuardsStackLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.foreground,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Guards' }} />
      <Stack.Screen name="add" options={{ title: 'Add guard' }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
