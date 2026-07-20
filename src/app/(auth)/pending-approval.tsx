// Screen purpose: Show the waiting state until an admin approves the society access request.
import AppScreen from '@/components/ui/AppScreen';
import { useThemeStore } from '@/store/useThemeStore';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PendingApprovalScreen() {
  const colors = useThemeStore((state) => state.colors);
  const router = useRouter();

  return (
    <AppScreen>
      <View style={styles.centered}>
        <View style={[styles.icon, { backgroundColor: colors.secondary }]}> 
          <Text style={[styles.iconText, { color: colors.primary }]}>✓</Text>
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Request received</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Your society request has been shared with the admin. You will be notified once they approve your access.</Text>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>What happens next?</Text>
          <Text style={[styles.cardText, { color: colors.mutedForeground }]}>The admin can approve residents, guards and staff on a per-society basis before they can access notices, help desk and visitor controls.</Text>
        </View>

        <Pressable
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(resident)/dashboard' as never)}
        >
          <Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>Continue to dashboard</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  centered: { gap: 16, alignItems: 'center', paddingTop: 12 },
  icon: { width: 84, height: 84, borderRadius: 42, alignItems: 'center', justifyContent: 'center' },
  iconText: { fontSize: 30, fontWeight: '700' },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  subtitle: { fontSize: 15, lineHeight: 22, textAlign: 'center' },
  card: { borderWidth: 1, borderRadius: 18, padding: 16, width: '100%', gap: 6 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardText: { fontSize: 14, lineHeight: 20 },
  primaryButton: { borderRadius: 14, paddingVertical: 13, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  primaryButtonText: { fontSize: 15, fontWeight: '700' },
});
