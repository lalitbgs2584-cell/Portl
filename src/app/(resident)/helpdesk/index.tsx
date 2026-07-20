import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { Ticket } from '@/types/resident.types';
import { useRouter } from 'expo-router';
import StatusPill from '@/components/resident/StatusPill';
import { useTheme } from '@/store/useTheme';

const mockTickets: Ticket[] = [
  { id: '1', code: '#T1', title: 'Water leakage in master bathroom', category: 'Plumbing', updatedAt: '2 hrs ago', status: 'In Progress', description: '' },
  { id: '2', code: '#T2', title: 'Elevator sound on 12th floor', category: 'Elevator', updatedAt: 'Yesterday', status: 'Resolved', description: '' },
];

export default function HelpdeskScreen() {
  const { colors, radius } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Helpdesk" showSearch={false} />
      
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: colors.primary, borderRadius: radius.xl }]}
          onPress={() => router.push('/helpdesk/new')}
        >
          <Text style={{ color: colors.primaryForeground, fontWeight: '700' }}>+ Raise New Complaint</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockTickets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}
            onPress={() => router.push(`/helpdesk/${item.id}` as any)}
          >
            <View style={styles.headerRow}>
              <Text style={[styles.code, { color: colors.primary }]}>{item.code}</Text>
              <StatusPill status={item.status} />
            </View>
            <Text style={[styles.title, { color: colors.foreground }]}>{item.title}</Text>
            <Text style={[styles.sub, { color: colors.mutedForeground }]}>{item.category} · {item.updatedAt}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 16, paddingVertical: 8 },
  addBtn: { height: 44, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 16, borderWidth: 1, marginBottom: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  code: { fontWeight: '700', fontSize: 13 },
  title: { fontSize: 15, fontWeight: '700' },
  sub: { fontSize: 12, marginTop: 4 },
});