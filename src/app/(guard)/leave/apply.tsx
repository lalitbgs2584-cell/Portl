import { DatePickerModal } from '@/components/ui/DatePickerModal';
import { Dropdown } from '@/components/ui/DropDown';
import { useTheme } from '@/store/useTheme';
import { LeaveType } from '@/types/guard.types';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LEAVE_OPTIONS: { label: string; value: LeaveType }[] = [
  { label: 'Sick leave', value: 'sick' },
  { label: 'Casual leave', value: 'casual' },
  { label: 'Emergency leave', value: 'emergency' },
  { label: 'Other', value: 'other' },
];

export default function ApplyLeaveScreen() {
  const { colors, radius } = useTheme();
  const [type, setType] = useState<LeaveType | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [reason, setReason] = useState('');
  const [pickerOpen, setPickerOpen] = useState<'from' | 'to' | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isValid = type !== null && fromDate !== null && toDate !== null && reason.trim().length > 0 && toDate >= fromDate!;

  const fmt = (d: Date | null) => (d ? d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Select date');

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    // TODO: insert into Supabase `leave_requests`, notify admin
    setSubmitting(false);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground, marginBottom: 20 }}>Apply for leave</Text>

          <Dropdown
            label="Leave type"
            placeholder="Select leave type"
            value={type}
            options={LEAVE_OPTIONS}
            onSelect={(v) => setType(v as LeaveType)}
          />

          <View style={styles.dateRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 6 }}>From date</Text>
              <TouchableOpacity
                onPress={() => setPickerOpen('from')}
                style={[styles.dateField, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.md }]}
              >
                <Text style={{ color: fromDate ? colors.foreground : colors.mutedForeground, fontSize: 13 }}>{fmt(fromDate)}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 6 }}>To date</Text>
              <TouchableOpacity
                onPress={() => setPickerOpen('to')}
                style={[styles.dateField, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.md }]}
              >
                <Text style={{ color: toDate ? colors.foreground : colors.mutedForeground, fontSize: 13 }}>{fmt(toDate)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <DatePickerModal
            visible={pickerOpen !== null}
            initialDate={(pickerOpen === 'from' ? fromDate : toDate) ?? undefined}
            minDate={pickerOpen === 'to' ? fromDate ?? undefined : new Date()}
            onConfirm={(selected) => {
              if (pickerOpen === 'from') setFromDate(selected);
              else if (pickerOpen === 'to') setToDate(selected);
              setPickerOpen(null);
            }}
            onClose={() => setPickerOpen(null)}
          />

          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 16, marginBottom: 6 }}>Reason</Text>
          <TextInput
            value={reason}
            onChangeText={setReason}
            placeholder="Brief reason for leave"
            placeholderTextColor={colors.mutedForeground}
            multiline
            numberOfLines={4}
            style={[styles.textarea, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: radius.md }]}
          />
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.background }]}>
          <TouchableOpacity
            disabled={!isValid || submitting}
            onPress={handleSubmit}
            style={[styles.submitBtn, { backgroundColor: isValid ? colors.primary : colors.muted, borderRadius: radius.lg }]}
          >
            <Text style={{ color: isValid ? colors.primaryForeground : colors.mutedForeground, fontWeight: '600' }}>
              {submitting ? 'Submitting…' : 'Submit for approval'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  dateRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  dateField: { height: 46, borderWidth: 1, justifyContent: 'center', paddingHorizontal: 14 },
  textarea: { height: 100, borderWidth: 1, paddingHorizontal: 14, paddingTop: 12, fontSize: 14, textAlignVertical: 'top' },
  footer: { padding: 16, borderTopWidth: 1 },
  submitBtn: { height: 48, alignItems: 'center', justifyContent: 'center' },
});