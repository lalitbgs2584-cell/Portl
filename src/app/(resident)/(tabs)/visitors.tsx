import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Header from '@/components/resident/layout/Header';
import VisitorListItem from '@/components/resident/visitors/VisitorListItem';
import { Visitor } from '@/types/resident.types';
import { useRouter } from 'expo-router';
import { useTheme } from '@/store/useTheme';

const mockVisitors: Visitor[] = [
  { id: '1', name: 'Ramesh Kumar', type: 'DELIVERY', company: 'Amazon', time: '10:30 AM', phone: '9876543210', status: 'PENDING' },
  { id: '2', name: 'Suresh Patel', type: 'GUEST', time: 'Yesterday, 8:00 PM', phone: '9812345678', status: 'APPROVED' },
  { id: '3', name: 'Uber Driver', type: 'CAB', company: 'Uber', time: '20 Jul, 4:15 PM', phone: '9000000000', status: 'DENIED' },
];

export default function VisitorsScreen() {
  const { colors, radius } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Visitors Log" showSearch={false} />
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[styles.preApproveBtn, { backgroundColor: colors.primary, borderRadius: radius.xl }]}
          onPress={() => router.push('./preapprove')}
        >
          <Text style={[styles.btnText, { color: colors.primaryForeground }]}>+ Pre-Approve Guest</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={mockVisitors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VisitorListItem visitor={item} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 16, paddingVertical: 8 },
  preApproveBtn: { height: 44, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontSize: 14, fontWeight: '700' },
});