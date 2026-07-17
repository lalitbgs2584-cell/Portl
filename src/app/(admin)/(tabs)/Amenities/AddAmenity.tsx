// src/app/(admin)/(tabs)/Amenities/AddAmenity.tsx
import { useTheme } from '@/store/useTheme';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';


export default function AddAmenity() {
  const { colors,radius } = useTheme();
  const [name, setName] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>
        Add Amenity
      </Text>

      <TextInput
        placeholder="Amenity Name"
        placeholderTextColor={colors.mutedForeground}
        value={name}
        onChangeText={setName}
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

      <Button title="Save" onPress={() => {}} color={colors.primary} />
    </View>
  );
}
