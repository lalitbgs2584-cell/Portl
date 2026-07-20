import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/useThemeStore';

export default function JoinSocietyScreen() {
  const colors = useThemeStore((state) => state.colors);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.page, { backgroundColor: colors.background, paddingTop: insets.top + 32 }]}>
      <View style={[styles.iconCircle, { backgroundColor: colors.secondary }]}><Text style={[styles.icon, { color: colors.primary }]}>⌂</Text></View>
      <Text style={[styles.title, { color: colors.foreground }]}>Find your society</Text>
      <Text style={[styles.copy, { color: colors.mutedForeground }]}>Enter the invite code shared by your society administrator.</Text>
      <TextInput placeholder="e.g. MAPLE-4821" placeholderTextColor={colors.mutedForeground} autoCapitalize="characters" style={[styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }]} />
      <Pressable onPress={() => router.replace('/(auth)/PendingApproval' as never)} style={[styles.button, { backgroundColor: colors.primary }]}><Text style={{ color: colors.primaryForeground, fontWeight: '800' }}>Request to join</Text></Pressable>
      <Text style={[styles.link, { color: colors.primary }]}>Scan society QR instead</Text>
    </View>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, paddingHorizontal: 24 }, iconCircle: { width: 64, height: 64, borderRadius: 22, alignItems: 'center', justifyContent: 'center' }, icon: { fontSize: 30 }, title: { fontSize: 32, fontWeight: '800', marginTop: 28 }, copy: { fontSize: 16, lineHeight: 24, marginTop: 10 }, input: { height: 56, marginTop: 36, borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, fontWeight: '700', letterSpacing: 1 }, button: { height: 54, marginTop: 16, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, link: { textAlign: 'center', fontWeight: '700', marginTop: 22 } });
