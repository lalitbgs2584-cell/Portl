import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, FlatList } from 'react-native';


const requests = [
  { id: '1', resident: 'Neha Gupta', amenity: 'Clubhouse', status: 'Pending' },
  { id: '2', resident: 'Arjun Mehta', amenity: 'Gym', status: 'Approved' },
  { id: '3', resident: 'Sneha Rathi', amenity: 'Pool', status: 'Rejected' },
];

export default function BookingRequests() {
  const { colors,radius } = useTheme();

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      data={requests}
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
          <Text style={{ color: colors.accent }}>{item.status}</Text>
        </View>
      )}
    />
  );
}
