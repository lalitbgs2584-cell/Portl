// Screen purpose: Shared profile screen.
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AppScreen from '@/components/ui/AppScreen';
import { useThemeStore } from '@/store/useThemeStore';

export default function ProfileScreen() {
  const colors = useThemeStore((state) => state.colors);

  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>Profile</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Your resident profile</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>Rohan Rao</Text>
        <Text style={[styles.cardText, { color: colors.mutedForeground }]}>Flat A-102 · Resident since 2022</Text>
        <Pressable style={[styles.primaryButton, { backgroundColor: colors.primary }]}> 
          <Text style={[styles.primaryButtonText, { color: colors.primaryForeground }]}>Edit profile</Text>
        </Pressable>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 6, marginBottom: 14 },
  eyebrow: { fontSize: 13, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 24, fontWeight: '700' },
  card: { borderWidth: 1, borderRadius: 18, padding: 16, gap: 10 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardText: { fontSize: 14, lineHeight: 20 },
  primaryButton: { borderRadius: 12, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  primaryButtonText: { fontSize: 14, fontWeight: '700' },
});
