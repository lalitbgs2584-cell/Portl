import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '@/store/useTheme';

const requests = [
  { id: '1', name: 'Delivery Partner', host: 'Flat 303', status: 'Pending' },
  { id: '2', name: 'Guest - Neha Gupta', host: 'Flat 404', status: 'Pending' },
];

export default function EntryRequests() {
  const { colors, radius } = useTheme();

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
          <Text style={{ color: colors.cardForeground }}>{item.name}</Text>
          <Text style={{ color: colors.mutedForeground }}>Host: {item.host}</Text>
          <Text style={{ color: colors.accent }}>Status: {item.status}</Text>
        </View>
      )}
    />
  );
}
