import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/store/useTheme';
import StatusPill from '@/components/resident/StatusPill';

export default function TicketDetailScreen() {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Ticket #T1" showSearch={false} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
          <StatusPill status="In Progress" />
          <Text style={[styles.title, { color: colors.foreground }]}>Water leakage in master bathroom</Text>
          <Text style={[styles.desc, { color: colors.mutedForeground }]}>The tap under the sink is leaking water onto the floor continuously.</Text>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Updates & Timeline</Text>
        
        <View style={[styles.threadBox, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.xl }]}>
          <Text style={{ fontWeight: '700', color: colors.foreground }}>Facility Manager</Text>
          <Text style={{ color: colors.mutedForeground, fontSize: 13, marginTop: 2 }}>Plumber assigned. Will visit by 3:00 PM.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { padding: 16, borderWidth: 1, marginBottom: 16 },
  title: { fontSize: 16, fontWeight: '700', marginTop: 8 },
  desc: { fontSize: 13, marginTop: 4 },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 8 },
  threadBox: { padding: 12, borderWidth: 1, marginBottom: 8 },
});