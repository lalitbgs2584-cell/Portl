import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/useThemeStore';

export default function OtpScreen() {
  const [code, setCode] = useState('');
  const colors = useThemeStore((state) => state.colors);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.page, { backgroundColor: colors.background, paddingTop: insets.top + 32 }]}>
      <Text style={[styles.eyebrow, { color: colors.primary }]}>SECURE SIGN IN</Text>
      <Text style={[styles.title, { color: colors.foreground }]}>Check your phone</Text>
      <Text style={[styles.copy, { color: colors.mutedForeground }]}>We sent a six-digit code to your mobile number.</Text>
      <TextInput value={code} onChangeText={setCode} keyboardType="number-pad" maxLength={6} placeholder="• • • • • •" placeholderTextColor={colors.mutedForeground} style={[styles.codeInput, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
      <Pressable onPress={() => router.replace('/(auth)/JoinSociety' as never)} style={[styles.button, { backgroundColor: colors.primary }]}><Text style={{ color: colors.primaryForeground, fontWeight: '800' }}>Verify and continue</Text></Pressable>
      <Text style={[styles.resend, { color: colors.primary }]}>Resend code in 00:28</Text>
    </View>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, paddingHorizontal: 24 }, eyebrow: { fontSize: 12, fontWeight: '800', letterSpacing: 1 }, title: { fontSize: 32, fontWeight: '800', marginTop: 14 }, copy: { fontSize: 16, lineHeight: 24, marginTop: 10 }, codeInput: { height: 70, marginTop: 42, borderWidth: 1, borderRadius: 14, textAlign: 'center', fontSize: 24, letterSpacing: 8, fontWeight: '800' }, button: { height: 54, marginTop: 20, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, resend: { marginTop: 22, textAlign: 'center', fontWeight: '700' } });
