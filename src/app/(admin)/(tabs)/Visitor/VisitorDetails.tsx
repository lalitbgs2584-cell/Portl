import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/store/useTheme';

export default function VisitorDetails() {
  const { colors, radius } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>Visitor Details</Text>
      <View style={{
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        <Text style={{ color: colors.cardForeground }}>Name: Rahul Sharma</Text>
        <Text style={{ color: colors.cardForeground }}>Type: Delivery</Text>
        <Text style={{ color: colors.cardForeground }}>Host: Flat 101</Text>
        <Text style={{ color: colors.cardForeground }}>Vehicle: OD-02-AB-1234</Text>
        <Text style={{ color: colors.cardForeground }}>Entry: 10:30 AM</Text>
      </View>
    </View>
  );
}
