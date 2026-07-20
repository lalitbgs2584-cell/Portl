import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';
import { useRouter } from 'expo-router';

export default function DrawerContent(props: any) {
  const { colors, radius } = useTheme();
  const router = useRouter();

  const navigateTo = (path: string) => {
    props.navigation.closeDrawer();
    router.push(path as any);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={[styles.avatar, { backgroundColor: colors.primary, borderRadius: radius['2xl'] }]}>
          <Text style={[styles.avatarText, { color: colors.primaryForeground }]}>A</Text>
        </View>
        <Text style={[styles.name, { color: colors.foreground }]}>Aarav Sharma</Text>
        <Text style={[styles.flat, { color: colors.mutedForeground }]}>B-1204 · Portl Heights</Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 12 }}>
        <DrawerItem icon="build-outline" label="Helpdesk" onPress={() => navigateTo('/helpdesk')} />
        <DrawerItem icon="calendar-outline" label="Book Amenities" onPress={() => navigateTo('/amenities')} />
        <DrawerItem icon="card-outline" label="Maintenance & Dues" onPress={() => navigateTo('/payments')} />
        <DrawerItem icon="people-outline" label="Staff & Services" onPress={() => navigateTo('/staff')} />
        <DrawerItem icon="cube-outline" label="Lost & Found" onPress={() => navigateTo('/lost-found')} />
        <DrawerItem icon="bag-handle-outline" label="Marketplace" onPress={() => navigateTo('/marketplace')} />
        <DrawerItem icon="stats-chart-outline" label="Community Polls" onPress={() => navigateTo('/polls')} />
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color={colors.destructive} />
          <Text style={[styles.logoutText, { color: colors.destructive }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerItem({ icon, label, onPress }: { icon: any; label: string; onPress: () => void }) {
  const { colors, radius } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.item, { borderRadius: radius.xl }]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={[styles.itemLabel, { color: colors.foreground }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  flat: {
    fontSize: 12,
    marginTop: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
});