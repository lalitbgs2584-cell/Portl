import React, { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';

// Replace with a real fetch by `id`
const MOCK_GUARD = {
  id: '1',
  name: 'Rahul Sharma',
  role: 'Security guard',
  phone: '9876543210',
  entryHall: 'Block A',
};

export default function GuardProfileTab() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, radius } = useTheme();
  const [deleteVisible, setDeleteVisible] = useState(false);

  const guard = MOCK_GUARD; // fetched using `id` in a real implementation

  const handleDelete = () => {
    // TODO: delete from Supabase `guards` table
    setDeleteVisible(false);
    router.replace('../../../');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary, borderRadius: radius.xl }]} />
        <View>
          <Text style={[styles.name, { color: colors.foreground }]}>{guard.name}</Text>
          <Text style={[styles.role, { color: colors.mutedForeground }]}>{guard.role}</Text>
        </View>
      </View>

      <Text style={[styles.label, { color: colors.mutedForeground }]}>Phone</Text>
      <Text style={[styles.value, { color: colors.foreground }]}>{guard.phone}</Text>

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 12 }]}>Entry hall</Text>
      <Text style={[styles.value, { color: colors.foreground }]}>{guard.entryHall}</Text>

      <View style={styles.linkRow}>
        <Pressable
          onPress={() => router.push('../../performance')}
          style={[styles.linkButton, { borderColor: colors.border, borderRadius: radius.md }]}
        >
          <Feather name="bar-chart-2" size={14} color={colors.foreground} />
          <Text style={{ color: colors.foreground, fontSize: 12, marginLeft: 6 }}>Performance</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('../../logs')}
          style={[styles.linkButton, { borderColor: colors.border, borderRadius: radius.md }]}
        >
          <Feather name="list" size={14} color={colors.foreground} />
          <Text style={{ color: colors.foreground, fontSize: 12, marginLeft: 6 }}>Activity log</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => setDeleteVisible(true)}
        style={[styles.deleteButton, { borderColor: colors.destructive, borderRadius: radius.md }]}
      >
        <Feather name="trash-2" size={14} color={colors.destructive} />
        <Text style={{ color: colors.destructive, fontSize: 12, marginLeft: 6 }}>Delete guard</Text>
      </Pressable>

      <Modal visible={deleteVisible} transparent animationType="fade" onRequestClose={() => setDeleteVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.card, borderRadius: radius.xl }]}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
              Delete guard
            </Text>
            <View style={[styles.warningBox, { backgroundColor: colors.background, borderColor: colors.destructive, borderRadius: radius.lg }]}>
              <Text style={{ fontSize: 12, color: colors.foreground }}>
                Are you sure you want to delete {guard.name}?
              </Text>
            </View>
            <View style={styles.modalActions}>
              <Pressable
                onPress={handleDelete}
                style={[styles.modalButton, { backgroundColor: colors.destructive, borderRadius: radius.md }]}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>Delete</Text>
              </Pressable>
              <Pressable
                onPress={() => setDeleteVisible(false)}
                style={[styles.modalButton, { borderColor: colors.border, borderWidth: 1, borderRadius: radius.md }]}
              >
                <Text style={{ color: colors.foreground, fontSize: 12 }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  role: {
    fontSize: 12,
    marginTop: 2,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 13,
  },
  linkRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  linkButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingVertical: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingVertical: 10,
    marginTop: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    padding: 16,
  },
  warningBox: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});
