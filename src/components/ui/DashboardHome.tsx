import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '@/store/useThemeStore';
import { radius } from '@/lib/theme';
import AppScreen from './AppScreen';
import FeatureList, { FeatureItem } from './FeatureList';
import SectionTitle from './SectionTitle';

export type AppRole = 'Admin' | 'Resident' | 'Guard' | 'Staff';

type IconName = ComponentProps<typeof Ionicons>['name'];

type DashboardData = {
  greeting: string;
  location: string;
  headline: string;
  detail: string;
  stats: { value: string; label: string }[];
  actions: { label: string; icon: IconName }[];
  activity: FeatureItem[];
};

const data: Record<AppRole, DashboardData> = {
  Admin: {
    greeting: 'Good morning, Ananya', location: 'Maple Heights · 4 towers', headline: '12 requests need your attention.', detail: 'Keep the community running smoothly today.',
    stats: [{ value: '318', label: 'Residents' }, { value: '12', label: 'Approvals' }, { value: '4', label: 'Open issues' }],
    actions: [{ label: 'Approve members', icon: 'people-outline' }, { label: 'Create notice', icon: 'megaphone-outline' }, { label: 'Add amenity', icon: 'business-outline' }, { label: 'View payments', icon: 'card-outline' }],
    activity: [
      { title: 'Aarav Mehta requested access', description: 'Resident request · Tower B', icon: 'person-add-outline', badge: 'Pending', tone: 'warning' },
      { title: 'Clubhouse booking awaits approval', description: 'Saturday, 6:00 PM · Priya Shah', icon: 'calendar-outline', badge: '1 request' },
      { title: 'Water supply notice published', description: 'Shared with all towers · 25 min ago', icon: 'checkmark-circle-outline', badge: 'Live', tone: 'success' },
    ],
  },
  Resident: {
    greeting: 'Hello, Rohan', location: 'Maple Heights · A-1204', headline: 'Everything at home, in one place.', detail: 'You have a booking and a payment reminder.',
    stats: [{ value: '₹2,450', label: 'Due this month' }, { value: '2', label: 'New notices' }, { value: '1', label: 'Booking' }],
    actions: [{ label: 'Pre-approve guest', icon: 'qr-code-outline' }, { label: 'Book amenity', icon: 'calendar-outline' }, { label: 'Raise concern', icon: 'chatbubble-ellipses-outline' }, { label: 'Pay maintenance', icon: 'wallet-outline' }],
    activity: [
      { title: 'Pool booking confirmed', description: 'Saturday · 7:00 AM – 8:00 AM', icon: 'calendar-outline', badge: 'Confirmed', tone: 'success' },
      { title: 'Maintenance invoice is available', description: 'June 2026 · Due in 5 days', icon: 'receipt-outline', badge: 'Due', tone: 'warning' },
      { title: 'General meeting this Sunday', description: 'Community hall · 10:00 AM', icon: 'people-outline', badge: 'RSVP' },
    ],
  },
  Guard: {
    greeting: 'Good morning, Vikram', location: 'Main Gate · Shift 08:00–16:00', headline: 'The gate is calm. Stay alert.', detail: 'Two visitor approvals are waiting for a response.',
    stats: [{ value: '6', label: 'Visitors today' }, { value: '2', label: 'Awaiting reply' }, { value: '08:00', label: 'Checked in' }],
    actions: [{ label: 'Check in visitor', icon: 'log-in-outline' }, { label: 'Scan guest pass', icon: 'scan-outline' }, { label: 'Report incident', icon: 'alert-circle-outline' }, { label: 'My attendance', icon: 'time-outline' }],
    activity: [
      { title: 'Cab for A-1204 is pre-approved', description: 'Guest pass · Valid until 11:30 AM', icon: 'car-outline', badge: 'Ready', tone: 'success' },
      { title: 'Delivery awaiting resident response', description: 'Tower C · Requested 2 min ago', icon: 'cube-outline', badge: 'Waiting', tone: 'warning' },
      { title: 'Night shift handover completed', description: 'No pending security notes', icon: 'shield-checkmark-outline', badge: 'Done', tone: 'success' },
    ],
  },
  Staff: {
    greeting: 'Hello, Sita', location: 'Maple Heights · Housekeeping', headline: 'Your next task begins at 10:30.', detail: 'You are on track for today’s schedule.',
    stats: [{ value: '08:05', label: 'In time' }, { value: '3', label: 'Tasks today' }, { value: '1', label: 'Leave balance' }],
    actions: [{ label: 'Mark attendance', icon: 'time-outline' }, { label: 'View tasks', icon: 'checkbox-outline' }, { label: 'Request leave', icon: 'calendar-clear-outline' }, { label: 'My profile', icon: 'person-outline' }],
    activity: [
      { title: 'Lobby cleaning at 10:30', description: 'Tower A · Ground floor', icon: 'sparkles-outline', badge: 'Next' },
      { title: 'Block C task marked complete', description: 'Submitted at 9:12 AM', icon: 'checkmark-circle-outline', badge: 'Done', tone: 'success' },
      { title: 'New management announcement', description: 'Weekend shift roster has been updated', icon: 'megaphone-outline', badge: 'New', tone: 'warning' },
    ],
  },
};

export default function DashboardHome({ role }: { role: AppRole }) {
  const colors = useThemeStore((state) => state.colors);
  const dashboard = data[role];

  return (
    <AppScreen>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={[styles.location, { color: colors.mutedForeground }]}>{dashboard.location}</Text>
          <Text style={[styles.greeting, { color: colors.foreground }]}>{dashboard.greeting}</Text>
        </View>
        <View style={[styles.avatar, { backgroundColor: colors.secondary, borderColor: colors.border }]}><Text style={[styles.avatarText, { color: colors.primary }]}>{role[0]}</Text></View>
      </View>

      <View style={[styles.hero, { backgroundColor: colors.primary }]}>
        <View style={[styles.heroIcon, { backgroundColor: colors.secondary }]}><Ionicons name="sparkles-outline" size={23} color={colors.primary} /></View>
        <View style={styles.heroCopy}>
          <Text style={[styles.heroTitle, { color: colors.primaryForeground }]}>{dashboard.headline}</Text>
          <Text style={[styles.heroDetail, { color: colors.primaryForeground }]}>{dashboard.detail}</Text>
        </View>
      </View>

      <SectionTitle title="Today at a glance" />
      <View style={styles.statsRow}>{dashboard.stats.map((stat) => <View key={stat.label} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}><Text style={[styles.statValue, { color: colors.foreground }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text></View>)}</View>

      <SectionTitle title="Quick actions" />
      <View style={styles.actionsGrid}>{dashboard.actions.map((action) => <Pressable key={action.label} style={({ pressed }) => [styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.75 : 1 }]}><View style={[styles.actionIcon, { backgroundColor: colors.secondary }]}><Ionicons name={action.icon} size={20} color={colors.primary} /></View><Text style={[styles.actionLabel, { color: colors.foreground }]}>{action.label}</Text></Pressable>)}</View>

      <SectionTitle title="Recent activity" action="View all" />
      <FeatureList items={dashboard.activity} />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, headerCopy: { flex: 1, paddingRight: 12 },
  location: { fontSize: 13, fontWeight: '700' }, greeting: { marginTop: 4, fontSize: 25, fontWeight: '800', letterSpacing: -0.6 },
  avatar: { width: 46, height: 46, borderWidth: 1, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }, avatarText: { fontSize: 18, fontWeight: '800' },
  hero: { flexDirection: 'row', gap: 14, alignItems: 'center', marginTop: 24, borderRadius: radius['3xl'], padding: 18 }, heroIcon: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, heroCopy: { flex: 1 }, heroTitle: { fontSize: 16, fontWeight: '800', lineHeight: 22 }, heroDetail: { fontSize: 12, fontWeight: '500', lineHeight: 18, marginTop: 3, opacity: 0.86 },
  statsRow: { flexDirection: 'row', gap: 9 }, statCard: { flex: 1, minHeight: 82, borderWidth: 1, borderRadius: radius.xl, padding: 12, justifyContent: 'center' }, statValue: { fontSize: 17, fontWeight: '800' }, statLabel: { fontSize: 11, fontWeight: '700', lineHeight: 15, marginTop: 4 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, actionCard: { width: '48.5%', minHeight: 104, borderWidth: 1, borderRadius: radius['2xl'], padding: 14, justifyContent: 'space-between' }, actionIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' }, actionLabel: { fontSize: 13, fontWeight: '800', lineHeight: 18 },
});
