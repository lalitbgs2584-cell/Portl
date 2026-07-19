// app/amenities/history.tsx
// Dedicated "previous bookings" screen — everything before today, paginated,
// with a lifetime spend summary up top. Linked from the "View history" row
// on the main My Bookings screen.

import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, statusStyle, BookingStatus } from '../../lib/theme';
import { getPastBookings, getLifetimeSpend, Booking } from '../../lib/amenities';
import { useAuth } from '../../lib/useAuth';

const PAGE_SIZE = 20;

export default function BookingHistoryScreen() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [spend, setSpend] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadFirstPage = useCallback(async () => {
    if (!user) return;
    const [{ bookings: rows, total: count }, lifetime] = await Promise.all([
      getPastBookings(user.id, 0, PAGE_SIZE),
      getLifetimeSpend(user.id),
    ]);
    setBookings(rows);
    setTotal(count);
    setSpend(lifetime);
    setPage(0);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    loadFirstPage().finally(() => setLoading(false));
  }, [loadFirstPage]);

  async function loadMore() {
    if (!user || loadingMore || bookings.length >= total) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    const { bookings: rows } = await getPastBookings(user.id, nextPage, PAGE_SIZE);
    setBookings((prev) => [...prev, ...rows]);
    setPage(nextPage);
    setLoadingMore(false);
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.title}>Booking history</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Past bookings</Text>
          <Text style={styles.summaryValue}>{total}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total spent</Text>
          <Text style={styles.summaryValue}>₹{spend.toLocaleString('en-IN')}</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          onEndReachedThreshold={0.4}
          onEndReached={loadMore}
          ListEmptyComponent={<Text style={styles.emptyText}>No past bookings yet.</Text>}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.accent} style={{ marginTop: 12 }} /> : null}
          renderItem={({ item }) => {
            const s = statusStyle[item.status as BookingStatus];
            return (
              <Pressable style={styles.card} onPress={() => router.push(`/amenities/${item.id}`)}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.amenities?.name}</Text>
                  <Text style={styles.cardMeta}>
                    {new Date(item.booking_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    · {item.start_time}–{item.end_time}
                  </Text>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <View style={[styles.badge, { backgroundColor: s.bg }]}>
                    <Text style={[styles.badgeText, { color: s.text }]}>{s.label}</Text>
                  </View>
                  <Text style={styles.amount}>₹{item.total_amount}</Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { color: colors.text, fontSize: 17, fontWeight: '600' },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
  },
  summaryLabel: { color: colors.textSecondary, fontSize: 12, marginBottom: 6 },
  summaryValue: { color: colors.text, fontSize: 20, fontWeight: '600' },
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
  amount: { color: colors.textSecondary, fontSize: 12 },
  emptyText: { color: colors.textSecondary, textAlign: 'center', marginTop: 40, fontSize: 13 },
});