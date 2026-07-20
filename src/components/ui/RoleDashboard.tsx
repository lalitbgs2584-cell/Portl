import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/useThemeStore';
import { radius } from '@/lib/theme';

export type DashboardRole = 'Admin' | 'Resident' | 'Guard' | 'Staff';

type DashboardContent = {
  name: string;
  location: string;
  message: string;
  stats: string[];
  actions: string[];
  activities: string[];
};

const dashboardContent: Record<DashboardRole, DashboardContent> = {
  Admin: {
    name: 'Good morning, Ananya',
    location: 'Maple Heights · 4 towers',
    message: '12 requests need your attention today.',
    stats: ['318 Residents', '12 Pending', '4 Open issues'],
    actions: ['Approve members', 'Create notice', 'Add amenity', 'View payments'],
    activities: ['Aarav Mehta requested access', 'Clubhouse booking awaits approval', 'Water supply notice published'],
  },
  Resident: {
    name: 'Hello, Rohan',
    location: 'Maple Heights · A-1204',
    message: 'Everything at home, in one place.',
    stats: ['₹2,450 Due', '2 Notices', '1 Booking'],
    actions: ['Pre-approve guest', 'Book amenity', 'Raise a concern', 'Pay maintenance'],
    activities: ['Pool booking confirmed for Saturday', 'Maintenance invoice is now available', 'General meeting this Sunday'],
  },
  Guard: {
    name: 'Good morning, Vikram',
    location: 'Main Gate · Shift 08:00–16:00',
    message: 'The gate is calm. Stay alert.',
    stats: ['6 Visitors', '2 Awaiting', '1 Delivery'],
    actions: ['Check in visitor', 'Scan guest pass', 'Report incident', 'My attendance'],
    activities: ['Cab for A-1204 pre-approved', 'Delivery awaiting resident response', 'Night shift handover completed'],
  },
  Staff: {
    name: 'Hello, Sita',
    location: 'Maple Heights · Housekeeping',
    message: 'Your next task begins at 10:30.',
    stats: ['08:05 In time', '3 Tasks', '1 Leave left'],
    actions: ['Mark attendance', 'View tasks', 'Request leave', 'My profile'],
    activities: ['Lobby cleaning scheduled at 10:30', 'Block C task marked complete', 'New announcement from management'],
  },
};

export default function RoleDashboard({ role }: { role: DashboardRole }) {
  const colors = useThemeStore((state) => state.colors);
  const insets = useSafeAreaInsets();
  const content = dashboardContent[role];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.location, { color: colors.mutedForeground }]}>{content.location}</Text>
          <Text style={[styles.greeting, { color: colors.foreground }]}>{content.name}</Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>{role[0]}</Text>
        </View>
      </View>

      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <Text style={[styles.heroText, { color: colors.primaryForeground }]}>{content.message}</Text>
        <Text style={[styles.heroSubtext, { color: colors.primaryForeground }]}>Here is your live overview for today.</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>At a glance</Text>
      <View style={styles.statsRow}>
        {content.stats.map((stat) => (
          <View key={stat} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.statText, { color: colors.foreground }]}>{stat}</Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Quick actions</Text>
      <View style={styles.actionsGrid}>
        {content.actions.map((action) => (
          <Pressable key={action} style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.actionIcon, { color: colors.primary }]}>+</Text>
            <Text style={[styles.actionText, { color: colors.foreground }]}>{action}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent activity</Text>
      <View style={[styles.activityList, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {content.activities.map((activity, index) => (
          <View key={activity} style={[styles.activityRow, index > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderColor: colors.border }]}>
            <View style={[styles.activityDot, { backgroundColor: colors.primary }]} />
            <View style={styles.activityTextWrap}>
              <Text style={[styles.activityText, { color: colors.foreground }]}>{activity}</Text>
              <Text style={[styles.activityTime, { color: colors.mutedForeground }]}>{index + 1} hour ago</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, gap: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  location: { fontSize: 13, fontWeight: '600' },
  greeting: { fontSize: 25, fontWeight: '800', marginTop: 3 },
  avatar: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '800' },
  hero: { padding: 20, borderRadius: radius['3xl'] },
  heroText: { fontSize: 17, fontWeight: '800' },
  heroSubtext: { fontSize: 13, marginTop: 6, opacity: 0.8 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCard: { flex: 1, minHeight: 64, justifyContent: 'center', padding: 10, borderWidth: 1, borderRadius: radius.lg },
  statText: { fontSize: 13, fontWeight: '700' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: { width: '48.5%', minHeight: 98, padding: 14, justifyContent: 'space-between', borderWidth: 1, borderRadius: radius.xl },
  actionIcon: { fontSize: 22, fontWeight: '800' },
  actionText: { fontSize: 14, fontWeight: '700' },
  activityList: { borderWidth: 1, borderRadius: radius.xl, overflow: 'hidden' },
  activityRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 15 },
  activityDot: { width: 9, height: 9, borderRadius: 5 },
  activityTextWrap: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '600' },
  activityTime: { fontSize: 12, marginTop: 3 },
});
