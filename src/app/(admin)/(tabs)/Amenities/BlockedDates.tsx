import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, FlatList } from 'react-native';


const blocked = [
  { id: '1', amenity: 'Clubhouse', reason: 'Maintenance', date: 'May 15, 2024' },
  { id: '2', amenity: 'Pool', reason: 'Cleaning', date: 'May 16, 2024' },
];

export default function BlockedDates() {
  const { colors,radius } = useTheme();

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      data={blocked}
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
          <Text style={{ color: colors.cardForeground }}>{item.amenity}</Text>
          <Text style={{ color: colors.mutedForeground }}>Reason: {item.reason}</Text>
          <Text style={{ color: colors.mutedForeground }}>Date: {item.date}</Text>
        </View>
      )}
    />
  );
}
