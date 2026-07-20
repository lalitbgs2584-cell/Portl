import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/store/useTheme';
import Button from '@/components/resident/Button';

export default function PollDetailScreen() {
  const { colors, radius } = useTheme();
  const { pollId } = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const options = [
    { id: 1, label: 'Sunday 10:00 AM', votes: 42 },
    { id: 2, label: 'Saturday 05:00 PM', votes: 28 },
    { id: 3, label: 'Friday 07:00 PM', votes: 12 },
  ];

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0) + (hasVoted ? 1 : 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title={`Poll #${pollId}`} showSearch={false} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
          <Text style={[styles.question, { color: colors.foreground }]}>
            Preferred timing for Diwali Festival Cultural Meet?
          </Text>
          <Text style={{ color: colors.mutedForeground, fontSize: 12, marginTop: 4, marginBottom: 16 }}>
            {totalVotes} Total Votes · Closes in 2 days
          </Text>

          {options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const voteCount = opt.votes + (isSelected && hasVoted ? 1 : 0);
            const percentage = Math.round((voteCount / totalVotes) * 100);

            return (
              <TouchableOpacity
                key={opt.id}
                disabled={hasVoted}
                style={[
                  styles.optionBtn,
                  {
                    backgroundColor: isSelected ? colors.primary + '15' : colors.muted,
                    borderColor: isSelected ? colors.primary : 'transparent',
                    borderRadius: radius.xl,
                  },
                ]}
                onPress={() => setSelectedOption(opt.id)}
              >
                <View style={styles.optionHeader}>
                  <Text style={{ color: colors.foreground, fontWeight: '600', fontSize: 14 }}>{opt.label}</Text>
                  {hasVoted && <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 12 }}>{percentage}%</Text>}
                </View>

                {hasVoted && (
                  <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                    <View
                      style={[
                        styles.progressFill,
                        { backgroundColor: colors.primary, width: `${percentage}%`, borderRadius: radius['4xl'] },
                      ]}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {!hasVoted ? (
            <Button
              title="Submit Vote"
              disabled={selectedOption === null}
              onPress={() => setHasVoted(true)}
              style={{ marginTop: 12 }}
            />
          ) : (
            <Text style={{ color: colors.success, fontWeight: '600', textAlign: 'center', marginTop: 12 }}>
              ✓ Your vote has been recorded
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { padding: 16, borderWidth: 1 },
  question: { fontSize: 17, fontWeight: '700' },
  optionBtn: { padding: 14, borderWidth: 1.5, marginBottom: 10 },
  optionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressBar: { height: 6, borderRadius: 3, marginTop: 8, overflow: 'hidden' },
  progressFill: { height: '100%' },
});