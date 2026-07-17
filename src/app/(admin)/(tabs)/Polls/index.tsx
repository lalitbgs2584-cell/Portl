import React, { useMemo, useState } from 'react';
import { View, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { router, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';
import { PollCard, Poll } from '@/components/admin/polls/PollCard';

// Replace with real data from your API / Supabase query
const MOCK_POLLS: Poll[] = [
  { id: '1', question: 'Parking policy', status: 'active', totalVotes: 100, meta: 'Ends in 2 days' },
  { id: '2', question: 'Amenity charges', status: 'closed', totalVotes: 84, meta: 'Closed 3 May' },
  { id: '3', question: 'Garbage collection timing', status: 'active', totalVotes: 42, meta: 'Ends in 5 days' },
  { id: '4', question: 'Gym equipment upgrade', status: 'closed', totalVotes: 61, meta: 'Closed 18 Apr' },
];

type FilterKey = 'all' | 'active' | 'closed';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'closed', label: 'Closed' },
];

export default function PollListScreen() {
  const { colors, radius } = useTheme();
  const [filter, setFilter] = useState<FilterKey>('all');

  const counts = useMemo(
    () => ({
      all: MOCK_POLLS.length,
      active: MOCK_POLLS.filter((p) => p.status === 'active').length,
      closed: MOCK_POLLS.filter((p) => p.status === 'closed').length,
    }),
    []
  );

  const filteredPolls = useMemo(() => {
    if (filter === 'all') return MOCK_POLLS;
    return MOCK_POLLS.filter((poll) => poll.status === filter);
  }, [filter]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => router.push('./Create-Polls')}
              style={[
                styles.createButton,
                { backgroundColor: colors.primary, borderRadius: radius.lg },
              ]}
            >
              <Feather name="plus" size={16} color={colors.primaryForeground} />
            </Pressable>
          ),
        }}
      />

      <View style={styles.filterRow}>
        {FILTERS.map((item) => {
          const selected = item.key === filter;
          return (
            <Pressable
              key={item.key}
              onPress={() => setFilter(item.key)}
              style={[
                styles.filterChip,
                {
                  backgroundColor: selected ? colors.primary : colors.card,
                  borderColor: selected ? colors.primary : colors.border,
                  borderRadius: radius.xl,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: selected ? '600' : '400',
                  color: selected ? colors.primaryForeground : colors.foreground,
                }}
              >
                {item.label}
              </Text>
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
                    fontSize: 10,
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

      <FlatList
        data={filteredPolls}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
            No {filter === 'all' ? '' : filter} polls yet.
          </Text>
        }
        renderItem={({ item }) => (
          <PollCard poll={item} onPress={(poll) => router.push(`./${poll.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  countPill: {
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  list: {
    padding: 12,
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 40,
  },
});