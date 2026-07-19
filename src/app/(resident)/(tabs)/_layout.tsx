import Drawer from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
                        title: 'Home',
                    }}
                />
                <Drawer.Screen
                    name='Visitors'
                    options={{
                        drawerLabel: 'Visitors',
                        title: 'Visitors',
                    }}
                />
                <Drawer.Screen
                    name='Notifications'
                    options={{
                        drawerLabel: 'Notifications',
                        title: 'Notifications',
                    }}
                />
                <Drawer.Screen
                    name='MarketPlace'
                    options={{
                        drawerLabel: 'MarketPlace',
                        title: 'MarketPlace',
                    }}
                />
                <Drawer.Screen
                    name='Lost-Found'
                    options={{
                        drawerLabel: 'Lost-Found',
                        title: 'Lost-Found',
                    }}
                />
                <Drawer.Screen
                    name='Helpdesk'
                    options={{
                        drawerLabel: 'Helpdesk',
                        title: 'Complaints',
                    }}
                />
                <Drawer.Screen
                    name='Events'
                    options={{
                        drawerLabel: 'Events',
                        title: 'Events',
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
                    name='Amenity-Booking'
                    options={{
                        drawerLabel: 'Amenity-Booking',
                        title: 'Amenity-Booking',
                    }}
                />
                <Drawer.Screen
                    name='Notices'
                    options={{
                        drawerLabel: 'Notices',
                        title: 'Notices',
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
                    name='Profile'
                    options={{
                        drawerLabel: 'Profile',
                        title: 'Profile',
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



// delivery and emergency help should be in the profile section