import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@/store/useTheme';

interface LogEntry {
  id: string;
  title: string;
  timestamp: string;
}

// Replace with a real Supabase query filtered by guard id
const MOCK_LOGS: LogEntry[] = [
  { id: '1', title: 'Gate entry logged', timestamp: 'Today, 8:00 AM' },
  { id: '2', title: 'Visitor handling', timestamp: 'Today, 9:40 AM' },
  { id: '3', title: 'Log updated', timestamp: 'Today, 11:00 AM' },
];

export default function GuardLogsScreen() {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={MOCK_LOGS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.row, { borderColor: colors.border, borderRadius: radius.lg }]}>
            <Text style={{ color: colors.foreground, fontSize: 12 }}>{item.title}</Text>
            <Text style={{ color: colors.mutedForeground, fontSize: 10, marginTop: 2 }}>{item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  row: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 8,
  },
});
