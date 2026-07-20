import { useTheme } from '@/store/useTheme';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GreetingHeader() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.greeting, { color: colors.foreground }]}>Hello, Aarav 👋</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        Welcome to Portl Heights
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
});