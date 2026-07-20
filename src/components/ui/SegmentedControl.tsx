import { useTheme } from '@/store/useTheme';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.muted, borderRadius: radius.lg }]}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[styles.segment, active && { backgroundColor: colors.card, borderRadius: radius.md }]}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: active ? '600' : '400',
                color: active ? colors.foreground : colors.mutedForeground,
              }}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', padding: 4 },
  segment: { flex: 1, paddingVertical: 8, alignItems: 'center' },
});