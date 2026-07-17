import React, { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';
import { NoticeStatusBadge } from '@/components/admin/notices/NoticeStatusBadge';

// Replace with a real fetch by `id`
const MOCK_NOTICE = {
  id: '1',
  title: 'Water maintenance',
  content: 'Water supply will be affected...',
  status: 'published' as const,
  publishDate: '18/05/2024',
  postedBy: 'Admin',
};

export default function NoticeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, radius } = useTheme();
  const [deleteVisible, setDeleteVisible] = useState(false);

  const notice = MOCK_NOTICE; // fetched using `id` in a real implementation

  const handleDelete = () => {
    // TODO: delete from Supabase `notices` table
    setDeleteVisible(false);
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>{notice.title}</Text>
      <View style={styles.metaRow}>
        <NoticeStatusBadge status={notice.status} />
        <Text style={{ fontSize: 11, color: colors.mutedForeground, marginLeft: 8 }}>{notice.publishDate}</Text>
      </View>

      <Text style={[styles.label, { color: colors.mutedForeground }]}>Content</Text>
      <Text style={[styles.value, { color: colors.foreground }]}>{notice.content}</Text>

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 14 }]}>Posted by</Text>
      <Text style={[styles.value, { color: colors.foreground }]}>{notice.postedBy}</Text>

      <View style={styles.actionRow}>
        <Pressable
          onPress={() => router.push(`./${id}/edit`)}
          style={[styles.actionButton, { borderColor: colors.border, borderRadius: radius.md }]}
        >
          <Feather name="edit-2" size={14} color={colors.foreground} />
          <Text style={{ color: colors.foreground, fontSize: 12, marginLeft: 6 }}>Edit</Text>
        </Pressable>
        <Pressable
          onPress={() => setDeleteVisible(true)}
          style={[styles.actionButton, { borderColor: colors.destructive, borderRadius: radius.md }]}
        >
          <Feather name="trash-2" size={14} color={colors.destructive} />
          <Text style={{ color: colors.destructive, fontSize: 12, marginLeft: 6 }}>Delete</Text>
        </Pressable>
      </View>

      <Modal visible={deleteVisible} transparent animationType="fade" onRequestClose={() => setDeleteVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.card, borderRadius: radius.xl }]}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
              Delete notice
            </Text>
            <View style={[styles.warningBox, { backgroundColor: colors.background, borderColor: colors.destructive, borderRadius: radius.lg }]}>
              <Text style={{ fontSize: 12, color: colors.foreground }}>
                Are you sure you want to delete this notice?
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
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 13,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
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