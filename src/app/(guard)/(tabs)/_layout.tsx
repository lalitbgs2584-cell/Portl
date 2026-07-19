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
                        title: 'overview',
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
                    name='Duty-Schedule'
                    options={{
                        drawerLabel: 'Duty Schedule',
                        title: 'Duty Schedule',
                    }}
                />
                <Drawer.Screen
                    name='Incidents'
                    options={{
                        drawerLabel: 'Incidents',
                        title: 'Incidents',
                    }}
                />
                <Drawer.Screen
                    name='Duty-Handover'
                    options={{
                        drawerLabel: 'Duty-Handover',
                        title: 'Duty-Handover',
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
                    name='Complaints'
                    options={{
                        drawerLabel: 'Complaints',
                        title: 'Complaints',
                    }}
                />
                <Drawer.Screen
                    name='Entry-Log'
                    options={{
                        drawerLabel: 'Entry-Log',
                        title: 'Entry-Log',
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

