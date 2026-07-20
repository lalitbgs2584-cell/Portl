import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useRouter } from 'expo-router';
import { Amenity } from '@/types/resident.types';
import { useTheme } from '@/store/useTheme';
import Button from '@/components/resident/Button';

const mockAmenities: Amenity[] = [
  { id: '1', name: 'Swimming Pool', timings: '06:00 AM - 09:00 PM', icon: 'water-outline', emoji: '🏊♂️', availableSlots: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '05:00 PM - 06:00 PM'] },
  { id: '2', name: 'Gymnasium', timings: '05:00 AM - 10:00 PM', icon: 'fitness-outline', emoji: '🏋️♂️', availableSlots: ['06:00 AM - 07:00 AM', '08:00 AM - 09:00 AM', '06:00 PM - 07:00 PM'] },
  { id: '3', name: 'Tennis Court', timings: '06:00 AM - 08:00 PM', icon: 'tennisball-outline', emoji: '🎾', availableSlots: ['07:00 AM - 08:00 AM', '04:00 PM - 05:00 PM'] },
];

export default function AmenitiesScreen() {
  const { colors, radius } = useTheme();
  const router = useRouter();
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Book Amenities" showSearch={false} />
      
      <FlatList
        data={mockAmenities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}
            onPress={() => setSelectedAmenity(item)}
          >
            <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.name, { color: colors.foreground }]}>{item.name}</Text>
              <Text style={[styles.timings, { color: colors.mutedForeground }]}>{item.timings}</Text>
            </View>
            <TouchableOpacity
              style={[styles.bookBtn, { backgroundColor: colors.primary, borderRadius: radius.xl }]}
              onPress={() => setSelectedAmenity(item)}
            >
              <Text style={{ color: colors.primaryForeground, fontWeight: '600', fontSize: 12 }}>Book</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Slot Picker Sheet Modal */}
      <Modal visible={!!selectedAmenity} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.sheet, { backgroundColor: colors.card, borderRadius: radius['3xl'] }]}>
            <Text style={[styles.sheetTitle, { color: colors.foreground }]}>Select Slot - {selectedAmenity?.name}</Text>
            <View style={styles.slotGrid}>
              {selectedAmenity?.availableSlots.map((slot, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.slotPill,
                    {
                      backgroundColor: selectedSlot === slot ? colors.primary : colors.muted,
                      borderRadius: radius.xl,
                    },
                  ]}
                  onPress={() => setSelectedSlot(slot)}
                >
                  <Text style={{ color: selectedSlot === slot ? colors.primaryForeground : colors.foreground, fontSize: 12, fontWeight: '600' }}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              title="Confirm Booking"
              disabled={!selectedSlot}
              onPress={() => {
                alert(`Booked ${selectedAmenity?.name} for ${selectedSlot}`);
                setSelectedAmenity(null);
                setSelectedSlot(null);
              }}
              style={{ marginTop: 16 }}
            />
            <Button title="Cancel" variant="outline" onPress={() => setSelectedAmenity(null)} style={{ marginTop: 8 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, marginBottom: 12 },
  name: { fontSize: 16, fontWeight: '700' },
  timings: { fontSize: 12, marginTop: 2 },
  bookBtn: { paddingHorizontal: 14, paddingVertical: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  sheetTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  slotPill: { paddingHorizontal: 12, paddingVertical: 10 },
});