
import { ShiftCalendarStrip } from '@/components/guard/ShiftCalendarStrip';
import { ShiftDetailSheet } from '@/components/guard/ShiftDetailSheet';
import { useTheme } from '@/store/useTheme';
import { Shift } from '@/types/guard.types';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

// TODO: replace with real Supabase fetch — shape kept identical so swap-in is trivial
const MOCK_SHIFTS: Shift[] = [
  {
    id: 's1',
    date: '2026-07-20',
    label: 'Morning shift',
    startTime: '08:00 AM',
    endTime: '04:00 PM',
    gate: 'Gate 2',
    status: 'active',
    attendance: { markedByGuardId: 'g2', markedByGuardName: 'Ramesh K.', markedAt: '2026-07-20T08:02:00Z' },
  },
  {
    id: 's2',
    date: '2026-07-21',
    label: 'Morning shift',
    startTime: '08:00 AM',
    endTime: '04:00 PM',
    gate: 'Gate 2',
    status: 'upcoming',
  },
];

function buildWeek(centerDate: string) {
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const center = new Date(centerDate);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(center);
    d.setDate(center.getDate() - 3 + i);
    const iso = d.toISOString().slice(0, 10);
    return {
      date: iso,
      dayLabel: labels[d.getDay()],
      dateNum: d.getDate(),
      shift: MOCK_SHIFTS.find((s) => s.date === iso),
    };
  });
}

export default function ShiftAttendanceScreen() {
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState('2026-07-20');
  const [sheetVisible, setSheetVisible] = useState(false);

  const days = useMemo(() => buildWeek(selectedDate), [selectedDate]);
  const selectedShift = MOCK_SHIFTS.find((s) => s.date === selectedDate) ?? null;

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setSheetVisible(true);
  };

  const handleStartHandover = (shiftId: string) => {
    router.push({ pathname: './shift/handover', params: { shiftId } });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground }}>Shift & attendance</Text>
        <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 2, marginBottom: 16 }}>
          Swipe to browse days · tap a day to view details
        </Text>

        <ShiftCalendarStrip days={days} selectedDate={selectedDate} onSelectDate={handleSelectDate} />

        {selectedShift ? (
          <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 16 }]}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground }}>{selectedShift.label}</Text>
            <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 4 }}>
              {selectedShift.startTime} – {selectedShift.endTime} · {selectedShift.gate}
            </Text>
            {selectedShift.attendance && (
              <Text style={{ fontSize: 11, color: colors.mutedForeground, marginTop: 8 }}>
                Marked by handover: {selectedShift.attendance.markedByGuardName}
              </Text>
            )}
          </View>
        ) : (
          <View style={[styles.summaryCard, { backgroundColor: colors.muted, marginTop: 16 }]}>
            <Text style={{ fontSize: 12, color: colors.mutedForeground }}>No shift scheduled this day.</Text>
          </View>
        )}
      </ScrollView>

      <ShiftDetailSheet
        visible={sheetVisible}
        shift={selectedShift}
        onClose={() => setSheetVisible(false)}
        onStartHandover={handleStartHandover}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  summaryCard: { borderRadius: 14, borderWidth: 1, padding: 14 },
});