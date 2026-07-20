import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useTheme } from '@/store/useTheme';
import { DutyHistoryEntry } from '@/types/guard.types';
import React, { useMemo, useState } from 'react';
import { FlatList,  StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RangeFilter = 'all' | 'week' | 'month';

// TODO: replace with Supabase fetch scoped to current guard, ordered by fromDate desc
const MOCK_HISTORY: DutyHistoryEntry[] = [
  { id: 'h1', shiftType: 'morning', fromDate: '2026-07-13', toDate: '2026-07-13', status: 'completed', handledByGuardName: 'Ramesh K.' },
  { id: 'h2', shiftType: 'evening', fromDate: '2026-07-06', toDate: '2026-07-06', status: 'completed', handledByGuardName: 'Suresh Y.' },
  { id: 'h3', shiftType: 'night', fromDate: '2026-06-29', toDate: '2026-06-29', status: 'missed' },
];

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

function withinRange(dateStr: string, range: RangeFilter): boolean {
  if (range === 'all') return true;
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  if (range === 'week') return diffDays <= 7;
  if (range === 'month') return diffDays <= 30;
  return true;
}

export default function DutyHistoryScreen() {
  const { colors, radius } = useTheme();
  const [range, setRange] = useState<RangeFilter>('all');

  const filtered = useMemo(() => MOCK_HISTORY.filter((h) => withinRange(h.fromDate, range)), [range]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>Duty history</Text>
        <SegmentedControl
          value={range}
          onChange={setRange}
          options={[
            { label: 'All', value: 'all' },
            { label: 'This week', value: 'week' },
            { label: 'This month', value: 'month' },
          ]}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg }]}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground }}>{item.shiftType}</Text>
              <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 2 }}>
                {fmt(item.fromDate)}{item.fromDate !== item.toDate ? ` – ${fmt(item.toDate)}` : ''}
              </Text>
              {item.handledByGuardName && (
                <Text style={{ fontSize: 11, color: colors.mutedForeground, marginTop: 4 }}>
                  Handover by {item.handledByGuardName}
                </Text>
              )}
            </View>
            <View
              style={[
                styles.badge,
                { backgroundColor: item.status === 'completed' ? '#DCF3E7' : '#FBE1DE', borderRadius: radius.sm },
              ]}
            >
              <Text style={{ fontSize: 11, fontWeight: '600', color: item.status === 'completed' ? '#1F7A4D' : '#B3271E' }}>
                {item.status === 'completed' ? 'Completed' : 'Missed'}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: colors.mutedForeground, marginTop: 40, fontSize: 13 }}>
            No records in this range.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flexDirection: 'row', alignItems: 'flex-start', padding: 12, borderWidth: 1, marginBottom: 10 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, marginLeft: 8 },
});