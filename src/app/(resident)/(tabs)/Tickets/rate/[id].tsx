// app/helpdesk/rate/[id].tsx
// Screen 5 — star rating + free-text feedback, shown once a ticket is resolved.

import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, useRadius } from '../../../hooks/useThemeColors';
import { submitFeedback } from '../../../lib/helpdesk';

export default function RateResolutionScreen() {
  const c = useThemeColors();
  const r = useRadius();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!id) return;
    setSubmitting(true);
    try {
      await submitFeedback(id, rating, feedback.trim());
      router.replace('/helpdesk');
    } catch (e: any) {
      Alert.alert('Could not submit feedback', e.message ?? 'Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: c.background }]}>
      <Text style={[styles.title, { color: c.foreground }]}>Rate resolution</Text>
      <Text style={[styles.label, { color: c.mutedForeground }]}>How was the resolution of your issue?</Text>

      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable key={star} onPress={() => setRating(star)} hitSlop={6}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={30}
              color={c.primary}
            />
          </Pressable>
        ))}
      </View>

      <Text style={[styles.label, { color: c.mutedForeground }]}>Your feedback</Text>
      <TextInput
        style={[
          styles.textarea,
          { backgroundColor: c.secondary, borderColor: c.border, borderRadius: r.md, color: c.foreground },
        ]}
        placeholder="The issue was resolved quickly and efficiently. Thank you!"
        placeholderTextColor={c.mutedForeground}
        value={feedback}
        onChangeText={setFeedback}
        multiline
        numberOfLines={4}
      />

      <Pressable
        style={[styles.cta, { backgroundColor: c.primary, borderRadius: r.md }, submitting && { opacity: 0.6 }]}
        disabled={submitting}
        onPress={handleSubmit}
      >
        <Text style={{ color: c.primaryForeground, fontWeight: '600', fontSize: 14 }}>
          {submitting ? 'Submitting…' : 'Submit feedback'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 14 },
  label: { fontSize: 12, marginBottom: 10 },
  stars: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  textarea: { borderWidth: 1, minHeight: 90, textAlignVertical: 'top', padding: 12, fontSize: 13, marginBottom: 20 },
  cta: { paddingVertical: 14, alignItems: 'center' },
});