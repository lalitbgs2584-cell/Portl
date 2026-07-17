import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/store/useTheme';

export default function VisitorAnalytics() {
  const { colors, radius } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: 16 }}>
      <Text style={{ color: colors.foreground, fontSize: 20, fontWeight: 'bold' }}>Visitor Analytics</Text>
      <View style={{
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: 32,
        marginTop: 16,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        <Text style={{ color: colors.cardForeground }}>Visitors Over Time (Chart Placeholder)</Text>
        <Text style={{ color: colors.cardForeground, marginTop: 8 }}>Approved: 500</Text>
        <Text style={{ color: colors.cardForeground }}>Rejected: 100</Text>
        <Text style={{ color: colors.cardForeground }}>Pending: 50</Text>
      </View>
    </View>
  );
}
