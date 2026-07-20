import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/resident/layout/Header';
import { useRouter } from 'expo-router';
import { useTheme } from '@/store/useTheme';

export default function ServicesScreen() {
  const { colors, radius } = useTheme();
  const router = useRouter();

  const menu = [
    { label: 'Helpdesk Tickets', icon: 'build-outline', route: '/helpdesk' },
    { label: 'Book Amenities', icon: 'calendar-outline', route: '/amenities' },
    { label: 'Maintenance Payments', icon: 'card-outline', route: '/payments' },
    { label: 'Staff Directory', icon: 'people-outline', route: '/staff' },
    { label: 'Lost & Found', icon: 'cube-outline', route: '/lost-found' },
    { label: 'Marketplace', icon: 'bag-handle-outline', route: '/marketplace' },
    { label: 'Community Polls', icon: 'stats-chart-outline', route: '/polls' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Services & More" showSearch={false} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {menu.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.item, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.xl }]}
            onPress={() => router.push(item.route as any)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name={item.icon as any} size={20} color={colors.primary} />
              <Text style={[styles.label, { color: colors.foreground }]}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  label: { fontSize: 14, fontWeight: '600', marginLeft: 12 },
});