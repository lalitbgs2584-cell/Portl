import { useTheme } from '@/store/useTheme';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';


export default function EditAmenity() {
  const { colors,radius } = useTheme();
  const [name, setName] = useState('Clubhouse');

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>Edit Amenity</Text>
      <TextInput
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
      <Button title="Update" onPress={() => {}} color={colors.primary} />
    </View>
  );
}
