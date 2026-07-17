import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '@/store/useTheme';

export default function GuardDetailLayout() {
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
      {/* tabs screen renders the nested tab navigator (Profile / Duty / Attendance) */}
      <Stack.Screen name="tabs" options={{ headerShown: false }} />
      <Stack.Screen name="performance" options={{ title: 'Performance' }} />
      <Stack.Screen name="logs" options={{ title: 'Activity log' }} />
    </Stack>
  );
}
