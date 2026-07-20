
import { useTheme } from '@/store/useTheme';
import { PreApprovedVisitor } from '@/types/guard.types';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList,  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// TODO: replace with Supabase fetch — visitors residents have pre-approved for today
const MOCK_PRE_APPROVED: PreApprovedVisitor[] = [
  { id: 'p1', name: 'Rohit Bhatia', phone: '9876500001', visitingFlat: 'A-102', validFrom: '2026-07-20T09:00', validTo: '2026-07-20T22:00', passStatus: 'active' },
  { id: 'p2', name: 'Amit Malhotra', phone: '9876500002', visitingFlat: 'B-306', validFrom: '2026-07-20T00:00', validTo: '2026-07-20T23:59', passStatus: 'cancelled' },
  { id: 'p3', name: 'Kabir Sethi', phone: '9876500003', visitingFlat: 'C-201', validFrom: '2026-07-20T14:00', validTo: '2026-07-20T20:00', passStatus: 'expired' },
];

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export default function PreApprovedVisitorsScreen() {
  const { colors, radius } = useTheme();
  const [query, setQuery] = useState('');
  const [visitors, setVisitors] = useState(MOCK_PRE_APPROVED);

  const filtered = visitors.filter(
    (v) => v.name.toLowerCase().includes(query.toLowerCase()) || v.visitingFlat.toLowerCase().includes(query.toLowerCase())
  );

  const handleCheckIn = (id: string) => {
    // TODO: update Supabase `pre_approved_visitors.checked_in`, insert a visitor_entries row for the log
    setVisitors((prev) => prev.map((v) => (v.id === id ? { ...v, checkedIn: true } : v)));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ padding: 16, paddingBottom: 0 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.foreground, marginBottom: 12 }}>Pre-approved visitors</Text>

        <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.md }]}>
          <Ionicons name="search" size={16} color={colors.mutedForeground} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search by name or flat"
            placeholderTextColor={colors.mutedForeground}
            style={{ flex: 1, marginLeft: 8, color: colors.foreground, fontSize: 14 }}
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg }]}>
            <View style={[styles.avatar, { backgroundColor: colors.secondary, borderRadius: radius.lg }]}>
              <Text style={{ color: colors.secondaryForeground, fontWeight: '600', fontSize: 13 }}>{initials(item.name)}</Text>
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.foreground }}>{item.name}</Text>
              <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 2 }}>{item.phone}</Text>
              <Text style={{ fontSize: 12, color: colors.mutedForeground, marginTop: 2 }}>Visiting {item.visitingFlat}</Text>
            </View>

            {item.passStatus ? (
              <View style={[styles.checkedBadge, { backgroundColor: '#DCF3E7', borderRadius: radius.sm }]}>
                <Ionicons name="checkmark" size={14} color="#1F7A4D" />
                <Text style={{ fontSize: 11, color: '#1F7A4D', fontWeight: '600', marginLeft: 3 }}>In</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handleCheckIn(item.id)}
                style={[styles.checkInBtn, { backgroundColor: colors.primary, borderRadius: radius.md }]}
              >
                <Text style={{ color: colors.primaryForeground, fontSize: 12, fontWeight: '600' }}>Check in</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: colors.mutedForeground, marginTop: 40, fontSize: 13 }}>
            No pre-approved visitors match your search.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBox: { flexDirection: 'row', alignItems: 'center', height: 44, borderWidth: 1, paddingHorizontal: 12, marginBottom: 8 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, marginBottom: 10 },
  avatar: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  checkedBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 },
  checkInBtn: { paddingHorizontal: 12, paddingVertical: 8 },
});