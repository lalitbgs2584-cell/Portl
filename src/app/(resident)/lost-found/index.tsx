import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useRouter } from 'expo-router';
import { useTheme } from '@/store/useTheme';

const mockLostFound = [
  { id: '1', title: 'Car Keys (Hyundai)', category: 'FOUND', location: 'Near Clubhouse', timeAgo: '3 hrs ago' },
  { id: '2', title: 'Black Leather Wallet', category: 'LOST', location: 'Basement Parking B2', timeAgo: 'Yesterday' },
];

export default function LostFoundScreen() {
  const { colors, radius } = useTheme();
  const router = useRouter();
  const [filter, setFilter] = useState<'ALL' | 'LOST' | 'FOUND'>('ALL');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Lost & Found" showSearch={false} />
      
      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary, borderRadius: radius.xl }]} onPress={() => router.push('/lost-found/new')}>
          <Text style={{ color: colors.primaryForeground, fontWeight: '700' }}>+ Post Item</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockLostFound.filter(i => filter === 'ALL' || i.category === filter)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}>
            <View style={styles.row}>
              <View style={[styles.badge, { backgroundColor: item.category === 'LOST' ? colors.destructive + '20' : colors.success + '20' }]}>
                <Text style={{ color: item.category === 'LOST' ? colors.destructive : colors.success, fontSize: 10, fontWeight: '800' }}>{item.category}</Text>
              </View>
              <Text style={{ color: colors.mutedForeground, fontSize: 11 }}>{item.timeAgo}</Text>
            </View>
            <Text style={[styles.title, { color: colors.foreground }]}>{item.title}</Text>
            <Text style={{ color: colors.mutedForeground, fontSize: 12, marginTop: 2 }}>📍 {item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 16, paddingVertical: 8 },
  addBtn: { height: 44, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 16, borderWidth: 1, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  title: { fontSize: 15, fontWeight: '700' },
});