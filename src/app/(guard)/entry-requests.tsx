import { EntryRequestCard } from '@/components/guard/EntryRequestCard';
import { VisitorCard } from '@/components/guard/VisitorCard';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { useTheme } from '@/store/useTheme';
import { VisitorEntry } from '@/types/guard.types';

import React, { useMemo, useState } from 'react';
import { FlatList,  StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FilterTab = 'pending' | 'approved' | 'rejected';

// TODO: replace with Supabase Realtime subscription on `visitor_entries` where status = 'pending'
const MOCK_REQUESTS: VisitorEntry[] = [
  { id: 'r1', name: 'Suresh Yadav', phone: '9876511111', visitType: 'guest', visitingFlat: 'B-102', status: 'pending', approvalMethod: 'resident', createdAt: '2026-07-20T10:35:00' },
  { id: 'r2', name: 'Flipkart Delivery', phone: '9876511112', visitType: 'delivery', visitingFlat: 'Gate 2', status: 'pending', approvalMethod: 'resident', createdAt: '2026-07-20T10:30:00' },
  { id: 'r3', name: 'Pooja Mehta', phone: '9876511113', visitType: 'guest', visitingFlat: 'A-201', status: 'pending', approvalMethod: 'resident', createdAt: '2026-07-20T10:25:00' },
  { id: 'r4', name: 'Rahul Mehta', phone: '9876543210', visitType: 'guest', visitingFlat: 'A-101', status: 'approved', approvalMethod: 'resident', createdAt: '2026-07-20T09:30:00' },
];

export default function EntryRequestsScreen() {
  const { colors } = useTheme();
  const [filter, setFilter] = useState<FilterTab>('pending');
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const filtered = useMemo(() => requests.filter((r) => r.status === filter), [requests, filter]);
  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  const handleApprove = (id: string) => {
    // TODO: update Supabase `visitor_entries.status = 'approved'`, notify resident (informational, not blocking)
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)));
  };

  const handleReject = (id: string) => {
    // TODO: update Supabase `visitor_entries.status = 'rejected'`, notify resident
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>
          Entry requests
        </Text>
        <SegmentedControl
          value={filter}
          onChange={setFilter}
          options={[
            { label: `Pending${pendingCount > 0 ? ` (${pendingCount})` : ''}`, value: 'pending' },
            { label: 'Approved', value: 'approved' },
            { label: 'Rejected', value: 'rejected' },
          ]}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) =>
          item.status === 'pending' ? (
            <EntryRequestCard visitor={item} onApprove={handleApprove} onReject={handleReject} />
          ) : (
            <VisitorCard visitor={item} />
          )
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: colors.mutedForeground, marginTop: 40, fontSize: 13 }}>
            Nothing here right now.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});