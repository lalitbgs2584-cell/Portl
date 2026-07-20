import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { useTheme } from '@/store/useTheme';

export default function QuickActionGrid() {
  const { colors, radius } = useTheme();
  const router = useRouter();

  const actions = [
    { label: 'Pre-Approve', icon: 'person-add-outline', route: '/preapprove' },
    { label: 'Book Amenity', icon: 'calendar-outline', route: '/amenities' },
    { label: 'Helpdesk', icon: 'build-outline', route: '/helpdesk' },
    { label: 'Pay Dues', icon: 'card-outline', route: '/payments' },
  ];

  return (
    <View style={styles.grid}>
      {actions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: radius['2xl'],
            },
          ]}
          onPress={() => router.push(item.route as any)}
        >
          <View style={[styles.iconBox, { backgroundColor: colors.muted, borderRadius: radius.xl }]}>
            <Ionicons name={item.icon as any} size={22} color={colors.primary} />
          </View>
          <Text style={[styles.label, { color: colors.foreground }]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  iconBox: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});