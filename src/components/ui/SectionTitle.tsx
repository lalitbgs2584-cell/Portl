import { StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '@/store/useThemeStore';

type SectionTitleProps = {
  title: string;
  action?: string;
};

export default function SectionTitle({ title, action }: SectionTitleProps) {
  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      {action ? <Text style={[styles.action, { color: colors.primary }]}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '800', letterSpacing: -0.2 },
  action: { fontSize: 13, fontWeight: '700' },
});
