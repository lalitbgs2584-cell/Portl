import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useTheme } from '@/store/useTheme';

const mockNotices = [
  { id: '1', title: 'Annual General Meeting (AGM)', category: 'Notice', timeAgo: '2 hrs ago', content: 'Scheduled for Sunday at 10 AM in the clubhouse.' },
  { id: '2', title: 'Water Tank Cleaning Notice', category: 'Maintenance', timeAgo: '1 day ago', content: 'Water supply will be paused from 1 PM to 4 PM tomorrow.' },
];

export default function CommunityScreen() {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Community" />
      <FlatList
        data={mockNotices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
            <View style={styles.row}>
              <Text style={[styles.tag, { color: colors.primary }]}>{item.category}</Text>
              <Text style={[styles.time, { color: colors.mutedForeground }]}>{item.timeAgo}</Text>
            </View>
            <Text style={[styles.title, { color: colors.foreground }]}>{item.title}</Text>
            <Text style={[styles.content, { color: colors.mutedForeground }]}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { padding: 16, borderWidth: 1, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  tag: { fontSize: 12, fontWeight: '700' },
  time: { fontSize: 11 },
  title: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  content: { fontSize: 13 },
});