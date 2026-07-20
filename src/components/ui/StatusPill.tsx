import { StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '@/store/useThemeStore';

type StatusTone = 'default' | 'success' | 'warning' | 'danger';

type StatusPillProps = {
  label: string;
  tone?: StatusTone;
};

export default function StatusPill({ label, tone = 'default' }: StatusPillProps) {
  const colors = useThemeStore((state) => state.colors);
  const backgroundColor = tone === 'success' ? colors.success : tone === 'danger' ? colors.destructive : colors.secondary;
  const color = tone === 'success' || tone === 'danger' ? colors.primaryForeground : tone === 'warning' ? colors.primary : colors.mutedForeground;

  return (
    <View style={[styles.pill, { backgroundColor }]}> 
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4 },
  label: { fontSize: 11, fontWeight: '800' },
});
