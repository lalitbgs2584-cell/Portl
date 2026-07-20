import { DrawerContent, DrawerRoute } from '@/components/guard/DrawerContent';
import { useTheme } from '@/store/useTheme';
import { router, usePathname } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ROUTE_MAP: Record<DrawerRoute, string> = {
  home: '/(guard)/(tabs)',
  visitors: '/(guard)/(tabs)/visitors',
  shift: '/(guard)/(tabs)/shift',
  leave: '/(guard)/leave',
  notifications: '/(guard)/notifications',
};

// TODO: replace with real session data once auth is wired
const CURRENT_GUARD = { name: 'Arjun Singh', gate: 'Gate 2' };

function resolveActiveRoute(pathname: string): DrawerRoute | undefined {
  if (pathname.includes('/visitors')) return 'visitors';
  if (pathname.includes('/shift')) return 'shift';
  if (pathname.includes('/leave')) return 'leave';
  if (pathname.includes('/notifications')) return 'notifications';
  if (pathname === '/(guard)/(tabs)' || pathname === '/') return 'home';
  return undefined;
}

export default function GuardDrawerLayout() {
  const { colors } = useTheme();
  const pathname = usePathname();

  const handleNavigate = (route: DrawerRoute) => {
    router.push(ROUTE_MAP[route] as any);
  };

  const handleLogout = () => {
    // TODO: supabase.auth.signOut()
    router.replace('/(auth)/login');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={() => (
          <DrawerContent
            guardName={CURRENT_GUARD.name}
            gateLabel={CURRENT_GUARD.gate}
            activeRoute={resolveActiveRoute(pathname)}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}
        screenOptions={{
          headerShown: false,
          drawerStyle: { backgroundColor: colors.card, width: 280 },
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ title: 'Home' }} />
        <Drawer.Screen name="leave/index" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="leave/apply" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="notifications" options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}