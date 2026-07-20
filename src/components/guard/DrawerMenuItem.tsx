import { useTheme } from '@/store/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  danger?: boolean;
  onPress: () => void;
}

export function DrawerMenuItem({ icon, label, active, danger, onPress }: Props) {
  const { colors, radius } = useTheme();
  const tint = danger ? colors.destructive : active ? colors.primary : colors.foreground;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, { borderRadius: radius.md }, active && { backgroundColor: colors.secondary }]}
    >
      <Ionicons name={icon} size={18} color={tint} />
      <Text style={{ fontSize: 13, marginLeft: 12, color: tint, fontWeight: active || danger ? '600' : '400' }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12 },
});