// Screen purpose: Shared notice detail view.
import { StyleSheet, Text, View } from 'react-native';
import AppScreen from '@/components/ui/AppScreen';
import { useThemeStore } from '@/store/useThemeStore';

export default function SharedNoticeDetailsScreen() {
  const colors = useThemeStore((state) => state.colors);

  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>Community notice</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>New gym timetable</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
        <Text style={[styles.cardText, { color: colors.mutedForeground }]}>The gym now operates from 6am to 10pm on weekdays and closes early on Sundays.</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 6, marginBottom: 14 },
  eyebrow: { fontSize: 13, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
  title: { fontSize: 24, fontWeight: '700' },
  card: { borderWidth: 1, borderRadius: 18, padding: 16, gap: 8 },
  cardText: { fontSize: 14, lineHeight: 20 },
});
