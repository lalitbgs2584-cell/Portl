import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';


export default function VisitorAlertBanner({ onApprove, onDeny }: { onApprove: () => void; onDeny: () => void }) {
  const { colors, radius } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.accent + '20',
          borderColor: colors.accent,
          borderRadius: radius['2xl'],
        },
      ]}
    >
      <View style={styles.header}>
        <Ionicons name="warning-outline" size={20} color={colors.accent} />
        <Text style={[styles.title, { color: colors.foreground }]}>Visitor Waiting at Gate</Text>
      </View>
      <Text style={[styles.desc, { color: colors.mutedForeground }]}>
        Ramesh Kumar (Amazon Delivery) is requesting entry for unit B-1204.
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.denyBtn, { borderColor: colors.destructive, borderRadius: radius.xl }]}
          onPress={onDeny}
        >
          <Text style={[styles.btnText, { color: colors.destructive }]}>Deny</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.primary, borderRadius: radius.xl }]}
          onPress={onApprove}
        >
          <Text style={[styles.btnText, { color: colors.primaryForeground }]}>Allow Entry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  desc: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  denyBtn: {
    borderWidth: 1,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
  },
});