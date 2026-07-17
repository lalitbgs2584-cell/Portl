import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '@/store/useTheme';

const rejected = [
  { id: '1', name: 'Delivery Partner - Ajay', host: 'Flat 303', date: 'July 15, 2026' },
];

export default function RejectedVisitors() {
  const { colors, radius } = useTheme();

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      data={rejected}
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
          <Text style={{ color: colors.cardForeground }}>{item.name}</Text>
          <Text style={{ color: colors.mutedForeground }}>Host: {item.host}</Text>
          <Text style={{ color: colors.mutedForeground }}>Date: {item.date}</Text>
        </View>
      )}
    />
  );
}
