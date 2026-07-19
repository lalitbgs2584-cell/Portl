// app/helpdesk/new.tsx
// Screen 2 — category picker, subject, description, optional photo, submit.
// On success, routes to the "submitted" confirmation screen.

import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useThemeColors, useRadius } from '../../hooks/useThemeColors';
import { createTicket, uploadAttachment } from '../../lib/helpdesk';
import { useAuth } from '../../lib/useAuth';

const CATEGORIES = ['Plumbing', 'Electrical', 'Security', 'Housekeeping', 'Other'];

export default function RaiseTicketScreen() {
  const c = useThemeColors();
  const r = useRadius();
  const { user } = useAuth();

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function pickPhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  }

  async function handleSubmit() {
    if (!user || !subject.trim() || !description.trim()) {
      Alert.alert('Missing details', 'Add a subject and description before submitting.');
      return;
    }
    setSubmitting(true);
    try {
      const ticket = await createTicket({
        userId: user.id,
        category,
        subject: subject.trim(),
        description: description.trim(),
      });

      if (photoUri) {
        const url = await uploadAttachment(photoUri, ticket.ticket_number);
        // best-effort — if this fails the ticket still exists without the photo
        void url;
      }

      router.replace(`/helpdesk/submitted?ticketNumber=${ticket.ticket_number}&ticketId=${ticket.id}`);
    } catch (e: any) {
      Alert.alert('Could not submit', e.message ?? 'Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView style={[styles.screen, { backgroundColor: c.background }]} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={[styles.title, { color: c.foreground }]}>Raise new ticket</Text>

      <Text style={[styles.label, { color: c.mutedForeground }]}>Category</Text>
      <Pressable
        style={[styles.field, { backgroundColor: c.secondary, borderColor: c.border, borderRadius: r.md }]}
        onPress={() => setShowCategoryList((s) => !s)}
      >
        <Text style={{ color: c.foreground, fontSize: 13 }}>{category}</Text>
        <Ionicons name={showCategoryList ? 'chevron-up' : 'chevron-down'} size={16} color={c.mutedForeground} />
      </Pressable>
      {showCategoryList && (
        <View style={[styles.dropdown, { backgroundColor: c.card, borderColor: c.border, borderRadius: r.md }]}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              style={styles.dropdownRow}
              onPress={() => {
                setCategory(cat);
                setShowCategoryList(false);
              }}
            >
              <Text style={{ color: c.foreground, fontSize: 13 }}>{cat}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <Text style={[styles.label, { color: c.mutedForeground }]}>Subject</Text>
      <TextInput
        style={[styles.field, { backgroundColor: c.secondary, borderColor: c.border, borderRadius: r.md, color: c.foreground }]}
        placeholder="Leaking in bathroom"
        placeholderTextColor={c.mutedForeground}
        value={subject}
        onChangeText={setSubject}
      />

      <Text style={[styles.label, { color: c.mutedForeground }]}>Description</Text>
      <TextInput
        style={[
          styles.field,
          styles.textarea,
          { backgroundColor: c.secondary, borderColor: c.border, borderRadius: r.md, color: c.foreground },
        ]}
        placeholder="Water is leaking from the pipe under the sink. Please look into it at the earliest."
        placeholderTextColor={c.mutedForeground}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={[styles.label, { color: c.mutedForeground }]}>Attachment</Text>
      <Pressable
        style={[styles.uploadBox, { borderColor: c.border, borderRadius: r.md }]}
        onPress={pickPhoto}
      >
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={{ width: 60, height: 60, borderRadius: r.sm }} />
        ) : (
          <>
            <Ionicons name="cloud-upload-outline" size={22} color={c.primary} />
            <Text style={{ color: c.primary, fontSize: 13, fontWeight: '600', marginTop: 4 }}>Upload photo</Text>
            <Text style={{ color: c.mutedForeground, fontSize: 11, marginTop: 2 }}>JPG, PNG (max 5MB)</Text>
          </>
        )}
      </Pressable>

      <Pressable
        style={[styles.cta, { backgroundColor: c.primary, borderRadius: r.md }, submitting && { opacity: 0.6 }]}
        disabled={submitting}
        onPress={handleSubmit}
      >
        <Text style={[styles.ctaText, { color: c.primaryForeground }]}>
          {submitting ? 'Submitting…' : 'Submit ticket'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 16 },
  label: { fontSize: 12, marginBottom: 6, marginTop: 4 },
  field: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 13,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textarea: { minHeight: 90, textAlignVertical: 'top' },
  dropdown: { borderWidth: 1, marginTop: -6, marginBottom: 12, overflow: 'hidden' },
  dropdownRow: { paddingVertical: 10, paddingHorizontal: 12 },
  uploadBox: { borderWidth: 1, borderStyle: 'dashed', paddingVertical: 20, alignItems: 'center', marginBottom: 20 },
  cta: { paddingVertical: 14, alignItems: 'center' },
  ctaText: { fontWeight: '600', fontSize: 14 },
});