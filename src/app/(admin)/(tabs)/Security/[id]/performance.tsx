import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/store/useTheme';

// Replace with a real aggregate query by guard id
const METRICS = [
  { label: 'On time', value: 96 },
  { label: 'Visitor handling', value: 90 },
  { label: 'Reports filed', value: 92 },
];

export default function GuardPerformanceScreen() {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {METRICS.map((metric) => (
        <View
          key={metric.label}
          style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg }]}
        >
          <Text style={{ color: colors.foreground, fontSize: 13 }}>{metric.label}</Text>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>{metric.value}%</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    padding: 14,
  },
});
