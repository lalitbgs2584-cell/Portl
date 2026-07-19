// app/amenities/[id].tsx
// Screen 3 — booking detail, with edit (routes back into the booker,
// pre-filled) and cancel (confirm dialog, then soft-delete via status).

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, radii, statusStyle, BookingStatus } from '../../lib/theme';
import { getBookingById, cancelBooking, Booking } from '../../lib/amenities';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!id) return;
    getBookingById(id).then(setBooking).finally(() => setLoading(false));
  }, [id]);

  function handleEdit() {
    if (!booking) return;
    // Re-use the booking screen, pre-selecting the same amenity.
    // Simplest correct approach: cancel-and-rebook so slot conflicts
    // are re-checked against fresh data rather than trusting stale state.
    router.push(`/amenities/book?amenityId=${booking.amenity_id}&editingId=${booking.id}`);
  }

  function handleCancel() {
    if (!booking) return;
    Alert.alert('Cancel booking?', 'This can\'t be undone.', [
      { text: 'Keep booking', style: 'cancel' },
      {
        text: 'Cancel booking',
        style: 'destructive',
        onPress: async () => {
          setCancelling(true);
          try {
            await cancelBooking(booking.id);
            router.replace('/amenities');
          } catch (e: any) {
            Alert.alert('Could not cancel', e.message ?? 'Try again.');
          } finally {
            setCancelling(false);
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <View style={[styles.screen, { justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={[styles.screen, { justifyContent: 'center' }]}>
        <Text style={{ color: colors.textSecondary }}>Booking not found.</Text>
      </View>
    );
  }

  const s = statusStyle[booking.status as BookingStatus];
  const canModify = booking.status === 'pending' || booking.status === 'confirmed';

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Booking details</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{booking.amenities?.name}</Text>
        <Text style={styles.cardMeta}>
          {new Date(booking.booking_date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}{' '}
          · {booking.start_time}–{booking.end_time}
        </Text>
        <View style={[styles.badge, { backgroundColor: s.bg }]}>
          <Text style={[styles.badgeText, { color: s.text }]}>{s.label}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>Booking id</Text>
        <Text style={styles.rowValue}>#{booking.id.slice(0, 8).toUpperCase()}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Rate</Text>
        <Text style={styles.rowValue}>₹{booking.amenities?.rate_per_hour}/hr</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.rowLabel}>Total</Text>
        <Text style={[styles.rowValue, { fontWeight: '600', color: colors.text }]}>
          ₹{booking.total_amount}
        </Text>
      </View>

      {canModify && (
        <View style={styles.actionRow}>
          <Pressable style={styles.editBtn} onPress={handleEdit}>
            <Text style={styles.editBtnText}>Edit slot</Text>
          </Pressable>
          <Pressable
            style={[styles.cancelBtn, cancelling && { opacity: 0.6 }]}
            disabled={cancelling}
            onPress={handleCancel}
          >
            <Text style={styles.cancelBtnText}>{cancelling ? 'Cancelling…' : 'Cancel'}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  title: { color: colors.text, fontSize: 20, fontWeight: '600', marginBottom: 14 },
  card: {
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  cardTitle: { color: colors.text, fontSize: 15, fontWeight: '600' },
  cardMeta: { color: colors.textSecondary, fontSize: 13, marginTop: 4 },
  badge: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 10, borderRadius: radii.pill, marginTop: 8 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLabel: { color: colors.textSecondary, fontSize: 13 },
  rowValue: { color: colors.textSecondary, fontSize: 13 },
  actionRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  editBtn: {
    flex: 1,
    backgroundColor: colors.chip,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editBtnText: { color: colors.text, fontSize: 14, fontWeight: '500' },
  cancelBtn: {
    flex: 1,
    backgroundColor: colors.cancelBg,
    borderWidth: 1,
    borderColor: colors.cancelBorder,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelBtnText: { color: colors.cancelText, fontSize: 14, fontWeight: '500' },
});