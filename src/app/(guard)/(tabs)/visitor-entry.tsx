
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
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
import { Dropdown } from '@/components/ui/DropDown';
import { useTheme } from '@/store/useTheme';
import { VisitType } from '@/types/guard.types';

type VisitorPurpose = VisitType;

const PURPOSE_OPTIONS: { label: string; value: VisitorPurpose }[] = [
  { label: 'Guest', value: 'guest' },
  { label: 'Delivery', value: 'delivery' },
  { label: 'Service / repair', value: 'service' },
  { label: 'Cab / driver', value: 'delivery'},
  { label: 'Other', value: 'emergency' },
];

export default function VisitorEntryScreen() {
  const { colors, radius } = useTheme();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState<VisitorPurpose | null>(null);
  const [visitingFlat, setVisitingFlat] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isValid = name.trim().length > 0 && phone.trim().length >= 10 && purpose !== null && visitingFlat.trim().length > 0;

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({ quality: 0.6, allowsEditing: true });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    setSubmitting(true);
    // TODO: insert into Supabase `visitor_entries`, trigger realtime notify to flat's residents
    setSubmitting(false);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground, marginBottom: 4 }}>New visitor</Text>
          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 20 }}>
            Log details before letting a visitor in.
          </Text>

          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 6 }}>Visitor name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: radius.md }]}
          />

          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 16, marginBottom: 6 }}>Mobile number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="10-digit number"
            keyboardType="phone-pad"
            maxLength={10}
            placeholderTextColor={colors.mutedForeground}
            style={[
              styles.input,
              { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: radius.md, marginBottom: 16 },
            ]}
          />

          <Dropdown
            label="Purpose of visit"
            placeholder="Select purpose"
            value={purpose}
            options={PURPOSE_OPTIONS}
            onSelect={(v) => setPurpose(v as VisitorPurpose)}
          />

          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginBottom: 6 }}>Flat / resident</Text>
          <TextInput
            value={visitingFlat}
            onChangeText={setVisitingFlat}
            placeholder="e.g. B-402"
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, borderRadius: radius.md }]}
          />

          <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 16, marginBottom: 6 }}>Photo (optional)</Text>
          <TouchableOpacity
            onPress={takePhoto}
            style={[styles.photoBox, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.md }]}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={{ width: '100%', height: '100%', borderRadius: radius.md }} contentFit="cover" />
            ) : (
              <>
                <Ionicons name="camera-outline" size={22} color={colors.mutedForeground} />
                <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 6 }}>Tap to capture</Text>
              </>
            )}
          </TouchableOpacity>
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.background }]}>
          <TouchableOpacity
            disabled={!isValid || submitting}
            onPress={handleSubmit}
            style={[styles.submitBtn, { backgroundColor: isValid ? colors.primary : colors.muted, borderRadius: radius.lg }]}
          >
            <Text style={{ color: isValid ? colors.primaryForeground : colors.mutedForeground, fontWeight: '600' }}>
              {submitting ? 'Submitting…' : 'Submit entry'}
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
  photoBox: { height: 120, borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  footer: { padding: 16, borderTopWidth: 1 },
  submitBtn: { height: 48, alignItems: 'center', justifyContent: 'center' },
});