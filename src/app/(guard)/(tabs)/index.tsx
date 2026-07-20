import { DashboardStatCard } from '@/components/guard/DashboardStatCard';
import { QuickActionCard } from '@/components/guard/QuickActionCard';
import { useTheme } from '@/store/useTheme';

import { router } from 'expo-router';
import React from 'react';
import {  ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// TODO: replace with real session + Supabase fetch
const CURRENT_GUARD = { name: 'Arjun Singh', gate: 'Gate 2', onDutySince: '8:00 AM' };
const TODAY_STATS = { visitorsToday: 24, pendingApproval: 3 };

export default function DashboardScreen() {
  const { colors, radius } = useTheme();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 12, color: colors.mutedForeground }}>{greeting}</Text>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground, marginBottom: 16 }}>
          {CURRENT_GUARD.name}
        </Text>

        <View style={[styles.dutyCard, { backgroundColor: colors.accent, borderRadius: radius.xl }]}>
          <View>
            <Text style={{ fontSize: 11, color: colors.accentForeground, opacity: 0.8 }}>On duty since</Text>
            <Text style={{ fontSize: 15, fontWeight: '600', color: colors.accentForeground, marginTop: 2 }}>
              {CURRENT_GUARD.onDutySince} · {CURRENT_GUARD.gate}
            </Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <DashboardStatCard value={TODAY_STATS.visitorsToday} label="Visitors today" />
          <DashboardStatCard value={TODAY_STATS.pendingApproval} label="Pending approval" />
        </View>

        <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 20, marginBottom: 10 }}>Quick actions</Text>
        <View style={styles.actionsRow}>
          <QuickActionCard
            icon="person-add-outline"
            label="New visitor"
            onPress={() => router.push('./visitor-entry')}
          />
          <QuickActionCard
            icon="alert-circle-outline"
            label="Report issue"
            onPress={() => router.push('./report-issue')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  dutyCard: { padding: 16, marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 12 },
  actionsRow: { flexDirection: 'row', gap: 12 },
});