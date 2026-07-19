// app/helpdesk/index.tsx
// Screen 1 — "My tickets", filter tabs (All/Open/In progress/Resolved).

import { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, useRadius } from '../../hooks/useThemeColors';
import { StatusBadge, TicketStatus } from '../../components/StatusBadge';
import { getTickets, Ticket } from '../../lib/helpdesk';
import { useAuth } from '../../lib/useAuth';

const TABS: { key: TicketStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'open', label: 'Open' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'resolved', label: 'Resolved' },
];

export default function MyTicketsScreen() {
  const c = useThemeColors();
  const r = useRadius();
  const { user } = useAuth();
  const [tab, setTab] = useState<(typeof TABS)[number]['key']>('all');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    const data = await getTickets(user.id, tab === 'all' ? undefined : (tab as TicketStatus));
    setTickets(data);
  }, [user, tab]);

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }, [load]);

  return (
    <View style={[styles.screen, { backgroundColor: c.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: c.foreground }]}>My tickets</Text>
        <Pressable onPress={() => router.push('/helpdesk/new')} hitSlop={12}>
          <Ionicons name="add-circle-outline" size={26} color={c.foreground} />
        </Pressable>
      </View>

      <View style={styles.tabRow}>
        {TABS.map((t) => {
          const active = t.key === tab;
          return (
            <Pressable
              key={t.key}
              onPress={() => setTab(t.key)}
              style={[
                styles.tabChip,
                {
                  backgroundColor: active ? c.primary : c.secondary,
                  borderRadius: r['2xl'],
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: active ? c.primaryForeground : c.mutedForeground, fontWeight: active ? '600' : '400' },
                ]}
              >
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {loading ? (
        <ActivityIndicator color={c.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={c.primary} />}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: c.mutedForeground }]}>No tickets here yet.</Text>
          }
          renderItem={({ item }) => (
            <Pressable
              style={[styles.card, { backgroundColor: c.card, borderColor: c.border, borderRadius: r.lg }]}
              onPress={() => router.push(`/helpdesk/${item.id}`)}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardTitle, { color: c.foreground }]}>#{item.ticket_number}</Text>
                <Text style={[styles.cardMeta, { color: c.mutedForeground }]}>{item.subject}</Text>
              </View>
              <StatusBadge status={item.status} />
            </Pressable>
          )}
        />
      )}

      <Pressable
        style={[styles.cta, { backgroundColor: c.primary, borderRadius: r.lg }]}
        onPress={() => router.push('/helpdesk/new')}
      >
        <Text style={[styles.ctaText, { color: c.primaryForeground }]}>+ Raise ticket</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  title: { fontSize: 20, fontWeight: '600' },
  tabRow: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  tabChip: { paddingVertical: 6, paddingHorizontal: 12 },
  tabText: { fontSize: 12 },
  card: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: { fontSize: 14, fontWeight: '600' },
  cardMeta: { fontSize: 12, marginTop: 2 },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 13 },
  cta: { paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  ctaText: { fontWeight: '600', fontSize: 14 },
});