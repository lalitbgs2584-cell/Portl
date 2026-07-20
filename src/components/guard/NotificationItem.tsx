
import { useTheme } from '@/store/useTheme';
import { NotificationType,AppNotification } from '@/types/guard.types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TYPE_ICON: Record<NotificationType, keyof typeof Ionicons.glyphMap> = {
  visitor_approved: 'checkmark-circle-outline',
  visitor_rejected: 'close-circle-outline',
  leave_status: 'calendar-outline',
  admin_message: 'megaphone-outline',
  handover: 'swap-horizontal-outline',
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function NotificationItem({
  notification,
  onPress,
}: {
  notification: AppNotification;
  onPress: () => void;
}) {
  const { colors, radius } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.row,
        {
          backgroundColor: notification.read ? colors.card : colors.muted,
          borderColor: colors.border,
          borderRadius: radius.lg,
        },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.secondary, borderRadius: radius.md }]}>
        <Ionicons name={TYPE_ICON[notification.type]} size={18} color={colors.secondaryForeground} />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ fontSize: 13, fontWeight: notification.read ? '400' : '600', color: colors.foreground }}>
          {notification.title}
        </Text>
        <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 2 }} numberOfLines={2}>
          {notification.body}
        </Text>
        <Text style={{ fontSize: 11, color: colors.mutedForeground, marginTop: 4 }}>{timeAgo(notification.createdAt)}</Text>
      </View>

      {!notification.read && <View style={[styles.dot, { backgroundColor: colors.primary }]} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', padding: 12, borderWidth: 1, marginBottom: 8 },
  iconWrap: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginLeft: 8, marginTop: 4 },
});