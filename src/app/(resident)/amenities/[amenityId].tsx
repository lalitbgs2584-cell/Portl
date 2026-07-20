import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/store/useTheme';
import Button from '@/components/resident/Button';

export default function AmenityDetailScreen() {
  const { colors, radius } = useTheme();
  const router = useRouter();
  const { amenityId } = useLocalSearchParams();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Booking Details" showSearch={false} />
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>Amenity Pass #{amenityId}</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>Slot: 06:00 AM - 07:00 AM</Text>
        <Text style={[styles.sub, { color: colors.mutedForeground }]}>Date: Tomorrow</Text>
      </View>
      <Button title="Done" onPress={() => router.back()} style={{ marginHorizontal: 16, marginTop: 16 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { margin: 16, padding: 20, borderWidth: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  sub: { fontSize: 14, marginTop: 6 },
});