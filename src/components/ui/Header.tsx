// components/ui/Header.tsx
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useThemeStore } from "@/store/useThemeStore";

export default function Header() {
  const { colors, mode, toggleTheme } = useThemeStore();

  return (
    <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      {/* Logo + Name */}
      <View style={styles.brand}>
        <Image
          source={require("@/assets/app-icons/app-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.appName, { color: colors.foreground }]}>
          Port<Text style={{ color: colors.primary }}>l</Text>
        </Text>
      </View>

      {/* Theme Toggle */}
      <Pressable
        onPress={toggleTheme}
        style={({ pressed }) => [
          styles.toggleBtn,
          {
            backgroundColor: colors.secondary,
            borderColor: colors.border,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        accessibilityLabel="Toggle theme"
      >
        <Text style={styles.toggleIcon}>{mode === "dark" ? "☀️" : "🌙"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 12,
  },
  appName: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  toggleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleIcon: {
    fontSize: 18,
  },
});
