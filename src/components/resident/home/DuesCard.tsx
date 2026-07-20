import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/store/useTheme';

export default function DuesCard() {
  const { colors, radius } = useTheme();
  const router = useRouter();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius['2xl'],
        },
      ]}
    >
      <View>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>July Maintenance Due</Text>
        <Text style={[styles.amount, { color: colors.foreground }]}>₹4,500</Text>
        <Text style={[styles.dueDate, { color: colors.destructive }]}>Due by 25th July</Text>
      </View>
      <TouchableOpacity
        style={[styles.payBtn, { backgroundColor: colors.primary, borderRadius: radius.xl }]}
        onPress={() => router.push('/payments')}
      >
        <Text style={[styles.payText, { color: colors.primaryForeground }]}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  amount: {
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 2,
  },
  dueDate: {
    fontSize: 11,
    fontWeight: '600',
  },
  payBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  payText: {
    fontSize: 13,
    fontWeight: '700',
  },
});