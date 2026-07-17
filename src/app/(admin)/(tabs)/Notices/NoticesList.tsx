import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/store/useTheme';
import { NoticeStatus } from '@/components/admin/notices/NoticeStatusBadge';
import { Notice,NoticeCard } from '@/components/admin/notices/NoticeCard';


// Replace with real Supabase query
const ALL_NOTICES: Notice[] = [
  { id: '1', title: 'Water maintenance', content: 'Water supply will be affected...', status: 'published', publishDate: '18/05/2024', postedBy: 'Admin' },
  { id: '2', title: 'Garba competition', content: '', status: 'published', publishDate: '10/05/2024', postedBy: 'Admin' },
  { id: '3', title: 'Society meeting', content: 'Annual general body meeting', status: 'scheduled', publishDate: '20/05/2024', postedBy: 'Admin' },
];

export default function NoticesListScreen() {
  const { colors, radius } = useTheme();
  const { status } = useLocalSearchParams<{ status?: NoticeStatus }>();
  const [filter, setFilter] = useState<NoticeStatus | 'all'>(status ?? 'all');

  const filtered = useMemo(() => {
    if (filter === 'all') return ALL_NOTICES;
    return ALL_NOTICES.filter((n) => n.status === filter);
  }, [filter]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <NoticeCard notice={item} onPress={(n:any) => router.push(`./${n.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 12,
  },
});