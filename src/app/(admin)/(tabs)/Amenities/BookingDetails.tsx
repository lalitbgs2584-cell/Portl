import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, Button } from 'react-native';


export default function BookingDetails() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>Booking Details</Text>
      <Text style={{ color: colors.cardForeground, marginTop: 8 }}>Resident: Rahul Sharma</Text>
      <Text style={{ color: colors.cardForeground }}>Amenity: Clubhouse</Text>
      <Text style={{ color: colors.cardForeground }}>Date: May 20, 2024</Text>
      <Text style={{ color: colors.cardForeground }}>Time: 4:00 PM – 6:00 PM</Text>
      <Text style={{ color: colors.cardForeground, marginTop: 8 }}>Purpose: Birthday Party</Text>
      <Button title="Cancel Booking" onPress={() => {}} color={colors.destructive} />
    </View>
  );
}
