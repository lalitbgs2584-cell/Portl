import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';


const VISIBILITY_OPTIONS = ['All residents', 'Owners only', 'Specific tower'] as const;

export default function CreatePollScreen() {
  const { colors, radius } = useTheme();

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [visibility, setVisibility] = useState<(typeof VISIBILITY_OPTIONS)[number]>(
    VISIBILITY_OPTIONS[0]
  );

  const addOption = () => setOptions((prev) => [...prev, '']);

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return; // keep a minimum of 2 options
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const canPublish = question.trim().length > 0 && options.every((o) => o.trim().length > 0);

  const handlePublish = () => {
    // TODO: call your Supabase insert here (polls + poll_options tables)
    router.back();
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.label, { color: colors.mutedForeground }]}>Question</Text>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="e.g. Parking policy"
        placeholderTextColor={colors.mutedForeground}
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: radius.lg,
            color: colors.foreground,
          },
        ]}
      />

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 16 }]}>
        Options
      </Text>
      {options.map((opt, index) => (
        <View key={index} style={styles.optionRow}>
          <TextInput
            value={opt}
            onChangeText={(value) => updateOption(index, value)}
            placeholder={`Option ${index + 1}`}
            placeholderTextColor={colors.mutedForeground}
            style={[
              styles.input,
              styles.optionInput,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: radius.lg,
                color: colors.foreground,
              },
            ]}
          />
          {options.length > 2 && (
            <Pressable onPress={() => removeOption(index)} style={styles.removeButton}>
              <Feather name="x" size={16} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>
      ))}

      <Pressable onPress={addOption} style={styles.addOptionButton}>
        <Feather name="plus" size={14} color={colors.primary} />
        <Text style={[styles.addOptionText, { color: colors.primary }]}>Add option</Text>
      </Pressable>

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 16 }]}>
        Visible to
      </Text>
      <View style={styles.chipRow}>
        {VISIBILITY_OPTIONS.map((option) => {
          const selected = option === visibility;
          return (
            <Pressable
              key={option}
              onPress={() => setVisibility(option)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? colors.primary : colors.card,
                  borderColor: selected ? colors.primary : colors.border,
                  borderRadius: radius.xl,
                },
              ]}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: selected ? colors.primaryForeground : colors.foreground,
                  fontWeight: selected ? '600' : '400',
                }}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        disabled={!canPublish}
        onPress={handlePublish}
        style={[
          styles.publishButton,
          {
            backgroundColor: colors.primary,
            borderRadius: radius.lg,
            opacity: canPublish ? 1 : 0.5,
          },
        ]}
      >
        <Text style={[styles.publishText, { color: colors.primaryForeground }]}>
          Publish poll
        </Text>
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
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionInput: {
    flex: 1,
  },
  removeButton: {
    marginLeft: 8,
    padding: 6,
  },
  addOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  addOptionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  publishButton: {
    marginTop: 28,
    paddingVertical: 14,
    alignItems: 'center',
  },
  publishText: {
    fontSize: 14,
    fontWeight: '600',
  },
});