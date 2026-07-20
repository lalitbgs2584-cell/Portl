import React from 'react';
import { Drawer } from 'expo-router/drawer';
import DrawerContent from '@/components/resident/layout/DrawerContent';

export default function ResidentLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 280 },
      }}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}