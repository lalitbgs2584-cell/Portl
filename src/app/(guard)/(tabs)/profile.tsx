import { DrawerMenuItem } from '@/components/guard/DrawerMenuItem';
import { useTheme } from '@/store/useTheme';
import { router } from 'expo-router';
import React from 'react';
import {  ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// TODO: replace with real session data
const CURRENT_GUARD = { name: 'Arjun Singh', gate: 'Gate 2', status: 'Active' };

export default function ProfileScreen() {
  const { colors, radius } = useTheme();
  const initials = CURRENT_GUARD.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

  const handleDutyHistory = () => router.push('./shift');

  const handleLogout = () => {
    // TODO: supabase.auth.signOut()
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.headerCard}>
          <View style={[styles.avatar, { backgroundColor: colors.secondary, borderRadius: radius['2xl'] }]}>
            <Text style={{ color: colors.secondaryForeground, fontWeight: '600', fontSize: 20 }}>{initials}</Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: '600', color: colors.foreground, marginTop: 10 }}>{CURRENT_GUARD.name}</Text>
          <Text style={{ fontSize: 12, color: colors.mutedForeground }}>{CURRENT_GUARD.gate} · Guard</Text>
        </View>

        <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg }]}>
          <DrawerMenuItem icon="time-outline" label="Duty history" onPress={handleDutyHistory} />
          <DrawerMenuItem icon="log-out-outline" label="Log out" danger onPress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerCard: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  menuCard: { borderWidth: 1, paddingVertical: 4 },
});