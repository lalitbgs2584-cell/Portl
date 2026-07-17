import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { StatusBadge } from './StatusBadge';
import { useTheme } from '@/store/useTheme';


export interface Poll {
  id: string;
  question: string;
  status: 'active' | 'closed';
  totalVotes: number;
  meta: string; // e.g. "Ends in 2 days" or "Closed 3 May"
}

interface PollCardProps {
  poll: Poll;
  onPress: (poll: Poll) => void;
}

export function PollCard({ poll, onPress }: PollCardProps) {
  const { colors, radius } = useTheme();

  return (
    <Pressable
      onPress={() => onPress(poll)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius['2xl'],
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.question, { color: colors.cardForeground }]} numberOfLines={1}>
          {poll.question}
        </Text>
        <StatusBadge status={poll.status} />
      </View>
      <Text style={[styles.meta, { color: colors.mutedForeground }]}>
        {poll.totalVotes} votes · {poll.meta}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  question: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  meta: {
    fontSize: 11,
    marginTop: 6,
  },
});