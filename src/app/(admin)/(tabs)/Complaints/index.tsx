import React, { useMemo, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { useTheme } from '@/store/useTheme';
import { ComplaintCard, Complaint, ComplaintStatus } from '@/components/admin/complaints/ComplaintCard';

// ── mock data (replace with Supabase query) ────────────────────────────────

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: '1',
    ticketNo: '#1024',
    title: 'Water leakage',
    description: 'Water leakage in bathroom ceiling, worsening since Monday.',
    status: 'open',
    priority: 'high',
    raisedBy: 'Ramesh Kumar',
    flat: 'A302',
    assignedTo: 'Amit Verma (Plumber)',
    createdAt: '2h ago',
  },
  {
    id: '2',
    ticketNo: '#1023',
    title: 'Lift not working',
    description: 'Main elevator stuck on ground floor. Elderly residents affected.',
    status: 'in_progress',
    priority: 'medium',
    raisedBy: 'Sunita Mehta',
    flat: 'B104',
    assignedTo: 'Lift technician',
    createdAt: '1d ago',
  },
  {
    id: '3',
    ticketNo: '#1022',
    title: 'Garbage collection',
    description: 'Garbage not collected from Block C for the past 3 days.',
    status: 'open',
    priority: 'low',
    raisedBy: 'Vikas Patel',
    flat: 'C201',
    assignedTo: null,
    createdAt: '2d ago',
  },
  {
    id: '4',
    ticketNo: '#1021',
    title: 'Security issue',
    description: 'Unknown person spotted in parking area late at night.',
    status: 'resolved',
    priority: 'high',
    raisedBy: 'Priya Singh',
    flat: 'A101',
    assignedTo: 'Security team',
    createdAt: '4d ago',
  },
  {
    id: '5',
    ticketNo: '#1020',
    title: 'Street light out',
    description: 'Street light near Block D entrance not working for a week.',
    status: 'in_progress',
    priority: 'medium',
    raisedBy: 'Arun Nair',
    flat: 'D305',
    assignedTo: 'Electrician',
    createdAt: '5d ago',
  },
];

// ── filter config ──────────────────────────────────────────────────────────

type FilterKey = 'all' | ComplaintStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'resolved', label: 'Resolved' },
];

// ── screen ─────────────────────────────────────────────────────────────────

export default function ComplaintsListScreen() {
  const { colors, radius } = useTheme();
  const [filter, setFilter] = useState<FilterKey>('all');

  const counts = useMemo(
    () => ({
      all: MOCK_COMPLAINTS.length,
      open: MOCK_COMPLAINTS.filter((c) => c.status === 'open').length,
      in_progress: MOCK_COMPLAINTS.filter((c) => c.status === 'in_progress').length,
      resolved: MOCK_COMPLAINTS.filter((c) => c.status === 'resolved').length,
    }),
    []
  );

  const filtered = useMemo(() => {
    if (filter === 'all') return MOCK_COMPLAINTS;
    return MOCK_COMPLAINTS.filter((c) => c.status === filter);
  }, [filter]);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: 'Complaints' }} />

      {/* ── filter chips ── */}
      <View style={styles.filterRow}>
        {FILTERS.map((item) => {
          const selected = item.key === filter;
          return (
            <Pressable
              key={item.key}
              onPress={() => setFilter(item.key)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? colors.primary : colors.card,
                  borderColor: selected ? colors.primary : colors.border,
                  borderRadius: radius.xl,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: selected ? '600' : '400',
                  color: selected ? colors.primaryForeground : colors.foreground,
                }}
              >
                {item.label}
              </Text>
              {/* count pill */}
              <View
                style={[
                  styles.countPill,
                  {
                    backgroundColor: selected ? colors.primaryForeground : colors.muted,
                    borderRadius: radius.sm,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: '600',
                    color: selected ? colors.primary : colors.mutedForeground,
                  }}
                >
                  {counts[item.key]}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* ── list ── */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ComplaintCard
            complaint={item}
            onPress={(c) => router.push(`./${c.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.mutedForeground }]}>
            No complaints in this category.
          </Text>
        }
      />
    </View>
  );
}

// ── styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  countPill: {
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  list: {
    padding: 14,
  },
  empty: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 40,
  },
});
