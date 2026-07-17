import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/store/useTheme';

const SHIFTS = ['Morning', 'Evening', 'Night'] as const;
const DUTY_AREAS = ['A block', 'B block', 'Main gate'] as const;

export default function GuardDutyTab() {
  const { colors, radius } = useTheme();
  const [shift, setShift] = useState<(typeof SHIFTS)[number]>('Morning');
  const [dutyArea, setDutyArea] = useState<(typeof DUTY_AREAS)[number]>('A block');

  const handleAssign = () => {
    // TODO: update guard's current shift/duty area in Supabase
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.mutedForeground }]}>Shift</Text>
      <View style={styles.chipRow}>
        {SHIFTS.map((option) => {
          const selected = option === shift;
          return (
            <Pressable
              key={option}
              onPress={() => setShift(option)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? colors.primary : colors.card,
                  borderColor: selected ? colors.primary : colors.border,
                  borderRadius: radius.xl,
                },
              ]}
            >
              <Text style={{ fontSize: 12, color: selected ? colors.primaryForeground : colors.foreground, fontWeight: selected ? '600' : '400' }}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 20 }]}>Duty area</Text>
      <View style={styles.chipRow}>
        {DUTY_AREAS.map((option) => {
          const selected = option === dutyArea;
          return (
            <Pressable
              key={option}
              onPress={() => setDutyArea(option)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? colors.primary : colors.card,
                  borderColor: selected ? colors.primary : colors.border,
                  borderRadius: radius.xl,
                },
              ]}
            >
              <Text style={{ fontSize: 12, color: selected ? colors.primaryForeground : colors.foreground, fontWeight: selected ? '600' : '400' }}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={handleAssign}
        style={[styles.assignButton, { backgroundColor: colors.primary, borderRadius: radius.lg }]}
      >
        <Text style={{ color: colors.primaryForeground, fontWeight: '600', fontSize: 14 }}>Assign</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  assignButton: {
    marginTop: 28,
    paddingVertical: 14,
    alignItems: 'center',
  },
});
