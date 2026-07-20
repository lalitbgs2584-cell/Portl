import { SegmentedControl } from '@/components/ui/SegmentedControl';

import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList,  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/store/useTheme';
import { LeaveRequest, LeaveStatus } from '@/types/guard.types';
import { SafeAreaView } from 'react-native-safe-area-context';

const STATUS_STYLE: Record<LeaveStatus, { bg: string; fg: string; label: string }> = {
  pending: { bg: '#F0E6DA', fg: '#8B6F52', label: 'Pending' },
  approved: { bg: '#DCF3E7', fg: '#1F7A4D', label: 'Approved' },
  rejected: { bg: '#FBE1DE', fg: '#B3271E', label: 'Rejected' },
};

// TODO: replace with Supabase fetch scoped to current guard
const MOCK_LEAVES: LeaveRequest[] = [
  { id: 'l1', type: 'casual', fromDate: '2026-07-28', toDate: '2026-07-29', reason: 'Family function', status: 'approved', appliedAt: '2026-07-18' },
  { id: 'l2', type: 'sick', fromDate: '2026-08-02', toDate: '2026-08-02', reason: 'Fever', status: 'pending', appliedAt: '2026-07-20' },
];

function formatRange(from: string, to: string) {
  const f = new Date(from).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  const t = new Date(to).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
  return from === to ? f : `${f} – ${t}`;
}

export default function LeaveHistoryScreen() {
  const { colors, radius } = useTheme();
  const [filter, setFilter] = useState<'all' | LeaveStatus>('all');

  const filtered = useMemo(() => (filter === 'all' ? MOCK_LEAVES : MOCK_LEAVES.filter((l) => l.status === filter)), [filter]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <View style={styles.headerRow}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground }}>Leave</Text>
          <TouchableOpacity
            onPress={() => router.push('./leave/apply')}
            style={[styles.applyBtn, { backgroundColor: colors.primary, borderRadius: radius.md }]}
          >
            <Ionicons name="add" size={16} color={colors.primaryForeground} />
            <Text style={{ color: colors.primaryForeground, fontSize: 13, fontWeight: '600', marginLeft: 4 }}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 16, marginBottom: 12 }}>
          <SegmentedControl
            value={filter}
            onChange={setFilter}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Approved', value: 'approved' },
            ]}
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        renderItem={({ item }) => {
          const status = STATUS_STYLE[item.status];
          return (
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, textTransform: 'capitalize' }}>
                  {item.type} leave
                </Text>
                <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 2 }}>{formatRange(item.fromDate, item.toDate)}</Text>
                <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 4 }} numberOfLines={1}>
                  {item.reason}
                </Text>
              </View>
              <View style={[styles.badge, { backgroundColor: status.bg, borderRadius: radius.sm }]}>
                <Text style={{ fontSize: 11, color: status.fg, fontWeight: '600' }}>{status.label}</Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: colors.mutedForeground, marginTop: 40, fontSize: 13 }}>
            No leave requests here.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  applyBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8 },
  card: { flexDirection: 'row', padding: 12, borderWidth: 1, marginBottom: 10, alignItems: 'flex-start' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, marginLeft: 8 },
});