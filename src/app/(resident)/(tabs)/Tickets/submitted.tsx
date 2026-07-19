// app/helpdesk/submitted.tsx
// Screen 4 — success confirmation right after raising a ticket.

import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, useRadius } from '../../hooks/useThemeColors';

export default function TicketSubmittedScreen() {
  const c = useThemeColors();
  const r = useRadius();
  const { ticketNumber, ticketId } = useLocalSearchParams<{ ticketNumber: string; ticketId: string }>();

  return (
    <View style={[styles.screen, { backgroundColor: c.background }]}>
      <Text style={[styles.title, { color: c.foreground }]}>Ticket submitted</Text>

      <View style={[styles.iconCircle, { backgroundColor: c.success }]}>
        <Ionicons name="checkmark" size={36} color={c.successForeground} />
      </View>

      <Text style={[styles.heading, { color: c.foreground }]}>Ticket submitted</Text>
      <Text style={[styles.subtext, { color: c.mutedForeground }]}>
        Your ticket has been submitted successfully.
      </Text>

      <View style={[styles.idBox, { backgroundColor: c.card, borderColor: c.border, borderRadius: r.md }]}>
        <Text style={{ color: c.foreground, fontSize: 14, fontWeight: '600' }}>Ticket id #{ticketNumber}</Text>
      </View>

      <Pressable
        style={[styles.cta, { backgroundColor: c.primary, borderRadius: r.md }]}
        onPress={() => router.replace(`/helpdesk/${ticketId}`)}
      >
        <Text style={{ color: c.primaryForeground, fontWeight: '600', fontSize: 14 }}>Track status</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
  title: { position: 'absolute', top: 20, fontSize: 16, fontWeight: '600' },
  iconCircle: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  heading: { fontSize: 17, fontWeight: '600', marginBottom: 6 },
  subtext: { fontSize: 13, textAlign: 'center', marginBottom: 20, paddingHorizontal: 20 },
  idBox: { borderWidth: 1, paddingVertical: 12, paddingHorizontal: 20, marginBottom: 20, width: '100%' },
  cta: { paddingVertical: 14, alignItems: 'center', width: '100%' },
});