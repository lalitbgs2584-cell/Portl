import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
}

export default function EmptyState({ icon = 'file-tray-outline', title, description }: EmptyStateProps) {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
      <Ionicons name={icon} size={40} color={colors.mutedForeground} style={{ marginBottom: 10 }} />
      <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      {description && <Text style={[styles.desc, { color: colors.mutedForeground }]}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginVertical: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  desc: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
});