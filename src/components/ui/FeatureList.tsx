import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '@/store/useThemeStore';
import { radius } from '@/lib/theme';
import StatusPill from './StatusPill';

type IconName = ComponentProps<typeof Ionicons>['name'];

export type FeatureItem = {
  title: string;
  description: string;
  icon: IconName;
  badge?: string;
  tone?: 'default' | 'success' | 'warning' | 'danger';
};

type FeatureListProps = {
  items: FeatureItem[];
};

export default function FeatureList({ items }: FeatureListProps) {
  const colors = useThemeStore((state) => state.colors);

  return (
    <View style={[styles.list, { backgroundColor: colors.card, borderColor: colors.border }]}> 
      {items.map((item, index) => (
        <Pressable
          key={item.title}
          style={({ pressed }) => [styles.item, index > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border }, { opacity: pressed ? 0.75 : 1 }]}
        >
          <View style={[styles.iconBox, { backgroundColor: colors.secondary }]}>
            <Ionicons name={item.icon} size={19} color={colors.primary} />
          </View>
          <View style={styles.copy}>
            <Text style={[styles.title, { color: colors.foreground }]}>{item.title}</Text>
            <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={1}>{item.description}</Text>
          </View>
          {item.badge ? <StatusPill label={item.badge} tone={item.tone} /> : <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { borderWidth: 1, borderRadius: radius['2xl'], overflow: 'hidden' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 70, paddingHorizontal: 14, paddingVertical: 11 },
  iconBox: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  title: { fontSize: 14, fontWeight: '800' },
  description: { fontSize: 12, fontWeight: '500', marginTop: 3 },
});
