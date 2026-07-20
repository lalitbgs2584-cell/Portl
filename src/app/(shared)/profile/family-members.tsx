// Screen purpose: Family members screen.
import { StyleSheet, Text, View } from 'react-native';
import AppScreen from '@/components/ui/AppScreen';
import { useThemeStore } from '@/store/useThemeStore';

const members = [
  { id: '1', name: 'Nisha Rao', relation: 'Spouse' },
  { id: '2', name: 'Aditi Rao', relation: 'Daughter' },
];

export default function FamilyMembersScreen() {
  const colors = useThemeStore((state) => state.colors);

  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: colors.primary }]}>Family</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Connected members</Text>
      </View>

      {members.map((member) => (
        <View key={member.id} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}> 
          <Text style={[styles.cardTitle, { color: colors.foreground }]}>{member.name}</Text>
          <Text style={[styles.cardText, { color: colors.mutedForeground }]}>{member.relation}</Text>
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
