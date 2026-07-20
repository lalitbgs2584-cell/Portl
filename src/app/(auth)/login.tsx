// Screen purpose: Sign in to Portl and continue into the society flow.
import AppScreen from '@/components/ui/AppScreen';
import { useThemeStore } from '@/store/useThemeStore';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const colors = useThemeStore((state) => state.colors);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>Portl</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Welcome back</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Secure sign in for residents, guards and admins.</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.label, { color: colors.foreground }]}>Email</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.foreground, backgroundColor: colors.background }]}
          placeholder="name@portl.com"
          placeholderTextColor={colors.mutedForeground}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={[styles.label, { color: colors.foreground }]}>Password</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.foreground, backgroundColor: colors.background }]}
          placeholder="••••••••"
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(auth)/pending-approval' as never)}
        >
          <Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>Sign in</Text>
        </Pressable>

        <Pressable
          style={[styles.secondaryButton, { borderColor: colors.border }]}
          onPress={() => router.push('/(auth)/join-society' as never)}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.foreground }]}>Join a society</Text>
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
