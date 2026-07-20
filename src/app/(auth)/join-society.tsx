// Screen purpose: Enter a society code or scan a QR to join the right community.
import AppScreen from '@/components/ui/AppScreen';
import { useThemeStore } from '@/store/useThemeStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function JoinSocietyScreen() {
  const colors = useThemeStore((state) => state.colors);
  const router = useRouter();
  const [code, setCode] = useState('');

  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>Join society</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Enter the society code</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Residents, guards and admins can enter a society using a QR code or invite code.</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.label, { color: colors.foreground }]}>Invite code</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.foreground, backgroundColor: colors.background }]}
          placeholder="PORTL-1234"
          placeholderTextColor={colors.mutedForeground}
          value={code}
          onChangeText={setCode}
          autoCapitalize="characters"
        />

        <Pressable
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(auth)/pending-approval' as never)}
        >
          <Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>Continue</Text>
        </Pressable>

        <Pressable style={[styles.secondaryButton, { borderColor: colors.border }]}> 
          <Text style={[styles.secondaryButtonText, { color: colors.foreground }]}>Scan QR instead</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 6, marginBottom: 24 },
  eyebrow: { fontSize: 13, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 15, lineHeight: 22 },
  card: { borderWidth: 1, borderRadius: 20, padding: 18, gap: 12 },
  label: { fontSize: 14, fontWeight: '600' },
  input: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  primaryButton: { borderRadius: 14, paddingVertical: 13, alignItems: 'center', justifyContent: 'center', marginTop: 6 },
  primaryButtonText: { fontSize: 15, fontWeight: '700' },
  secondaryButton: { borderWidth: 1, borderRadius: 14, paddingVertical: 13, alignItems: 'center', justifyContent: 'center' },
  secondaryButtonText: { fontSize: 15, fontWeight: '600' },
});
