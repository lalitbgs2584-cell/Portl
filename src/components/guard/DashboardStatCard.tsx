import { useTheme } from '@/store/useTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  value: string | number;
  label: string;
}

export function DashboardStatCard({ value, label }: Props) {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.muted, borderRadius: radius.lg }]}>
      <Text style={{ fontSize: 22, fontWeight: '600', color: colors.foreground }}>{value}</Text>
      <Text style={{ fontSize: 11, color: colors.mutedForeground, marginTop: 2 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, padding: 12 },
});