import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { router, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';
import { Notice, NoticeCard } from '@/components/admin/notices/NoticeCard';

// Replace with real Supabase counts / recent query
const STATS = { published: 12, scheduled: 3, archived: 5 };

const RECENT_NOTICES: Notice[] = [
  { id: '1', title: 'Water supply maintenance', content: '', status: 'published', publishDate: '', postedBy: '' },
  { id: '2', title: 'Garba competition', content: '', status: 'published', publishDate: '', postedBy: '' },
  { id: '3', title: 'Society meeting', content: '', status: 'scheduled', publishDate: '', postedBy: '' },
];

export default function NoticesDashboardScreen() {
  const { colors, radius } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => router.push('./CreateNotice')}
              style={[styles.addButton, { backgroundColor: colors.primary, borderRadius: radius.lg }]}
            >
              <Feather name="plus" size={14} color={colors.primaryForeground} />
              <Text style={{ color: colors.primaryForeground, fontSize: 12, fontWeight: '600', marginLeft: 4 }}>
                Add notice
              </Text>
            </Pressable>
          ),
        }}
      />

      <View style={styles.statsRow}>
        {(['published', 'scheduled', 'archived'] as const).map((key) => (
          <Pressable
            key={key}
            onPress={() => router.push({ pathname: './NoticesList', params: { status: key } })}
            style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg }]}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.primary }}>{STATS[key]}</Text>
            <Text style={{ fontSize: 11, color: colors.mutedForeground, textTransform: 'capitalize' }}>{key}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>Recent notices</Text>
      {RECENT_NOTICES.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} onPress={(n) => router.push(`./${n.id}`)} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
});