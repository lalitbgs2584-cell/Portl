import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/store/useTheme';

export default function AmenityUsageReport() {
  const { colors,radius } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>Amenity Usage Report</Text>
      <View style={{
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        <Text style={{ color: colors.cardForeground }}>Total Bookings: 156</Text>
        <Text style={{ color: colors.cardForeground }}>Total Hours: 420</Text>
        <Text style={{ color: colors.cardForeground }}>Utilization Rate: 65%</Text>
      </View>
      {/* Replace with chart library like Victory or Recharts */}
      <View style={{
        backgroundColor: colors.secondary,
        borderRadius: radius.md,
        padding: 32,
        marginTop: 16,
      }}>
        <Text style={{ color: colors.secondaryForeground }}>Chart Placeholder</Text>
      </View>
    </View>
  );
}
