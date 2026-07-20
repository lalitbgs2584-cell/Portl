import { Dropdown } from '@/components/ui/DropDown';
import { useTheme } from '@/store/useTheme';
import { IssueReport, ComplaintStatus } from '@/types/guard.types';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ⚠️ Not in guard.types.ts — IssueReport currently has no `type`/category field.
// Kept local until the complaints table's real category column is confirmed (flag #3).
type IssueType = 'security' | 'maintenance' | 'noise' | 'suspicious_activity' | 'other';

const ISSUE_OPTIONS: { label: string; value: IssueType }[] = [
  { label: 'Security concern', value: 'security' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Noise complaint', value: 'noise' },
  { label: 'Suspicious activity', value: 'suspicious_activity' },
  { label: 'Other', value: 'other' },
];

export default function ReportIssueScreen() {
  const { colors, radius } = useTheme();
  const [type, setType] = useState<IssueType | null>(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isValid = type !== null && description.trim().length > 0 && location.trim().length > 0;

  const attachPhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.6, allowsEditing: true });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!isValid || !type) return;
    setSubmitting(true);

    // IssueReport has no field for `type` right now, so until the category
    // column is confirmed, we fold it into the description so it isn't lost.
    const newReport: Omit<IssueReport, 'id' | 'createdAt'> = {
      description: `[${ISSUE_OPTIONS.find((o) => o.value === type)?.label}] ${description.trim()}`,
      location: location.trim(),
      photoUri: photoUri ?? undefined,
      reportedByGuardId: '', // TODO: pull from auth/session context
      status: 'open' as ComplaintStatus,
    };

    // TODO: insert `newReport` into Supabase `complaints` (or `issue_reports`), notify admin queue
    setSubmitting(false);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground, marginBottom: 4 }}>Report an issue</Text>
          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 20 }}>
            This goes straight to the admin queue.
          </Text>

          <Dropdown
            label="Issue type"
            placeholder="Select issue type"
            value={type}
            options={ISSUE_OPTIONS}
            onSelect={(v) => setType(v as IssueType)}
          />

          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 6 }}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="What happened?"
            placeholderTextColor={colors.mutedForeground}
            multiline
            numberOfLines={4}
            style={[
              styles.textarea,
              { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: radius.md },
            ]}
          />

          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 16, marginBottom: 6 }}>Location</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="e.g. Gate 2, Block C parking"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: radius.md }]}
          />

          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 16, marginBottom: 6 }}>Attachment (optional)</Text>
          <TouchableOpacity
            onPress={attachPhoto}
            style={[styles.photoBox, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.md }]}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={{ width: '100%', height: '100%', borderRadius: radius.md }} contentFit="cover" />
            ) : (
              <>
                <Ionicons name="camera-outline" size={22} color={colors.mutedForeground} />
                <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 6 }}>Attach photo</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.background }]}>
          <TouchableOpacity
            disabled={!isValid || submitting}
            onPress={handleSubmit}
            style={[styles.submitBtn, { backgroundColor: isValid ? colors.destructive : colors.muted, borderRadius: radius.lg }]}
          >
            <Text style={{ color: isValid ? '#FFFDF9' : colors.mutedForeground, fontWeight: '600' }}>
              {submitting ? 'Submitting…' : 'Submit report'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: { height: 46, borderWidth: 1, paddingHorizontal: 14, fontSize: 14 },
  textarea: { height: 100, borderWidth: 1, paddingHorizontal: 14, paddingTop: 12, fontSize: 14, textAlignVertical: 'top' },
  photoBox: { height: 120, borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  footer: { padding: 16, borderTopWidth: 1 },
  submitBtn: { height: 48, alignItems: 'center', justifyContent: 'center' },
});