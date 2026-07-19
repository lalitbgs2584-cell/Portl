// app/helpdesk/[id].tsx
// Screen 3 — ticket detail: assignee, description, comment thread,
// plus a composer at the bottom to add a reply.

import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, useRadius } from '../../hooks/useThemeColors';
import { StatusBadge } from '../../components/StatusBadge';
import { getTicketById, getComments, addComment, Ticket, TicketComment } from '../../lib/helpdesk';
import { useAuth } from '../../lib/useAuth';

export default function TicketDetailScreen() {
  const c = useThemeColors();
  const r = useRadius();
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    if (!id) return;
    const [t, cm] = await Promise.all([getTicketById(id), getComments(id)]);
    setTicket(t);
    setComments(cm);
  }, [id]);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  async function handleSend() {
    if (!draft.trim() || !ticket || !user) return;
    setSending(true);
    try {
      const comment = await addComment(ticket.id, draft.trim(), 'You');
      setComments((prev) => [...prev, comment]);
      setDraft('');
    } finally {
      setSending(false);
    }
  }

  if (loading || !ticket) {
    return (
      <View style={[styles.screen, { backgroundColor: c.background, justifyContent: 'center' }]}>
        <ActivityIndicator color={c.primary} />
      </View>
    );
  }

  // resolved tickets route into the rating screen instead of showing a composer
  const canReply = ticket.status !== 'resolved';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: c.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={[styles.ticketNumber, { color: c.foreground }]}>#{ticket.ticket_number}</Text>
        <StatusBadge status={ticket.status} />
      </View>
      <Text style={[styles.date, { color: c.mutedForeground }]}>
        {new Date(ticket.created_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })}
      </Text>

      {ticket.assigned_to_name && (
        <View style={styles.assignee}>
          <View style={[styles.avatar, { backgroundColor: c.secondary }]}>
            <Text style={{ color: c.primary, fontWeight: '600', fontSize: 13 }}>
              {ticket.assigned_to_name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </Text>
          </View>
          <View>
            <Text style={{ color: c.foreground, fontSize: 13, fontWeight: '500' }}>{ticket.assigned_to_name}</Text>
            <Text style={{ color: c.mutedForeground, fontSize: 11 }}>{ticket.assigned_to_role}</Text>
          </View>
        </View>
      )}

      <Text style={[styles.description, { color: c.mutedForeground }]}>{ticket.description}</Text>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.commentBubble, { backgroundColor: c.card, borderRadius: r.md }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: c.foreground, fontSize: 12, fontWeight: '600' }}>{item.author_name}</Text>
              <Text style={{ color: c.mutedForeground, fontSize: 11 }}>
                {new Date(item.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </Text>
            </View>
            <Text style={{ color: c.mutedForeground, fontSize: 12, marginTop: 2 }}>{item.body}</Text>
          </View>
        )}
      />

      {canReply ? (
        <View style={[styles.composer, { borderTopColor: c.border }]}>
          <TextInput
            style={[styles.input, { backgroundColor: c.secondary, color: c.foreground, borderRadius: r.xl }]}
            placeholder="Write a comment…"
            placeholderTextColor={c.mutedForeground}
            value={draft}
            onChangeText={setDraft}
          />
          <Pressable onPress={handleSend} disabled={sending} hitSlop={10}>
            <Ionicons name="send" size={20} color={c.primary} />
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={[styles.cta, { backgroundColor: c.primary, margin: 16, borderRadius: r.md }]}
          onPress={() => router.push(`/helpdesk/rate/${ticket.id}`)}
        >
          <Text style={{ color: c.primaryForeground, fontWeight: '600', fontSize: 14 }}>Rate resolution</Text>
        </Pressable>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16 },
  ticketNumber: { fontSize: 16, fontWeight: '600' },
  date: { fontSize: 12, paddingHorizontal: 16, marginTop: 4, marginBottom: 14 },
  assignee: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, marginBottom: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  description: { fontSize: 13, lineHeight: 19, paddingHorizontal: 16, marginBottom: 14 },
  commentBubble: { padding: 10, marginBottom: 8 },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderTopWidth: 1,
  },
  input: { flex: 1, paddingVertical: 10, paddingHorizontal: 14, fontSize: 13 },
  cta: { paddingVertical: 14, alignItems: 'center' },
});