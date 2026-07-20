import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useRouter } from 'expo-router';
import { useTheme } from '@/store/useTheme';

const mockPolls = [
  { id: '1', question: 'Preferred timing for Diwali Cultural Meet?', totalVotes: 70, status: 'Active', expires: '2 days left' },
  { id: '2', question: 'Should we add a Pickleball court near Tower C?', totalVotes: 142, status: 'Closed', expires: 'Ended yesterday' },
];

export default function PollsListScreen() {
  const { colors, radius } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Community Polls" showSearch={false} />
      <FlatList
        data={mockPolls}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}
            onPress={() => router.push(`/polls/${item.id}` as any)}
          >
            <View style={styles.headerRow}>
              <View style={[styles.badge, { backgroundColor: item.status === 'Active' ? colors.primary + '20' : colors.muted }]}>
                <Text style={{ color: item.status === 'Active' ? colors.primary : colors.mutedForeground, fontSize: 10, fontWeight: '700' }}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
              <Text style={{ color: colors.mutedForeground, fontSize: 11 }}>{item.expires}</Text>
            </View>

            <Text style={[styles.question, { color: colors.foreground }]}>{item.question}</Text>
            <Text style={[styles.footer, { color: colors.mutedForeground }]}>{item.totalVotes} residents participated</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { padding: 16, borderWidth: 1, marginBottom: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  question: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  footer: { fontSize: 12 },
});