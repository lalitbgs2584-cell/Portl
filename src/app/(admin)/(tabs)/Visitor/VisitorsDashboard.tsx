import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/store/useTheme';

export default function VisitorsDashboard() {
  const { colors, radius } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>Visitors Dashboard</Text>
      <View style={{
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: 16,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        <Text style={{ color: colors.cardForeground }}>Today: 24</Text>
        <Text style={{ color: colors.cardForeground }}>This Week: 136</Text>
        <Text style={{ color: colors.cardForeground }}>This Month: 612</Text>
        <Text style={{ color: colors.cardForeground }}>Avg Daily: 20</Text>
      </View>
    </ScrollView>
  );
}
