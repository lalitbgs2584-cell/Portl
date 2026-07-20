import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { VisitorCard } from '@/components/guard/VisitorCard';
import { useTheme } from '@/store/useTheme';
import { VisitorEntry } from '@/types/guard.types';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FilterTab = 'all' | 'pending' | 'approved';

// TODO: replace with Supabase Realtime subscription on `visitor_entries` filtered to today
const MOCK_VISITORS: VisitorEntry[] = [
  { id: 'v1', name: 'Rahul Mehta', phone: '9876543210', visitType: 'guest', visitingFlat: 'A-101', status: 'approved', createdAt: '2026-07-20T09:30:00', approvalMethod: 'resident' },
  { id: 'v2', name: 'Priya Malhotra', phone: '9876543211', visitType: 'delivery', visitingFlat: 'B-204', status: 'pending', createdAt: '2026-07-20T10:12:00', approvalMethod: 'resident' },
  { id: 'v3', name: 'Anil Verma', phone: '9876543212', visitType: 'service', visitingFlat: 'C-305', status: 'rejected', createdAt: '2026-07-20T08:47:00', approvalMethod: 'resident' },
  { id: 'v4', name: 'Gaurav Sood', phone: '9876543213', visitType: 'guest', visitingFlat: 'A-108', status: 'pending', createdAt: '2026-07-20T10:35:00', approvalMethod: 'resident' },
];

export default function LiveVisitorsScreen() {
  const { colors, radius } = useTheme();
  const [filter, setFilter] = useState<FilterTab>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return MOCK_VISITORS;
    return MOCK_VISITORS.filter((v) => v.status === filter);
  }, [filter]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <View style={styles.headerRow}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground }}>Live visitors</Text>
          <TouchableOpacity
            onPress={() => router.push('../visitor-entry')}
            style={[styles.addBtn, { backgroundColor: colors.primary, borderRadius: radius.md }]}
          >
            <Ionicons name="add" size={18} color={colors.primaryForeground} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 16, marginBottom: 12 }}>
          <SegmentedControl
            value={filter}
            onChange={setFilter}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Pending', value: 'pending' },
              { label: 'Approved', value: 'approved' },
            ]}
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        renderItem={({ item }) => <VisitorCard visitor={item} />}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: colors.mutedForeground, marginTop: 40, fontSize: 13 }}>
            No visitors in this list.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
});