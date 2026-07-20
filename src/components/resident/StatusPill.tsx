import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusPillProps {
  status: string;
}

export default function StatusPill({ status }: StatusPillProps) {
  const { colors, radius } = useTheme();

  let bg = colors.muted;
  let text = colors.mutedForeground;

  if (status === 'In Progress' || status === 'Assigned') {
    bg = colors.accent + '25';
    text = colors.accent;
  } else if (status === 'Resolved' || status === 'APPROVED') {
    bg = colors.success + '25';
    text = colors.success;
  } else if (status === 'PENDING') {
    bg = colors.accent + '30';
    text = colors.accentForeground;
  } else if (status === 'DENIED' || status === 'Open') {
    bg = colors.destructive + '20';
    text = colors.destructive;
  }

  return (
    <View style={[styles.pill, { backgroundColor: bg, borderRadius: radius.xl }]}>
      <Text style={[styles.text, { color: text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});