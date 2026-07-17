import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, FlatList } from 'react-native';


const bookings = [
  { id: '1', resident: 'Rahul Sharma', amenity: 'Clubhouse', date: 'May 20, 2024', status: 'Confirmed' },
  { id: '2', resident: 'Priya Verma', amenity: 'Gym', date: 'May 21, 2024', status: 'Pending' },
];

export default function BookingList() {
  const { colors,radius } = useTheme();

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      data={bookings}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{
          backgroundColor: colors.card,
          padding: 16,
          margin: 8,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.border,
        }}>
          <Text style={{ color: colors.cardForeground }}>{item.resident}</Text>
          <Text style={{ color: colors.mutedForeground }}>{item.amenity}</Text>
          <Text style={{ color: colors.mutedForeground }}>{item.date}</Text>
          <Text style={{ color: colors.accent }}>{item.status}</Text>
        </View>
      )}
    />
  );
}
