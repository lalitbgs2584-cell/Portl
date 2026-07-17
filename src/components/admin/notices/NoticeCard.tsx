import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';
import { NoticeStatusBadge, NoticeStatus } from './NoticeStatusBadge';

export interface Notice {
  id: string;
  title: string;
  content: string;
  status: NoticeStatus;
  publishDate: string; // display string, e.g. "18/05/2024"
  postedBy: string;
}

interface NoticeCardProps {
  notice: Notice;
  onPress: (notice: Notice) => void;
}

export function NoticeCard({ notice, onPress }: NoticeCardProps) {
  const { colors, radius } = useTheme();

  return (
    <Pressable
      onPress={() => onPress(notice)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius.lg,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.left}>
        <Feather name="bell" size={14} color={colors.primary} style={{ marginRight: 8 }} />
        <Text style={[styles.title, { color: colors.cardForeground }]} numberOfLines={1}>
          {notice.title}
        </Text>
      </View>
      <NoticeStatusBadge status={notice.status} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    flexShrink: 1,
  },
});