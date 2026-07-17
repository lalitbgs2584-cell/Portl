import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
} from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';
import {
  MOCK_COMPLAINTS,
} from '../index';
import {
  Complaint,
  ComplaintStatus,
  priorityColor,
  priorityLabel,
  statusLabel,
} from '@/components/admin/complaints/ComplaintCard';

// ── timeline ────────────────────────────────────────────────────────────────

interface TimelineEvent {
  id: string;
  label: string;
  actor: string;
  time: string;
  done: boolean;
}

function buildTimeline(c: Complaint): TimelineEvent[] {
  const events: TimelineEvent[] = [
    {
      id: 'raised',
      label: 'Complaint raised',
      actor: `${c.raisedBy} · ${c.flat}`,
      time: c.createdAt,
      done: true,
    },
  ];

  if (c.assignedTo) {
    events.push({
      id: 'assigned',
      label: `Assigned to ${c.assignedTo}`,
      actor: 'Admin',
      time: '1h ago',
      done: c.status !== 'open',
    });
  }

  if (c.status === 'resolved') {
    events.push({
      id: 'resolved',
      label: 'Marked as resolved',
      actor: 'Admin',
      time: 'Recently',
      done: true,
    });
  } else {
    events.push({
      id: 'pending',
      label: 'Awaiting resolution',
      actor: 'Pending',
      time: '',
      done: false,
    });
  }

  return events;
}

// ── status picker ────────────────────────────────────────────────────────────

const STATUS_OPTIONS: { key: ComplaintStatus; label: string }[] = [
  { key: 'open', label: 'Open' },
  { key: 'in_progress', label: 'In progress' },
  { key: 'resolved', label: 'Resolved' },
];

// ── screen ───────────────────────────────────────────────────────────────────

export default function ComplaintDetailScreen() {
  const { colors, radius } = useTheme();
  const { complaintId } = useLocalSearchParams<{ complaintId: string }>();

  const complaint = MOCK_COMPLAINTS.find((c) => c.id === complaintId) ?? MOCK_COMPLAINTS[0];

  const [status, setStatus] = useState<ComplaintStatus>(complaint.status);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [saved, setSaved] = useState(false);

  const pColor = priorityColor(complaint.priority, colors);
  const timeline = buildTimeline({ ...complaint, status });

  const handleUpdate = () => {
    // TODO: update in Supabase
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // ── status badge colours ────────────────────────────────────────────────

  const statusBorderColor =
    status === 'open'
      ? colors.primary
      : status === 'resolved'
      ? colors.mutedForeground
      : colors.border;

  const statusTextColor =
    status === 'open'
      ? colors.primary
      : status === 'resolved'
      ? '#9FE1CB'
      : colors.mutedForeground;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: 'Complaint details' }} />

      {/* ── ticket + title ── */}
      <Text style={[styles.ticketTitle, { color: colors.foreground }]}>
        {complaint.ticketNo} {complaint.title}
      </Text>

      {/* ── status + priority row ── */}
      <View style={styles.badgeRow}>
        <View
          style={[
            styles.badge,
            {
              borderColor: statusBorderColor,
              borderRadius: radius.md,
            },
          ]}
        >
          <Text style={[styles.badgeText, { color: statusTextColor }]}>
            {statusLabel(status)}
          </Text>
        </View>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: `${pColor}22`,
              borderColor: `${pColor}44`,
              borderRadius: radius.md,
            },
          ]}
        >
          <Text style={[styles.badgeText, { color: pColor }]}>
            {priorityLabel(complaint.priority)} priority
          </Text>
        </View>
      </View>

      {/* ── detail fields ── */}
      <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
        <DetailRow label="Raised by" value={`${complaint.raisedBy} · ${complaint.flat}`} colors={colors} />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <DetailRow label="Description" value={complaint.description} colors={colors} multiline />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <DetailRow
          label="Assigned to"
          value={complaint.assignedTo ?? 'Unassigned'}
          colors={colors}
          muted={!complaint.assignedTo}
        />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        {/* Attachments placeholder */}
        <View>
          <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>Attachments</Text>
          <View style={styles.attachmentRow}>
            {[0, 1].map((i) => (
              <View
                key={i}
                style={[
                  styles.attachment,
                  { backgroundColor: colors.muted, borderRadius: radius.lg },
                ]}
              >
                <Feather name="image" size={18} color={colors.mutedForeground} />
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* ── update status ── */}
      <View style={[styles.updateCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>Update status</Text>

        {/* custom picker trigger */}
        <Pressable
          onPress={() => setPickerVisible(true)}
          style={[
            styles.pickerTrigger,
            {
              backgroundColor: colors.muted,
              borderColor: colors.border,
              borderRadius: radius.lg,
            },
          ]}
        >
          <Text style={{ color: colors.foreground, fontSize: 13 }}>{statusLabel(status)}</Text>
          <Feather name="chevron-down" size={14} color={colors.mutedForeground} />
        </Pressable>

        <Pressable
          onPress={handleUpdate}
          style={[
            styles.updateButton,
            { backgroundColor: colors.primary, borderRadius: radius.lg },
          ]}
        >
          <Text style={{ color: colors.primaryForeground, fontWeight: '600', fontSize: 13 }}>
            {saved ? '✓ Updated' : 'Update status'}
          </Text>
        </Pressable>
      </View>

      {/* ── activity timeline ── */}
      <View style={[styles.timelineCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
        <Text style={[styles.sectionLabel, { color: colors.mutedForeground, marginBottom: 4 }]}>Activity timeline</Text>
        <Text style={[styles.timelineTicket, { color: colors.primary }]}>
          {complaint.ticketNo} {complaint.title}
        </Text>

        <View style={styles.timeline}>
          {timeline.map((event, idx) => {
            const isLast = idx === timeline.length - 1;
            const dotColor = event.done ? colors.primary : colors.muted;
            const dotBorderColor = event.done ? colors.primary : colors.mutedForeground;

            return (
              <View key={event.id} style={styles.timelineRow}>
                {/* dot + line */}
                <View style={styles.timelineDotCol}>
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: dotColor,
                        borderColor: dotBorderColor,
                        borderRadius: 4,
                      },
                    ]}
                  />
                  {!isLast && (
                    <View style={[styles.line, { backgroundColor: colors.border }]} />
                  )}
                </View>

                {/* text */}
                <View style={[styles.timelineContent, isLast && { paddingBottom: 0 }]}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: event.done ? colors.foreground : colors.mutedForeground,
                    }}
                  >
                    {event.label}
                  </Text>
                  <Text style={{ fontSize: 10, color: colors.mutedForeground, marginTop: 2 }}>
                    {event.actor}{event.time ? ` · ${event.time}` : ''}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* ── status picker modal ── */}
      <Modal visible={pickerVisible} transparent animationType="fade" onRequestClose={() => setPickerVisible(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setPickerVisible(false)}>
          <View
            style={[
              styles.pickerSheet,
              { backgroundColor: colors.card, borderRadius: radius['2xl'] },
            ]}
          >
            <Text style={[styles.pickerTitle, { color: colors.foreground }]}>Select status</Text>
            {STATUS_OPTIONS.map((opt) => {
              const selected = opt.key === status;
              return (
                <Pressable
                  key={opt.key}
                  onPress={() => {
                    setStatus(opt.key);
                    setPickerVisible(false);
                  }}
                  style={[
                    styles.pickerOption,
                    {
                      backgroundColor: selected ? colors.muted : 'transparent',
                      borderRadius: radius.lg,
                    },
                  ]}
                >
                  <Text style={{ color: selected ? colors.primary : colors.foreground, fontSize: 13, fontWeight: selected ? '600' : '400' }}>
                    {opt.label}
                  </Text>
                  {selected && <Feather name="check" size={14} color={colors.primary} />}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

// ── helper sub-component ─────────────────────────────────────────────────────

function DetailRow({
  label,
  value,
  colors,
  multiline,
  muted,
}: {
  label: string;
  value: string;
  colors: any;
  multiline?: boolean;
  muted?: boolean;
}) {
  return (
    <View style={{ marginBottom: 0 }}>
      <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>{label}</Text>
      <Text
        style={{
          fontSize: 13,
          color: muted ? colors.mutedForeground : colors.foreground,
          lineHeight: multiline ? 19 : undefined,
          marginTop: 2,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

// ── styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    padding: 14,
    paddingBottom: 40,
    gap: 12,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  detailCard: {
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  divider: {
    height: 1,
  },
  fieldLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  attachmentRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  attachment: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateCard: {
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  pickerTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  updateButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  timelineCard: {
    borderWidth: 1,
    padding: 14,
  },
  timelineTicket: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 14,
  },
  timeline: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 10,
  },
  timelineDotCol: {
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderWidth: 1,
    marginTop: 3,
  },
  line: {
    width: 1,
    flex: 1,
    minHeight: 24,
  },
  timelineContent: {
    paddingBottom: 16,
    flex: 1,
  },
  // modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  pickerSheet: {
    padding: 16,
    gap: 4,
  },
  pickerTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  pickerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
