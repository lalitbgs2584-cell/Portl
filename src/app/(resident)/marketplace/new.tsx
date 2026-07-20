import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/resident/layout/Header';

import { useRouter } from 'expo-router';
import Input from '@/components/resident/Input';
import Button from '@/components/resident/Button';
import { useTheme } from '@/store/useTheme';

export default function NewMarketplaceScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Sell Item" showSearch={false} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Input label="Item Title" placeholder="e.g. Wooden Dining Table" />
        <Input label="Price (₹)" placeholder="e.g. 5000" keyboardType="numeric" />
        <Input label="Description" placeholder="Mention item condition..." multiline numberOfLines={3} style={{ height: 80 }} />
        <Button title="Publish Listing" onPress={() => router.back()} style={{ marginTop: 12 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });