import { useTheme } from '@/store/useTheme';
import { VisitorEntry } from '@/types/guard.types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PURPOSE_ICON: Record<VisitorEntry['visitType'], keyof typeof Ionicons.glyphMap> = {
  guest: 'person-outline',
  delivery: 'cube-outline',
  service: 'construct-outline',
  staff: 'construct-outline',
  emergency: 'construct-outline',
};

const SOURCE_LABEL: Record<VisitorEntry['approvalMethod'], string> = {
  resident: 'Resident',
  qr: 'QR Code',
  guard: 'Guard',
  admin: 'Admin',
};

interface Props {
  visitor: VisitorEntry;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function EntryRequestCard({ visitor, onApprove, onReject }: Props) {
  const { colors, radius } = useTheme();
  const time = new Date(visitor.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg }]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.muted, borderRadius: radius.md }]}>
        <Ionicons name={PURPOSE_ICON[visitor.visitType]} size={18} color={colors.primary} />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground }}>{visitor.name}</Text>
        <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 2 }}>
          {visitor.visitingFlat} · {time} · {SOURCE_LABEL[visitor.approvalMethod]}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => onApprove(visitor.id)}
          style={[styles.actionBtn, { backgroundColor: '#DCF3E7', borderRadius: radius.md }]}
        >
          <Ionicons name="checkmark" size={18} color="#1F7A4D" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onReject(visitor.id)}
          style={[styles.actionBtn, { backgroundColor: '#FBE1DE', borderRadius: radius.md, marginLeft: 8 }]}
        >
          <Ionicons name="close" size={18} color="#B3271E" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, marginBottom: 10 },
  iconWrap: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  actions: { flexDirection: 'row' },
  actionBtn: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center' },
});