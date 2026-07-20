import { DrawerMenuItem } from '@/components/guard/DrawerMenuItem';
import { useTheme } from '@/store/useTheme';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export type DrawerRoute = 'home' | 'visitors' | 'shift' | 'leave' | 'notifications';

interface Props {
  guardName: string;
  gateLabel: string;
  activeRoute?: DrawerRoute;
  onNavigate: (route: DrawerRoute) => void;
  onLogout: () => void;
}

const MENU: { route: DrawerRoute; icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap; label: string }[] = [
  { route: 'home', icon: 'home-outline', label: 'Home' },
  { route: 'visitors', icon: 'people-outline', label: 'Visitors' },
  { route: 'shift', icon: 'time-outline', label: 'Shift & attendance' },
  { route: 'leave', icon: 'calendar-outline', label: 'Leave' },
  { route: 'notifications', icon: 'notifications-outline', label: 'Notifications' },
];

export function DrawerContent({ guardName, gateLabel, activeRoute, onNavigate, onLogout }: Props) {
  const { colors, radius } = useTheme();
  const initials = guardName.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

  return (
    <View style={{ flex: 1, backgroundColor: colors.card }}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={[styles.avatar, { backgroundColor: colors.secondary, borderRadius: radius['2xl'] }]}>
          <Text style={{ color: colors.secondaryForeground, fontWeight: '600', fontSize: 18 }}>{initials}</Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: '600', color: colors.foreground, marginTop: 10 }}>{guardName}</Text>
        <Text style={{ fontSize: 12, color: colors.mutedForeground }}>{gateLabel}</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 8, paddingTop: 12 }}>
        {MENU.map((item) => (
          <DrawerMenuItem
            key={item.route}
            icon={item.icon}
            label={item.label}
            active={activeRoute === item.route}
            onPress={() => onNavigate(item.route)}
          />
        ))}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <DrawerMenuItem icon="log-out-outline" label="Log out" danger onPress={onLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingVertical: 24, borderBottomWidth: 1 },
  avatar: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  footer: { padding: 8, borderTopWidth: 1, paddingBottom: 20 },
});