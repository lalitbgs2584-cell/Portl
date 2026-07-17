import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '@/store/useTheme';

export default function GuardDetailTabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.foreground,
        headerShadowVisible: false,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
      }}
    >
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="duty" options={{ title: 'Duty' }} />
      <Tabs.Screen name="attendance" options={{ title: 'Attendance' }} />
    </Tabs>
  );
}
