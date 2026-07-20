import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useRouter } from 'expo-router';
import Input from '@/components/resident/Input';
import Button from '@/components/resident/Button';
import { useTheme } from '@/store/useTheme';

export default function NewLostFoundScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Post Item" showSearch={false} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Input label="Item Title" placeholder="e.g. Blue Airpods Case" />
        <Input label="Location Found/Lost" placeholder="e.g. Garden Bench" />
        <Input label="Description" placeholder="Provide description..." multiline numberOfLines={3} style={{ height: 80 }} />
        <Button title="Post Item" onPress={() => router.back()} style={{ marginTop: 12 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });