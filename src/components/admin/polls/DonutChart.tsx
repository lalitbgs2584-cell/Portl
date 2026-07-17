import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';


export interface DonutSegment {
  label: string;
  value: number; // percentage 0-100, all segments should sum to 100
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
}

export function DonutChart({
  segments,
  size = 120,
  strokeWidth = 16,
  centerLabel,
}: DonutChartProps) {
  const { colors } = useTheme();
  const radiusPx = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radiusPx;

  let cumulativePercent = 0;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radiusPx}
          stroke={colors.muted}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {segments.map((segment, index) => {
          const dash = (segment.value / 100) * circumference;
          const gap = circumference - dash;
          const rotation = (cumulativePercent / 100) * 360 - 90;
          cumulativePercent += segment.value;

          return (
            <Circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radiusPx}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeLinecap="butt"
              fill="none"
              rotation={rotation}
              origin={`${size / 2}, ${size / 2}`}
            />
          );
        })}
      </Svg>
      {centerLabel ? (
        <View style={StyleSheet.absoluteFillObject}>
          <View style={styles.centerContainer}>
            <Text style={[styles.centerText, { color: colors.foreground }]}>{centerLabel}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerText: {
    fontSize: 14,
    fontWeight: '600',
  },
});