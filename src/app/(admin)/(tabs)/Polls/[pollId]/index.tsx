import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/store/useTheme';
import { DonutChart } from '@/components/admin/polls/DonutChart';
import { StatusBadge } from '@/components/admin/polls/StatusBadge';

// Replace with a real fetch by `id` (Supabase query)
const MOCK_POLL = {
  id: '1',
  question: 'Parking policy',
  status: 'active' as const,
  totalVotes: 100,
  meta: 'Ends in 2 days',
  options: [
    { label: 'Allot fixed slots', votes: 68 },
    { label: 'First come first serve', votes: 32 },
  ],
};

export default function PollDetailsScreen() {
  const { pollid: id } = useLocalSearchParams<{ pollid: string }>();
  const { colors, radius } = useTheme();

  // Toggle this against your real "did this user already vote" check
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const poll = MOCK_POLL; // fetched using `id` in a real implementation

  const segments = [
    { label: poll.options[0].label, value: poll.options[0].votes, color: colors.chart1 },
    { label: poll.options[1].label, value: poll.options[1].votes, color: colors.chart3 },
  ];

  const handleSubmitVote = () => {
    if (selectedOption === null) return;
    // TODO: write vote to Supabase, then flip hasVoted
    setHasVoted(true);
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.question, { color: colors.foreground }]}>{poll.question}</Text>
        <StatusBadge status={poll.status} />
      </View>
      <Text style={[styles.meta, { color: colors.mutedForeground }]}>
        {poll.totalVotes} votes · {poll.meta}
      </Text>

      {!hasVoted && poll.status === 'active' ? (
        <View style={styles.voteSection}>
          {poll.options.map((option, index) => {
            const selected = selectedOption === index;
            return (
              <Pressable
                key={option.label}
                onPress={() => setSelectedOption(index)}
                style={[
                  styles.optionRow,
                  {
                    backgroundColor: colors.card,
                    borderColor: selected ? colors.primary : colors.border,
                    borderRadius: radius.lg,
                    borderWidth: selected ? 2 : 1,
                  },
                ]}
              >
                <View
                  style={[
                    styles.radio,
                    {
                      borderColor: selected ? colors.primary : colors.mutedForeground,
                      backgroundColor: selected ? colors.primary : 'transparent',
                    },
                  ]}
                />
                <Text style={{ color: colors.foreground, fontSize: 13 }}>{option.label}</Text>
              </Pressable>
            );
          })}

          <Pressable
            disabled={selectedOption === null}
            onPress={handleSubmitVote}
            style={[
              styles.submitButton,
              {
                backgroundColor: colors.primary,
                borderRadius: radius.lg,
                opacity: selectedOption === null ? 0.5 : 1,
              },
            ]}
          >
            <Text style={{ color: colors.primaryForeground, fontWeight: '600', fontSize: 14 }}>
              Submit vote
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          <View style={styles.chartWrapper}>
            <DonutChart segments={segments} centerLabel={`${poll.totalVotes}`} />
          </View>

          <View style={styles.legend}>
            {segments.map((segment) => (
              <View key={segment.label} style={styles.legendRow}>
                <View style={styles.legendLeft}>
                  <View style={[styles.dot, { backgroundColor: segment.color }]} />
                  <Text style={{ color: colors.foreground, fontSize: 12 }}>{segment.label}</Text>
                </View>
                <Text style={{ color: colors.foreground, fontSize: 12, fontWeight: '600' }}>
                  {segment.value}%
                </Text>
              </View>
            ))}
          </View>
        </>
      )}

      {poll.status === 'active' && (
        <View style={[styles.adminRow, { borderColor: colors.border }]}>
          <Pressable
            style={[styles.adminButton, { borderColor: colors.border, borderRadius: radius.md }]}
          >
            <Text style={{ color: colors.foreground, fontSize: 12 }}>Close poll</Text>
          </Pressable>
          <Pressable
            style={[styles.adminButton, { borderColor: colors.border, borderRadius: radius.md }]}
          >
            <Text style={{ color: colors.destructive, fontSize: 12 }}>Delete</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  meta: {
    fontSize: 12,
    marginTop: 4,
  },
  voteSection: {
    marginTop: 20,
    gap: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  submitButton: {
    marginTop: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  chartWrapper: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 8,
  },
  legend: {
    gap: 10,
    marginTop: 8,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  adminRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  adminButton: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
});