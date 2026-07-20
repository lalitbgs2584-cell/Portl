import { useTheme } from '@/store/useTheme';
import { Shift } from '@/types/guard.types';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  days: { date: string; dayLabel: string; dateNum: number; shift?: Shift }[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function ShiftCalendarStrip({ days, selectedDate, onSelectDate }: Props) {
  const { colors, radius } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
    >
      {days.map((day) => {
        const isSelected = day.date === selectedDate;
        return (
          <TouchableOpacity
            key={day.date}
            onPress={() => onSelectDate(day.date)}
            activeOpacity={0.8}
            style={[
              styles.dayCell,
              {
                backgroundColor: isSelected ? colors.primary : colors.card,
                borderColor: isSelected ? colors.primary : colors.border,
                borderRadius: radius.lg,
              },
            ]}
          >
            <Text style={{ fontSize: 10, color: isSelected ? colors.secondary : colors.mutedForeground }}>
              {day.dayLabel}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '600',
                marginTop: 2,
                color: isSelected ? colors.primaryForeground : colors.foreground,
              }}
            >
              {day.dateNum}
            </Text>
            {day.shift && (
              <View style={[styles.dot, { backgroundColor: isSelected ? colors.primaryForeground : colors.accent }]} />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dayCell: { width: 48, paddingVertical: 10, alignItems: 'center', borderWidth: 1 },
  dot: { width: 4, height: 4, borderRadius: 2, marginTop: 4 },
});