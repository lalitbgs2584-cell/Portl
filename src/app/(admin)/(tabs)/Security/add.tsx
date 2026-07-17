import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';

export default function AddGuardScreen() {
  const { colors, radius } = useTheme();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dutyArea, setDutyArea] = useState('');

  const canSave = name.trim().length > 0 && phone.trim().length >= 10;

  const handleSave = () => {
    // TODO: insert into Supabase `guards` table (this is the ONLY way a guard record is created —
    // there is no guard-facing sign-up screen, by design)
    router.back();
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <View style={[styles.noticeBox, { backgroundColor: colors.muted, borderColor: colors.primary, borderRadius: radius.md }]}>
        <Feather name="info" size={14} color={colors.primary} />
        <Text style={{ color: colors.foreground, fontSize: 11, marginLeft: 8, flex: 1 }}>
          Only admins can add guards. Guards can't self sign up — they'll be verified against this
          record when they sign in.
        </Text>
      </View>

      <Text style={[styles.label, { color: colors.mutedForeground }]}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Rahul Sharma"
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, color: colors.foreground }]}
      />

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 14 }]}>Phone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="9876543210"
        keyboardType="phone-pad"
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, color: colors.foreground }]}
      />

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 14 }]}>Entry hall / duty area</Text>
      <TextInput
        value={dutyArea}
        onChangeText={setDutyArea}
        placeholder="Block A"
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, color: colors.foreground }]}
      />

      <Pressable
        disabled={!canSave}
        onPress={handleSave}
        style={[styles.saveButton, { backgroundColor: colors.primary, borderRadius: radius.lg, opacity: canSave ? 1 : 0.5 }]}
      >
        <Text style={{ color: colors.primaryForeground, fontWeight: '600', fontSize: 14 }}>Save</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    padding: 10,
    marginBottom: 18,
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
  saveButton: {
    marginTop: 28,
    paddingVertical: 14,
    alignItems: 'center',
  },
});
