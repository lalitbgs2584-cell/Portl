import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/resident/layout/Header';
import Button from '@/components/resident/Button';
import { useTheme } from '@/store/useTheme';

export default function PaymentsScreen() {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Maintenance & Dues" showSearch={false} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Total Hero Banner */}
        <View style={[styles.heroCard, { backgroundColor: colors.primary, borderRadius: radius['2xl'] }]}>
          <Text style={{ color: colors.primaryForeground, opacity: 0.8, fontSize: 12 }}>Total Outstanding</Text>
          <Text style={{ color: colors.primaryForeground, fontSize: 28, fontWeight: '800', marginVertical: 4 }}>₹4,500</Text>
          <Text style={{ color: colors.primaryForeground, fontSize: 11 }}>Due Date: 25th July 2026</Text>
        </View>

        {/* Breakdown */}
        <Text style={[styles.secTitle, { color: colors.foreground }]}>Invoice Breakdown</Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
          <View style={styles.line}><Text style={{ color: colors.foreground }}>Society Maintenance</Text><Text style={{ color: colors.foreground, fontWeight: '600' }}>₹3,500</Text></View>
          <View style={styles.line}><Text style={{ color: colors.foreground }}>Water Charges</Text><Text style={{ color: colors.foreground, fontWeight: '600' }}>₹600</Text></View>
          <View style={styles.line}><Text style={{ color: colors.foreground }}>Clubhouse Levy</Text><Text style={{ color: colors.foreground, fontWeight: '600' }}>₹400</Text></View>
        </View>

        <Button title="Proceed to Pay ₹4,500" onPress={() => alert('Redirecting to Payment Gateway...')} style={{ marginTop: 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroCard: { padding: 20, marginBottom: 16 },
  secTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  card: { padding: 16, borderWidth: 1 },
  line: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
});