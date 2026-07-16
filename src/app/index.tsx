// app/index.tsx
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { UserRoles, UserRole } from "@/constants/user.constants";
import { useThemeStore } from "@/store/useThemeStore";
import RoleCard from "@/components/ui/Card";
import Header from "@/components/ui/Header";
import { useRouter } from "expo-router";
import { useRoleStore } from "@/store/useRoleStore";

// Admin is index 0, Resident is index 1, Guard is index 2
const [admin, resident, guard] = UserRoles;

export default function Index() {
  const colors = useThemeStore((s) => s.colors);
  const role = useRoleStore((s) => s.role);
  const setRole = useRoleStore((s) => s.setRole);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  function handleSelect(selectedRole: UserRole) {
    setRole(selectedRole);
    router.push("/(auth)/SignIn");
  }

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <Header />

      <ScrollView
        contentContainerStyle={[
          styles.list,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={[styles.heroTitle, { color: colors.foreground }]}>
            Sign In as
          </Text>
          <Text style={[styles.heroSub, { color: colors.mutedForeground }]}>
            Select your role to get started
          </Text>
        </View>

        {/* Admin — full width */}
        <Pressable style={styles.fullRow} onPress={() => handleSelect(admin)}>
          <RoleCard
            role={admin}
            selected={role === admin}
            onPress={() => handleSelect(admin)}
          />
        </Pressable>

        {/* Resident + Guard — side by side */}
        <View style={styles.splitRow}>
          <Pressable style={styles.halfCol} onPress={() => handleSelect(resident)}>
            <RoleCard
              role={resident}
              selected={role === resident}
              onPress={() => handleSelect(resident)}
            />
          </Pressable>
          <Pressable style={styles.halfCol} onPress={() => handleSelect(guard)}>
            <RoleCard
              role={guard}
              selected={role === guard}
              onPress={() => handleSelect(guard)}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
  },
  hero: {
    paddingTop: 28,
    paddingBottom: 20,
    gap: 6,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.3,
    textAlign: "center",
  },
  heroSub: {
    fontSize: 15,
    fontWeight: "400",
    textAlign: "center",
  },
  fullRow: {
    marginBottom: 12,
  },
  splitRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfCol: {
    flex: 1,
  },
});