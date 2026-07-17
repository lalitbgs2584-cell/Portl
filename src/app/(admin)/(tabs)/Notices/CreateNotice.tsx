import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/store/useTheme';

export default function CreateNoticeScreen() {
  const { colors, radius } = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishDate, setPublishDate] = useState('');

  const canPublish = title.trim().length > 0 && content.trim().length > 0 && publishDate.trim().length > 0;

  const handlePublish = () => {
    // TODO: insert into Supabase `notices` table
    router.back();
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.label, { color: colors.mutedForeground }]}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Water maintenance"
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, color: colors.foreground }]}
      />

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 14 }]}>Content</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Water supply will be affected..."
        placeholderTextColor={colors.mutedForeground}
        multiline
        style={[styles.input, styles.textarea, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, color: colors.foreground }]}
      />

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 14 }]}>Publish date</Text>
      <TextInput
        value={publishDate}
        onChangeText={setPublishDate}
        placeholder="18/05/2024"
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, color: colors.foreground }]}
      />

      <Pressable
        disabled={!canPublish}
        onPress={handlePublish}
        style={[styles.publishButton, { backgroundColor: colors.primary, borderRadius: radius.lg, opacity: canPublish ? 1 : 0.5 }]}
      >
        <Text style={{ color: colors.primaryForeground, fontWeight: '600', fontSize: 14 }}>Publish</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textarea: {
    height: 90,
    textAlignVertical: 'top',
  },
  publishButton: {
    marginTop: 28,
    paddingVertical: 14,
    alignItems: 'center',
  },
});