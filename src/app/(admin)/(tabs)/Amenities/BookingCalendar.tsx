import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text } from 'react-native';


export default function BookingCalendar() {
  const { colors,radius } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>Booking Calendar</Text>
      {/* Replace with a real calendar component */}
      <View style={{
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: 32,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        <Text style={{ color: colors.cardForeground }}>Calendar Placeholder</Text>
      </View>
    </View>
  );
}
