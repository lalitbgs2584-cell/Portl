import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useTheme } from '@/store/useTheme';
import Button from '@/components/resident/Button';

export default function ListingDetailScreen() {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Item Detail" showSearch={false} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={[styles.heroBox, { backgroundColor: colors.muted, borderRadius: radius['2xl'] }]}>
          <Text style={{ fontSize: 60 }}>🪑</Text>
        </View>
        <Text style={[styles.title, { color: colors.foreground }]}>Office Chair</Text>
        <Text style={[styles.price, { color: colors.primary }]}>₹2,500</Text>
        <Text style={[styles.seller, { color: colors.mutedForeground }]}>Seller: Unit B-1204</Text>
        <Button title="Chat with Seller" onPress={() => alert('Starting chat...')} style={{ marginTop: 16 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroBox: { height: 180, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '800' },
  price: { fontSize: 22, fontWeight: '800', marginTop: 4 },
  seller: { fontSize: 13, marginTop: 4 },
});