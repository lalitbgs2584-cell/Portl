import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/store/useTheme';

export type ComplaintStatus = 'open' | 'in_progress' | 'resolved';
export type ComplaintPriority = 'high' | 'medium' | 'low';

export interface Complaint {
  id: string;
  ticketNo: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  raisedBy: string;
  flat: string;
  assignedTo: string | null;
  createdAt: string; // relative string e.g. "2h ago"
}

interface ComplaintCardProps {
  complaint: Complaint;
  onPress: (c: Complaint) => void;
}

// ── helpers ─────────────────────────────────────────────────────────────────

export function priorityColor(priority: ComplaintPriority, colors: { destructive: string; primary: string; mutedForeground: string }) {
  if (priority === 'high') return colors.destructive;
  if (priority === 'medium') return colors.primary;
  return colors.mutedForeground;
}

export function statusLabel(status: ComplaintStatus) {
  if (status === 'open') return 'Open';
  if (status === 'in_progress') return 'In progress';
  return 'Resolved';
}

export function priorityLabel(priority: ComplaintPriority) {
  if (priority === 'high') return 'High';
  if (priority === 'medium') return 'Medium';
  return 'Low';
}

// ── component ────────────────────────────────────────────────────────────────

export function ComplaintCard({ complaint, onPress }: ComplaintCardProps) {
  const { colors, radius } = useTheme();

  const pColor = priorityColor(complaint.priority, colors);

  const statusBg =
    complaint.status === 'open'
      ? 'transparent'
      : complaint.status === 'resolved'
      ? 'transparent'
      : 'transparent';

  const statusBorderColor =
    complaint.status === 'open'
      ? colors.primary
      : complaint.status === 'resolved'
      ? colors.mutedForeground
      : colors.border;

  const statusTextColor =
    complaint.status === 'open'
      ? colors.primary
      : complaint.status === 'resolved'
      ? '#9FE1CB'
      : colors.mutedForeground;

  const cardOpacity = complaint.status === 'resolved' ? 0.7 : 1;

  return (
    <Pressable
      onPress={() => onPress(complaint)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: radius['2xl'],
          opacity: pressed ? 0.8 : cardOpacity,
        },
      ]}
    >
      {/* top row: ticket + title | priority */}
      <View style={styles.topRow}>
        <Text style={[styles.title, { color: colors.cardForeground }]} numberOfLines={1}>
          {complaint.ticketNo} {complaint.title}
        </Text>
        <Text style={[styles.priority, { color: pColor }]}>
          {priorityLabel(complaint.priority)}
        </Text>
      </View>

      {/* bottom row: status badge | time */}
      <View style={styles.bottomRow}>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: statusBg,
              borderColor: statusBorderColor,
              borderRadius: radius.md,
            },
          ]}
        >
          <Text style={[styles.statusText, { color: statusTextColor }]}>
            {statusLabel(complaint.status)}
          </Text>
        </View>
        <Text style={[styles.time, { color: colors.mutedForeground }]}>
          {complaint.createdAt}
        </Text>
      </View>
    </Pressable>
  );
}

// ── styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  priority: {
    fontSize: 10,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  time: {
    fontSize: 10,
  },
});
