import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTheme } from '@/store/useTheme';

const visitors = [
  { id: '1', name: 'Rahul Sharma', host: 'Flat 101', status: 'Approved' },
  { id: '2', name: 'Priya Verma', host: 'Flat 202', status: 'Exited' },
];

export default function VisitorList() {
  const { colors, radius } = useTheme();

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      data={visitors}
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
