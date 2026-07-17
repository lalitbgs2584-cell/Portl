import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerShown: false
                }}>
                <Drawer.Screen
                    name='Dashboard'
                    options={{
                        drawerLabel: 'Home',
                        title: 'overview',
                    }}
                />
                <Drawer.Screen
                    name='Security'
                    options={{
                        drawerLabel: 'Security',
                        title: 'Security',
                    }}
                />
                <Drawer.Screen
                    name='Residents'
                    options={{
                        drawerLabel: 'Residents',
                        title: 'Residents',
                    }}
                />
                <Drawer.Screen
                    name='Visitor'
                    options={{
                        drawerLabel: 'Visitors',
                        title: 'Visitors',
                    }}
                />
                <Drawer.Screen
                    name='Complaints'
                    options={{
                        drawerLabel: 'Complaints',
                        title: 'Complaints',
                    }}
                />
                <Drawer.Screen
                    name='Polls'
                    options={{
                        drawerLabel: 'Polls',
                        title: 'Polls',
                    }}
                />
                <Drawer.Screen
                    name='Amenities'
                    options={{
                        drawerLabel: 'Amenities',
                        title: 'Amenities',
                    }}
                />
                <Drawer.Screen
                    name='Bookings'
                    options={{
                        drawerLabel: 'Bookings',
                        title: 'Bookings',
                    }}
                />
                <Drawer.Screen
                    name='Payments'
                    options={{
                        drawerLabel: 'Payments',
                        title: 'Payments',
                    }}
                />
                <Drawer.Screen
                    name='Settings'
                    options={{
                        drawerLabel: 'Settings',
                        title: 'Settings',
                    }}
                />
                <Drawer.Screen
                    name='Helpdesk'
                    options={{
                        drawerLabel: 'Helpdesk',
                        title: 'Helpdesk',
                    }}
                />
                <Drawer.Screen
                    name='Logout'
                    options={{
                        drawerLabel: 'Logout',
                        title: 'Logout',
                    }}
                />
            </Drawer>;
        </GestureHandlerRootView>
    )
}
