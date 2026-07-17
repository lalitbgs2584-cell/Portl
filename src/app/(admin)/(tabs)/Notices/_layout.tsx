import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '@/store/useTheme';

export default function NoticesStackLayout() {
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
      <Stack.Screen name="index" options={{ title: 'Notices' }} />
      <Stack.Screen name="list" options={{ title: 'All notices' }} />
      <Stack.Screen name="create" options={{ title: 'Create notice' }} />
      <Stack.Screen name="[noticeId]/index" options={{ title: 'Notice details' }} />
      <Stack.Screen name="[noticeId]/edit" options={{ title: 'Edit notice' }} />
    </Stack>
  );
}