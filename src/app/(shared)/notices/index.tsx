// Screen purpose: Shared notices list screen.
import { StyleSheet, Text, View } from 'react-native';
import AppScreen from '@/components/ui/AppScreen';
import { useThemeStore } from '@/store/useThemeStore';

const notices = [
  { id: '1', title: 'Maintenance notice', time: 'Today' },
  { id: '2', title: 'Guest parking reminder', time: 'Yesterday' },
];

export default function SharedNoticesScreen() {
  const colors = useThemeStore((state) => state.colors);

  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>Notices</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Community updates</Text>
      </View>

      {notices.map((notice) => (
        <View key={notice.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>{notice.title}</Text>
          <Text style={[styles.cardText, { color: colors.mutedForeground }]}>{notice.time}</Text>
        </View>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 6, marginBottom: 14 },
  eyebrow: { fontSize: 13, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 24, fontWeight: '700' },
  card: { borderWidth: 1, borderRadius: 18, padding: 16, marginBottom: 12, gap: 8 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardText: { fontSize: 14, lineHeight: 20 },
});
