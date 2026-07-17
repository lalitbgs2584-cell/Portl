import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/store/useTheme';

// Replace with a real fetch by `id`
const MOCK_NOTICE = {
  id: '1',
  title: 'Society meeting',
  content: 'Annual general body meeting',
  publishDate: '20/05/2024',
};

export default function EditNoticeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors, radius } = useTheme();

  const [title, setTitle] = useState(MOCK_NOTICE.title);
  const [content, setContent] = useState(MOCK_NOTICE.content);
  const [publishDate, setPublishDate] = useState(MOCK_NOTICE.publishDate);

  const canUpdate = title.trim().length > 0 && content.trim().length > 0;

  const handleUpdate = () => {
    // TODO: update the `notices` row in Supabase where id = id
    router.back();
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.label, { color: colors.mutedForeground }]}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, color: colors.foreground }]}
      />

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 14 }]}>Content</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        multiline
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, styles.textarea, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, color: colors.foreground }]}
      />

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 14 }]}>Publish date</Text>
      <TextInput
        value={publishDate}
        onChangeText={setPublishDate}
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, color: colors.foreground }]}
      />

      <Pressable
        disabled={!canUpdate}
        onPress={handleUpdate}
        style={[styles.updateButton, { backgroundColor: colors.primary, borderRadius: radius.lg, opacity: canUpdate ? 1 : 0.5 }]}
      >
        <Text style={{ color: colors.primaryForeground, fontWeight: '600', fontSize: 14 }}>Update</Text>
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
  updateButton: {
    marginTop: 28,
    paddingVertical: 14,
    alignItems: 'center',
  },
});