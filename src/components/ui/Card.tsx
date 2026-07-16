// components/ui/Card.tsx
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useThemeStore } from "@/store/useThemeStore";
import { UserRole } from "@/constants/user.constants";

type RoleCardProps = {
  role: UserRole;
  selected?: boolean;
  onPress?: (role: UserRole) => void;
};

export default function RoleCard({ role, selected = false, onPress }: RoleCardProps) {
  const colors = useThemeStore((s) => s.colors);

  return (
    <Pressable
      onPress={() => onPress?.(role)}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2 : StyleSheet.hairlineWidth,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      {/* Image fills the top portion of the card */}
      <View style={styles.imageWrapper}>
        <Image source={role.image} style={styles.image} resizeMode="cover" />
      </View>

      {/* Label at the bottom */}
      <View style={[styles.labelRow, { borderTopColor: colors.border }]}>
        <Text style={[styles.title, { color: selected ? colors.primary : colors.foreground }]}>
          {role.name}
        </Text>
        {selected && (
          <View style={[styles.dot, { backgroundColor: colors.primary }]} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    minWidth: 140,
    aspectRatio: 0.85,
  },
  imageWrapper: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  labelRow: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.2,
    textAlign: "center",
  },
  dot: {
    position: "absolute",
    right: 12,
    width: 7,
    height: 7,
    borderRadius: 4,
  },
});