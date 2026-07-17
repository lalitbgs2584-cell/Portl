import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { useTheme } from '@/store/useTheme';

const visitors = [
  { id: '1', name: 'Rahul Sharma', host: 'Flat 101' },
  { id: '2', name: 'Priya Verma', host: 'Flat 202' },
];

export default function VisitorSearch() {
  const { colors, radius } = useTheme();
  const [query, setQuery] = useState('');

  const filtered = visitors.filter(v => v.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>Visitor Search</Text>
      <TextInput
        placeholder="Search by name"
        placeholderTextColor={colors.mutedForeground}
        value={query}
        onChangeText={setQuery}
        style={{
          backgroundColor: colors.card,
          color: colors.cardForeground,
          borderRadius: radius.md,
          borderWidth: 1,
          borderColor: colors.input,
          padding: 12,
          marginTop: 16,
        }}
      />
      <FlatList
        style={{ marginTop: 16 }}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: colors.card,
            padding: 16,
            marginVertical: 8,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: colors.border,
          }}>
            <Text style={{ color: colors.cardForeground }}>{item.name}</Text>
            <Text style={{ color: colors.mutedForeground }}>Host: {item.host}</Text>
          </View>
        )}
      />
    </View>
  );
}
