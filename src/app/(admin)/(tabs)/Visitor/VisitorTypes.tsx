import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/store/useTheme';

export default function VisitorTypes() {
  const { colors, radius } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>Visitor Types</Text>
      <View style={{
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        <Text style={{ color: colors.cardForeground }}>Guest: 52%</Text>
        <Text style={{ color: colors.cardForeground }}>Delivery: 32%</Text>
        <Text style={{ color: colors.cardForeground }}>Service Staff: 10%</Text>
        <Text style={{ color: colors.cardForeground }}>Cab/Ride: 6%</Text>
      </View>
    </View>
  );
}
