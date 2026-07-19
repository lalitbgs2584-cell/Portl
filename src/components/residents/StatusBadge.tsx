// components/StatusBadge.tsx
// Shared pill used on the tickets list and the detail screen.

import { useTheme } from '@/store/useTheme';
import { View, Text, StyleSheet } from 'react-native';


export type TicketStatus = 'open' | 'in_progress' | 'resolved';

const LABELS: Record<TicketStatus, string> = {
  open: 'Open',
  in_progress: 'In progress',
  resolved: 'Resolved',
};

export function StatusBadge({ status }: { status: TicketStatus }) {
  const {colors, radius} = useTheme();

  const bg =
    status === 'open' ? colors.destructive : status === 'in_progress' ? colors.primary : colors.success;
  const fg =
    status === 'open'
      ? colors.primaryForeground // white-on-red reads fine on destructive too
      : status === 'in_progress'
      ? colors.primaryForeground
      : colors.successForeground;

  return (
    <View style={[styles.badge, { backgroundColor: bg, borderRadius: radius['2xl'] }]}>
      <Text style={[styles.text, { color: fg }]}>{LABELS[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingVertical: 4, paddingHorizontal: 10 },
  text: { fontSize: 11, fontWeight: '600' },
});