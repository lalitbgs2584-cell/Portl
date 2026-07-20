import { useTheme } from '@/store/useTheme';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  initialDate?: Date;
  minDate?: Date;
  onConfirm: (date: Date) => void;
  onClose: () => void;
}

function getMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS = ['S','M','T','W','T','F','S'];

export function DatePickerModal({ visible, initialDate, minDate, onConfirm, onClose }: Props) {
  const { colors, radius } = useTheme();
  const base = initialDate ?? new Date();
  const [viewYear, setViewYear] = useState(base.getFullYear());
  const [viewMonth, setViewMonth] = useState(base.getMonth());

  const cells = getMonthGrid(viewYear, viewMonth);
  const min = minDate ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : null;

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.sheet, { backgroundColor: colors.card, borderRadius: radius.xl }]}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => changeMonth(-1)} hitSlop={10}>
              <Ionicons name="chevron-back" size={18} color={colors.foreground} />
            </Pressable>
            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground }}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </Text>
            <Pressable onPress={() => changeMonth(1)} hitSlop={10}>
              <Ionicons name="chevron-forward" size={18} color={colors.foreground} />
            </Pressable>
          </View>

          <View style={styles.weekRow}>
            {WEEKDAYS.map((w, i) => (
              <Text key={i} style={[styles.weekLabel, { color: colors.mutedForeground }]}>{w}</Text>
            ))}
          </View>

          <View style={styles.grid}>
            {cells.map((day, i) => {
              if (day === null) return <View key={i} style={styles.cell} />;
              const cellDate = new Date(viewYear, viewMonth, day);
              const disabled = min ? cellDate < min : false;
              const isSelected =
                initialDate &&
                initialDate.getFullYear() === viewYear &&
                initialDate.getMonth() === viewMonth &&
                initialDate.getDate() === day;

              return (
                <Pressable
                  key={i}
                  disabled={disabled}
                  onPress={() => onConfirm(cellDate)}
                  style={[
                    styles.cell,
                    styles.dayCell,
                    { borderRadius: radius.md },
                    isSelected && { backgroundColor: colors.primary },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: disabled ? colors.mutedForeground : isSelected ? colors.primaryForeground : colors.foreground,
                      opacity: disabled ? 0.4 : 1,
                    }}
                  >
                    {day}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  sheet: { padding: 16, width: 300 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  weekRow: { flexDirection: 'row', marginBottom: 4 },
  weekLabel: { flex: 1, textAlign: 'center', fontSize: 11 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  dayCell: { margin: 1 },
});