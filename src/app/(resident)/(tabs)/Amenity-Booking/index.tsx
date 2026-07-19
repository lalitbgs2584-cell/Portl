// app/amenities/index.tsx
// Screen 1 — "My bookings", grouped by month with a horizontal month picker.

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, statusStyle, BookingStatus } from '../../lib/theme';
import { getBookingsForMonth, Booking } from '../../lib/amenities';
import { useAuth } from '../../lib/useAuth'; // wraps your Supabase Auth session

function monthLabel(offset: number) {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + offset);
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    label: d.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
  };
}

// last 3 months + current, adjust range as you like
const MONTH_OPTIONS = [-3, -2, -1, 0].map(monthLabel);

export default function MyBookingsScreen() {
  const { user } = useAuth();
  const [selected, setSelected] = useState(MONTH_OPTIONS[MONTH_OPTIONS.length - 1]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    const data = await getBookingsForMonth(user.id, selected.year, selected.month);
    setBookings(data);
  }, [user, selected]);

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  const sections = useMemo(() => {
    // single month already, but keeping this makes it trivial to widen the range later
    return bookings;
  }, [bookings]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My bookings</Text>
          <Text style={styles.subtitle}>Grouped by month</Text>
        </View>
        <Pressable onPress={() => router.push('/amenities/book')} hitSlop={12}>
          <Ionicons name="add-circle-outline" size={26} color={colors.text} />
        </Pressable>
      </View>

      <Pressable style={styles.historyRow} onPress={() => router.push('/amenities/history')}>
        <Text style={styles.historyText}>View past bookings</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
      </Pressable>

      <View style={styles.monthRow}>
        {MONTH_OPTIONS.map((opt) => {
          const active = opt.label === selected.label;
          return (
            <Pressable
              key={opt.label}
              onPress={() => setSelected(opt)}
              style={[styles.monthChip, active && styles.monthChipActive]}
            >
              <Text style={[styles.monthChipText, active && styles.monthChipTextActive]}>
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No bookings in {selected.label}. Book one below.</Text>
          }
          renderItem={({ item }) => {
            const s = statusStyle[item.status as BookingStatus];
            return (
              <Pressable
                style={styles.card}
                onPress={() => router.push(`/amenities/${item.id}`)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.amenities?.name}</Text>
                  <Text style={styles.cardMeta}>
                    {new Date(item.booking_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    · {item.start_time}–{item.end_time}
                  </Text>
                </View>
                <View style={[styles.badge, { backgroundColor: s.bg }]}>
                  <Text style={[styles.badgeText, { color: s.text }]}>{s.label}</Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}

      <Pressable style={styles.cta} onPress={() => router.push('/amenities/book')}>
        <Text style={styles.ctaText}>+ Book amenity</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { color: colors.text, fontSize: 20, fontWeight: '600' },
  subtitle: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  historyText: { color: colors.text, fontSize: 13, fontWeight: '500' },
  monthRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  monthChip: {
    backgroundColor: colors.chip,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radii.pill,
  },
  monthChipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  monthChipText: { color: colors.textSecondary, fontSize: 12 },
  monthChipTextActive: { color: colors.accentText, fontWeight: '600' },
  card: {
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: { color: colors.text, fontSize: 14, fontWeight: '600' },
  cardMeta: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  badge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: radii.pill },
  badgeText: { fontSize: 11, fontWeight: '600' },
  emptyText: { color: colors.textSecondary, textAlign: 'center', marginTop: 40, fontSize: 13 },
  cta: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaText: { color: colors.accentText, fontWeight: '600', fontSize: 14 },
});