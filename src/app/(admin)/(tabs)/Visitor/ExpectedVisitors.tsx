import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '@/store/useTheme';

const expected = [
  { id: '1', name: 'Guest - Arjun Mehta', date: 'July 18, 2026', status: 'Pending' },
];

export default function ExpectedVisitors() {
  const { colors, radius } = useTheme();

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      data={expected}
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
          <Text style={{ color: colors.mutedForeground }}>Date: {item.date}</Text>
          <Text style={{ color: colors.accent }}>Status: {item.status}</Text>
        </View>
      )}
    />
  );
}
