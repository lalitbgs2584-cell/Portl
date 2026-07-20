import { useTheme } from '@/store/useTheme';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HandoverConfirmScreen() {
  const { colors, radius } = useTheme();
  const { shiftId } = useLocalSearchParams<{ shiftId: string }>();
  const [query, setQuery] = useState('');
  const [selectedGuard, setSelectedGuard] = useState<{ id: string; name: string } | null>(null);

  // TODO: replace with real Supabase query against society's guard roster
  const guardResults =
    query.length > 0 ? [{ id: 'g3', name: 'Suresh Yadav' }, { id: 'g4', name: 'Vikas Sharma' }] : [];

  const handleConfirm = () => {
    if (!selectedGuard) return;
    // TODO: write Attendance row — markedByGuardId = current user, guardId = selectedGuard.id, shiftId
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground }}>Confirm handover</Text>
        <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 4, marginBottom: 20 }}>
          Select the guard taking over this shift. Their attendance will be marked once you confirm.
        </Text>

        <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 6 }}>Incoming guard</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name"
          placeholderTextColor={colors.mutedForeground}
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: radius.md }]}
        />

        {guardResults.map((g) => (
          <TouchableOpacity
            key={g.id}
            onPress={() => setSelectedGuard(g)}
            style={[
              styles.resultRow,
              {
                backgroundColor: selectedGuard?.id === g.id ? colors.secondary : colors.card,
                borderColor: colors.border,
                borderRadius: radius.md,
              },
            ]}
          >
            <Text style={{ color: colors.foreground }}>{g.name}</Text>
          </TouchableOpacity>
        ))}

        {selectedGuard && (
          <View style={[styles.confirmCard, { backgroundColor: colors.muted, borderRadius: radius.lg }]}>
            <Text style={{ fontSize: 13, color: colors.foreground }}>
              You're marking <Text style={{ fontWeight: '600' }}>{selectedGuard.name}</Text> present for this shift.
            </Text>
          </View>
        )}

        <TouchableOpacity
          disabled={!selectedGuard}
          onPress={handleConfirm}
          style={[styles.confirmBtn, { backgroundColor: selectedGuard ? colors.primary : colors.muted, borderRadius: radius.lg }]}
        >
          <Text style={{ color: selectedGuard ? colors.primaryForeground : colors.mutedForeground, fontWeight: '600' }}>
            Confirm handover
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: { height: 44, borderWidth: 1, paddingHorizontal: 14, fontSize: 14, marginBottom: 12 },
  resultRow: { height: 44, borderWidth: 1, justifyContent: 'center', paddingHorizontal: 14, marginBottom: 8 },
  confirmCard: { padding: 14, marginTop: 8 },
  confirmBtn: { height: 48, alignItems: 'center', justifyContent: 'center', marginTop: 24 },
});