
import { useTheme } from '@/store/useTheme';
import { VisitorEntry } from '@/types/guard.types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PURPOSE_ICON: Record<VisitorEntry['purpose'], keyof typeof Ionicons.glyphMap> = {
  guest: 'person-outline',
  delivery: 'cube-outline',
  service: 'construct-outline',
  cab: 'car-outline',
  other: 'ellipsis-horizontal-outline',
};

const STATUS_STYLE: Record<VisitorEntry['status'], { bg: string; fg: string; label: string }> = {
  pending: { bg: '#F0E6DA', fg: '#8B6F52', label: 'Pending' },
  approved: { bg: '#DCF3E7', fg: '#1F7A4D', label: 'Approved' },
  rejected: { bg: '#FBE1DE', fg: '#B3271E', label: 'Rejected' },
};

export function VisitorCard({ visitor }: { visitor: VisitorEntry }) {
  const { colors, radius } = useTheme();
  const status = STATUS_STYLE[visitor.status];
  const timeAgo = new Date(visitor.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg }]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.muted, borderRadius: radius.md }]}>
        <Ionicons name={PURPOSE_ICON[visitor.purpose]} size={18} color={colors.primary} />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground }}>{visitor.name}</Text>
        <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 2 }}>
          {visitor.visitingFlat} · {timeAgo}
        </Text>
      </View>

      <View style={[styles.badge, { backgroundColor: status.bg, borderRadius: radius.sm }]}>
        <Text style={{ fontSize: 11, color: status.fg, fontWeight: '600' }}>{status.label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, marginBottom: 10 },
  iconWrap: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4 },
});