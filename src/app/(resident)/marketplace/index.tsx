import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useRouter } from 'expo-router';
import { useTheme } from '@/store/useTheme';
import { useThemeStore } from '@/store/useThemeStore';
const mockListings = [
  { id: '1', title: 'Office Chair', price: 2500, emoji: '🪑', unit: 'B-1204' },
  { id: '2', title: 'Kids Bicycle', price: 3800, emoji: '🚲', unit: 'A-402' },
];

export default function MarketplaceScreen() {
  const { colors, radius } = useThemeStore();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Marketplace" showSearch={false} />
      
      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary, borderRadius: radius.xl }]} onPress={() => router.push('/marketplace/new')}>
          <Text style={{ color: colors.primaryForeground, fontWeight: '700' }}>+ List Item for Sale</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockListings}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius['2xl'] }]}
            onPress={() => router.push(`/marketplace/${item.id}` as any)}
          >
            <View style={[styles.imgPlaceholder, { backgroundColor: colors.muted }]}>
              <Text style={{ fontSize: 40 }}>{item.emoji}</Text>
            </View>
            <Text style={[styles.title, { color: colors.foreground }]}>{item.title}</Text>
            <Text style={[styles.price, { color: colors.primary }]}>₹{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { paddingHorizontal: 16, paddingVertical: 8 },
  addBtn: { height: 44, justifyContent: 'center', alignItems: 'center' },
  card: { flex: 1, padding: 12, borderWidth: 1, marginBottom: 12 },
  imgPlaceholder: { height: 100, alignItems: 'center', justifyContent: 'center', borderRadius: 12, marginBottom: 8 },
  title: { fontSize: 14, fontWeight: '700' },
  price: { fontSize: 14, fontWeight: '800', marginTop: 2 },
});