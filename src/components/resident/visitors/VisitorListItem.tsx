import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Visitor } from '@/types/resident.types';
import { useTheme } from '@/store/useTheme';
import StatusPill from '../StatusPill';



export default function VisitorListItem({ visitor }: { visitor: Visitor }) {
  const { colors, radius } = useTheme();

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
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.foreground }]}>{visitor.name}</Text>
          <Text style={[styles.sub, { color: colors.mutedForeground }]}>
            {visitor.company ? `${visitor.company} · ` : ''}
            {visitor.time}
          </Text>
        </View>
        <StatusPill status={visitor.status} />
      </View>

      {visitor.status === 'PENDING' && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.btn, { borderColor: colors.destructive }]}>
            <Text style={{ color: colors.destructive, fontWeight: '600' }}>Deny</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primary }]}>
            <Text style={{ color: colors.primaryForeground, fontWeight: '600' }}>Approve</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  sub: {
    fontSize: 12,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  btn: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});