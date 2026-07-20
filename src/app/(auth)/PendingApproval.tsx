import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/useThemeStore';
import { useRoleStore } from '@/store/useRoleStore';

export default function PendingApprovalScreen() {
  const colors = useThemeStore((state) => state.colors);
  const role = useRoleStore((state) => state.role)?.name ?? 'Resident';
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const homeRoute = role === 'Admin' ? '/(admin)/(tabs)/home' : role === 'Guard' ? '/(guard)/(tabs)/home' : role === 'Staff' ? '/(staff)/(tabs)/home' : '/(resident)/(tabs)/home';

  return (
    <View style={[styles.page, { backgroundColor: colors.background, paddingTop: insets.top + 32 }]}>
      <View style={[styles.circle, { backgroundColor: colors.secondary }]}><Text style={[styles.check, { color: colors.primary }]}>✓</Text></View>
      <Text style={[styles.title, { color: colors.foreground }]}>Request received</Text>
      <Text style={[styles.copy, { color: colors.mutedForeground }]}>Your request has been shared with Maple Heights. You’ll be notified once it’s approved.</Text>
      <Pressable onPress={() => router.replace(homeRoute as never)} style={[styles.button, { backgroundColor: colors.primary }]}><Text style={{ color: colors.primaryForeground, fontWeight: '800' }}>Preview {role} home</Text></Pressable>
      <Text style={[styles.note, { color: colors.mutedForeground }]}>Preview uses local mock data only.</Text>
    </View>
  );
}

const styles = StyleSheet.create({ page: { flex: 1, paddingHorizontal: 24, alignItems: 'center' }, circle: { width: 88, height: 88, marginTop: 80, borderRadius: 44, alignItems: 'center', justifyContent: 'center' }, check: { fontSize: 34 }, title: { fontSize: 30, fontWeight: '800', marginTop: 28 }, copy: { fontSize: 16, lineHeight: 24, textAlign: 'center', marginTop: 12 }, button: { alignSelf: 'stretch', height: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 40 }, note: { fontSize: 12, marginTop: 16 } });
