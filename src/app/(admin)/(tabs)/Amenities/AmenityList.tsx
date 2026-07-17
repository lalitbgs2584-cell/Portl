// src/app/(admin)/(tabs)/Amenities/AmenityList.tsx
import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, FlatList } from 'react-native';


const amenities = [
  { id: '1', name: 'Clubhouse', type: 'Common Area', capacity: 50 },
  { id: '2', name: 'Gym', type: 'Indoor', capacity: 20 },
  { id: '3', name: 'Swimming Pool', type: 'Outdoor', capacity: 30 },
];

export default function AmenityList() {
  const { colors,radius } = useTheme();

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      data={amenities}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: colors.card,
            padding: 16,
            margin: 8,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.cardForeground, fontSize: 16, fontWeight: '600' }}>
            {item.name}
          </Text>
          <Text style={{ color: colors.mutedForeground }}>{item.type}</Text>
          <Text style={{ color: colors.mutedForeground }}>Capacity: {item.capacity}</Text>
        </View>
      )}
    />
  );
}
