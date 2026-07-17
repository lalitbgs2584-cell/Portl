import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';

export interface Guard {
  id: string;
  name: string;
  role: string;
  phone: string;
  dutyArea: string;
}

interface GuardCardProps {
  guard: Guard;
  onPress: (guard: Guard) => void;
}

export function GuardCard({ guard, onPress }: GuardCardProps) {
  const { colors, radius } = useTheme();

  return (
    <Pressable
      onPress={() => onPress(guard)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.lg,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: colors.primary, borderRadius: radius.xl }]} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.cardForeground }]} numberOfLines={1}>
          {guard.name}
        </Text>
        <Text style={[styles.role, { color: colors.mutedForeground }]}>{guard.role}</Text>
      </View>
      <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
  },
  role: {
    fontSize: 11,
    marginTop: 2,
  },
});
