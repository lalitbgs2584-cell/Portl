import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/resident/layout/Header';
import { useTheme } from '@/store/useTheme';
import Avatar from '@/components/resident/Avatar';

const mockStaff = [
  { id: '1', name: 'Rajesh Kumar', role: 'Electrician', initials: 'RK', phone: '+919876543210' },
  { id: '2', name: 'Mohan Lal', role: 'Plumber', initials: 'ML', phone: '+919812345678' },
  { id: '3', name: 'Sunita Sharma', role: 'Housekeeping Supervisor', initials: 'SS', phone: '+919000000000' },
];

export default function StaffScreen() {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Staff Directory" showSearch={false} />
      <FlatList
        data={mockStaff}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
            <Avatar initials={item.initials} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.name, { color: colors.foreground }]}>{item.name}</Text>
              <Text style={[styles.role, { color: colors.mutedForeground }]}>{item.role}</Text>
            </View>
            <TouchableOpacity style={[styles.callBtn, { backgroundColor: colors.primary, borderRadius: radius.xl }]}>
              <Ionicons name="call" size={16} color={colors.primaryForeground} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1, marginBottom: 10 },
  name: { fontSize: 15, fontWeight: '700' },
  role: { fontSize: 12, marginTop: 2 },
  callBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
});