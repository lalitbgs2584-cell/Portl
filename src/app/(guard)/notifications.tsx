import { NotificationItem } from '@/components/guard/NotificationItem';
import { useTheme } from '@/store/useTheme';
import { AppNotification } from '@/types/guard.types';

import { router } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// TODO: replace with Supabase Realtime subscription scoped to current guard
const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 'n1', type: 'visitor_approved', title: 'Visitor approved', body: 'Rahul Mehta approved by A-101', createdAt: '2026-07-20T10:40:00', read: false, relatedRoute: '/(guard)/(tabs)/visitors' },
  { id: 'n2', type: 'handover', title: 'Shift handover confirmed', body: 'Ramesh K. confirmed your morning shift', createdAt: '2026-07-20T08:02:00', read: false, relatedRoute: '/(guard)/(tabs)/shift' },
  { id: 'n3', type: 'leave_status', title: 'Leave approved', body: 'Your casual leave for 28–29 Jul was approved', createdAt: '2026-07-18T16:00:00', read: true, relatedRoute: '/(guard)/leave' },
  { id: 'n4', type: 'visitor_rejected', title: 'Visitor rejected', body: 'Anil Verma rejected by C-305', createdAt: '2026-07-20T08:50:00', read: true, relatedRoute: '/(guard)/(tabs)/visitors' },
];

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handlePress = (item: AppNotification) => {
    setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)));
    if (item.relatedRoute) router.push(item.relatedRoute as any);
  };

  const markAllRead = () => {
    // TODO: bulk update Supabase `notifications.read` for current guard
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerRow}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground }}>
          Notifications{unreadCount > 0 ? ` (${unreadCount})` : ''}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={{ fontSize: 12, color: colors.primary, fontWeight: '600' }}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        renderItem={({ item }) => <NotificationItem notification={item} onPress={() => handlePress(item)} />}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: colors.mutedForeground, marginTop: 40, fontSize: 13 }}>
            No notifications yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 },
});