import { useTheme } from '@/store/useTheme';
import { Shift } from '@/types/guard.types';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  visible: boolean;
  shift: Shift | null;
  onClose: () => void;
  onStartHandover: (shiftId: string) => void;
}

const STATUS_COPY: Record<Shift['status'], { label: string; bg: string; fg: string }> = {
  active: { label: 'Present', bg: '#DCF3E7', fg: '#1F7A4D' },
  completed: { label: 'Completed', bg: '#E8D9C5', fg: '#4B3621' },
  upcoming: { label: 'Upcoming', bg: '#F0E6DA', fg: '#8B6F52' },
  missed: { label: 'Missed', bg: '#FBE1DE', fg: '#B3271E' },
};

export function ShiftDetailSheet({ visible, shift, onClose, onStartHandover }: Props) {
  const { colors, radius } = useTheme();
  if (!shift) return null;
  const status = STATUS_COPY[shift.status];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[
            styles.sheet,
            { backgroundColor: colors.card, borderTopLeftRadius: radius['3xl'], borderTopRightRadius: radius['3xl'] },
          ]}
        >
          <View style={[styles.grabber, { backgroundColor: colors.border }]} />

          <View style={styles.headerRow}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.foreground }}>{shift.label}</Text>
            <View style={[styles.badge, { backgroundColor: status.bg, borderRadius: radius.sm }]}>
              <Text style={{ fontSize: 12, color: status.fg, fontWeight: '600' }}>{status.label}</Text>
            </View>
          </View>

          <Text style={{ fontSize: 13, color: colors.mutedForeground, marginTop: 6 }}>
            {shift.startTime} – {shift.endTime} · {shift.gate}
          </Text>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {shift.attendance ? (
            <View>
              <Text style={{ fontSize: 12, color: colors.mutedForeground }}>Attendance marked by</Text>
              <Text style={{ fontSize: 14, color: colors.foreground, fontWeight: '500', marginTop: 2 }}>
                {shift.attendance.markedByGuardName} (handover)
              </Text>
            </View>
          ) : shift.status === 'upcoming' ? (
            <Pressable
              onPress={() => {
                onClose();
                onStartHandover(shift.id);
              }}
              style={[styles.actionBtn, { backgroundColor: colors.primary, borderRadius: radius.lg }]}
            >
              <Text style={{ color: colors.primaryForeground, fontWeight: '600' }}>Start handover</Text>
            </Pressable>
          ) : (
            <Text style={{ fontSize: 13, color: colors.destructive }}>No attendance recorded for this shift.</Text>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: { padding: 20, paddingBottom: 32 },
  grabber: { width: 36, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4 },
  divider: { height: 1, marginVertical: 16 },
  actionBtn: { paddingVertical: 14, alignItems: 'center', marginTop: 4 },
});