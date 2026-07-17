
import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, Image } from 'react-native';


export default function AmenityDetails() {
  const { colors,radius } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Image source={{ uri: 'https://via.placeholder.com/150' }} style={{ width: '100%', height: 200, borderRadius: radius.lg }} />
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold', marginTop: 16 }}>Clubhouse</Text>
      <Text style={{ color: colors.mutedForeground }}>Type: Common Area</Text>
      <Text style={{ color: colors.mutedForeground }}>Capacity: 50</Text>
      <Text style={{ color: colors.mutedForeground }}>Location: Block A, Ground Floor</Text>
      <Text style={{ color: colors.foreground, marginTop: 8 }}>Large space for events and gatherings</Text>
    </View>
  );
}
