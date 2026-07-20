import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useTheme } from '@/store/useTheme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
}

export default function Header({ title, subtitle = 'B-1204 · Tower B', showSearch = true }: HeaderProps) {
  const { colors, radius } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity
        style={[styles.iconBtn, { backgroundColor: colors.card, borderRadius: radius.xl }]}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu-outline" size={22} color={colors.foreground} />
      </TouchableOpacity>

      <View style={styles.titleArea}>
        <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{subtitle}</Text>
      </View>

      <View style={styles.rightActions}>
        {showSearch && (
          <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.card, borderRadius: radius.xl }]}>
            <Ionicons name="search-outline" size={18} color={colors.foreground} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.iconBtn, { backgroundColor: colors.card, borderRadius: radius.xl, marginLeft: 8 }]}>
          <Ionicons name="notifications-outline" size={18} color={colors.foreground} />
          <View style={[styles.badge, { backgroundColor: colors.destructive }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleArea: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});