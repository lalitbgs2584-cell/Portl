import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/store/useTheme';

export type NoticeStatus = 'published' | 'scheduled' | 'archived';

interface NoticeStatusBadgeProps {
  status: NoticeStatus;
}

const LABELS: Record<NoticeStatus, string> = {
  published: 'Published',
  scheduled: 'Scheduled',
  archived: 'Archived',
};

export function NoticeStatusBadge({ status }: NoticeStatusBadgeProps) {
  const { colors, radius } = useTheme();
  const isPublished = status === 'published';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.muted,
          borderColor: isPublished ? colors.primary : colors.border,
          borderRadius: radius.sm,
        },
      ]}
    >
      <Text style={{ fontSize: 10, fontWeight: '600', color: isPublished ? colors.primary : colors.mutedForeground }}>
        {LABELS[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
});