import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';

interface AttendanceEntry {
  id: string;
  date: string;
  status: 'on_time' | 'late' | 'absent';
  checkIn: string;
}

// Replace with a real Supabase query filtered by guard id
const MOCK_ATTENDANCE: AttendanceEntry[] = [
  { id: '1', date: 'Today', status: 'on_time', checkIn: '8:00 AM' },
  { id: '2', date: 'Yesterday', status: 'late', checkIn: '8:20 AM' },
  { id: '3', date: '2 days ago', status: 'on_time', checkIn: '7:58 AM' },
];

const STATUS_META: Record<AttendanceEntry['status'], { label: string; icon: keyof typeof Feather.glyphMap }> = {
  on_time: { label: 'On time', icon: 'check' },
  late: { label: 'Late', icon: 'clock' },
  absent: { label: 'Absent', icon: 'x' },
};

export default function GuardAttendanceTab() {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={MOCK_ATTENDANCE}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const meta = STATUS_META[item.status];
          const color = item.status === 'on_time' ? colors.primary : colors.destructive;
          return (
            <View style={[styles.row, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg }]}>
              <View style={styles.left}>
                <Feather name={meta.icon} size={14} color={color} style={{ marginRight: 8 }} />
                <Text style={{ color: colors.foreground, fontSize: 12 }}>{item.date}</Text>
              </View>
              <Text style={{ color: colors.mutedForeground, fontSize: 11 }}>
                {meta.label} · {item.checkIn}
              </Text>
            </View>
          );
        }}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginBottom: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
