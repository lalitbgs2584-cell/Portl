// app/amenities/book.tsx
// Screen 2 — pick an amenity, a date, and a free time slot, then confirm.
// Calendar grid is hand-rolled (no extra dependency) to keep it exactly
// matching the mockup. Swap in react-native-calendars later if you want
// range-select or multi-month swipe for free.

import { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../../lib/theme';
import { getAmenities, getSlotsForDate, createBooking, Amenity } from '../../lib/amenities';
import { useAuth } from '../../lib/useAuth';

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// generate 1-hour slots for a simple demo day (customize per amenity later)
const ALL_SLOTS = [
  '06:00-07:00', '07:00-08:00', '08:00-09:00',
  '18:00-19:00', '19:00-20:00', '20:00-21:00',
];

function buildMonthGrid(year: number, month: number /* 0-11 */) {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(startWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function BookAmenityScreen() {
  const { user } = useAuth();
  const { amenityId: preselectedId } = useLocalSearchParams<{ amenityId?: string }>();

  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [amenity, setAmenity] = useState<Amenity | null>(null);
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getAmenities().then((list) => {
      setAmenities(list);
      const initial = list.find((a) => a.id === preselectedId) ?? list[0];
      setAmenity(initial ?? null);
      setLoading(false);
    });
  }, [preselectedId]);

  const dateString = useMemo(() => {
    if (!selectedDay) return null;
    const mm = String(cursor.month + 1).padStart(2, '0');
    const dd = String(selectedDay).padStart(2, '0');
    return `${cursor.year}-${mm}-${dd}`;
  }, [cursor, selectedDay]);

  useEffect(() => {
    if (!amenity || !dateString) return;
    getSlotsForDate(amenity.id, dateString).then((rows) => {
      setTakenSlots(rows.map((r) => `${r.start_time}-${r.end_time}`));
      setSelectedSlot(null);
    });
  }, [amenity, dateString]);

  const grid = buildMonthGrid(cursor.year, cursor.month);
  const monthLabel = new Date(cursor.year, cursor.month, 1).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
  const today = new Date();
  const isPast = (day: number) =>
    new Date(cursor.year, cursor.month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  async function handleConfirm() {
    if (!user || !amenity || !dateString || !selectedSlot) return;
    const [start, end] = selectedSlot.split('-');
    setSubmitting(true);
    try {
      await createBooking({
        amenityId: amenity.id,
        userId: user.id,
        date: dateString,
        startTime: start,
        endTime: end,
        totalAmount: amenity.rate_per_hour, // 1hr slot; multiply if you support longer durations
      });
      Alert.alert('Requested', 'Your booking is pending society approval.');
      router.replace('/amenities');
    } catch (e: any) {
      Alert.alert('Could not book', e.message ?? 'Try a different slot.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !amenity) {
    return (
      <View style={[styles.screen, { justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.title}>Book amenity</Text>

      <View style={styles.amenityPicker}>
        {amenities.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => setAmenity(a)}
            style={[styles.amenityChip, amenity.id === a.id && styles.amenityChipActive]}
          >
            <Text style={[styles.amenityChipText, amenity.id === a.id && styles.amenityChipTextActive]}>
              {a.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.subtitle}>
        {amenity.name} · ₹{amenity.rate_per_hour}/hr
      </Text>

      <View style={styles.calendarHeader}>
        <Pressable
          onPress={() => setCursor((c) => (c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 }))}
        >
          <Ionicons name="chevron-back" size={18} color={colors.textSecondary} />
        </Pressable>
        <Text style={styles.calendarMonth}>{monthLabel}</Text>
        <Pressable
          onPress={() => setCursor((c) => (c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 }))}
        >
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {WEEKDAYS.map((w, i) => (
          <Text key={i} style={styles.weekday}>{w}</Text>
        ))}
      </View>

      <View style={styles.grid}>
        {grid.map((day, i) => {
          if (day === null) return <View key={i} style={styles.dayCell} />;
          const disabled = isPast(day);
          const active = day === selectedDay;
          return (
            <Pressable
              key={i}
              disabled={disabled}
              onPress={() => setSelectedDay(day)}
              style={[styles.dayCell, active && styles.dayCellActive]}
            >
              <Text style={[styles.dayText, disabled && styles.dayTextDisabled, active && styles.dayTextActive]}>
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.subtitle}>Select time slot</Text>
      <View style={styles.slotRow}>
        {ALL_SLOTS.map((slot) => {
          const taken = takenSlots.includes(slot);
          const active = slot === selectedSlot;
          const [s, e] = slot.split('-');
          return (
            <Pressable
              key={slot}
              disabled={taken}
              onPress={() => setSelectedSlot(slot)}
              style={[styles.slot, active && styles.slotActive, taken && styles.slotTaken]}
            >
              <Text style={[styles.slotText, active && styles.slotTextActive, taken && styles.slotTextTaken]}>
                {s}–{e} {taken ? '· full' : ''}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={[styles.cta, (!selectedSlot || submitting) && { opacity: 0.5 }]}
        disabled={!selectedSlot || submitting}
        onPress={handleConfirm}
      >
        <Text style={styles.ctaText}>{submitting ? 'Booking…' : 'Confirm booking'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  title: { color: colors.text, fontSize: 20, fontWeight: '600', marginBottom: 12 },
  subtitle: { color: colors.textSecondary, fontSize: 12, marginBottom: 12 },
  amenityPicker: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  amenityChip: {
    backgroundColor: colors.chip,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
  },
  amenityChipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  amenityChipText: { color: colors.textSecondary, fontSize: 12 },
  amenityChipTextActive: { color: colors.accentText, fontWeight: '600' },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  calendarMonth: { color: colors.text, fontSize: 13, fontWeight: '600' },
  weekRow: { flexDirection: 'row', marginBottom: 4 },
  weekday: { flex: 1, textAlign: 'center', color: colors.textMuted, fontSize: 11 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  dayCellActive: { backgroundColor: colors.accent, borderRadius: 999 },
  dayText: { color: colors.text, fontSize: 12 },
  dayTextDisabled: { color: colors.borderStrong },
  dayTextActive: { color: colors.accentText, fontWeight: '600' },
  slotRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  slot: {
    backgroundColor: colors.chip,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.chip,
  },
  slotActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  slotTaken: { backgroundColor: colors.cancelBg, borderColor: colors.cancelBorder },
  slotText: { color: colors.text, fontSize: 12 },
  slotTextActive: { color: colors.accentText, fontWeight: '600' },
  slotTextTaken: { color: colors.cancelText },
  cta: { backgroundColor: colors.accent, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  ctaText: { color: colors.accentText, fontWeight: '600', fontSize: 14 },
});