import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '@/store/useTheme';

const history = [
  { id: '1', resident: 'Rahul Sharma', amenity: 'Clubhouse', date: 'May 10, 2024' },
  { id: '2', resident: 'Priya Verma', amenity: 'Gym', date: 'May 12, 2024' },
];

export default function BookingHistory() {
  const { colors,radius } = useTheme();

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      data={history}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{
          backgroundColor: colors.card,
          padding: 16,
          margin: 8,
          borderRadius:radius.md,
          borderWidth: 1,
          borderColor: colors.border,
        }}>
          <Text style={{ color: colors.cardForeground }}>{item.resident}</Text>
          <Text style={{ color: colors.mutedForeground }}>{item.amenity}</Text>
          <Text style={{ color: colors.mutedForeground }}>{item.date}</Text>
        </View>
      )}
    />
  );
}
