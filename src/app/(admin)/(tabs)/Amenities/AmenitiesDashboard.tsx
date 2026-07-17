import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function AmenitiesDashboard() {
  const { colors,radius } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>Amenities Dashboard</Text>
      <View style={{
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        <Text style={{ color: colors.cardForeground }}>Total Amenities: 12</Text>
        <Text style={{ color: colors.cardForeground }}>Total Bookings: 156</Text>
        <Text style={{ color: colors.cardForeground }}>Today’s Bookings: 8</Text>
        <Text style={{ color: colors.cardForeground }}>Utilization Rate: 65%</Text>
      </View>
    </ScrollView>
  );
}
