import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusBadgeProps {
  status: 'active' | 'closed';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { colors, radius } = useTheme();
  const isActive = status === 'active';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: isActive ? colors.secondary : colors.muted,
          borderRadius: radius.sm,
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.secondaryForeground }]}>
        {isActive ? 'Active' : 'Closed'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
  },
});