import React from 'react';
import { Stack } from 'expo-router';
import { useTheme } from '@/store/useTheme';

export default function ComplaintsStackLayout() {
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
      <Stack.Screen name="index" options={{ title: 'Complaints' }} />
      <Stack.Screen name="[complaintId]/index" options={{ title: 'Complaint details' }} />
    </Stack>
  );
}
