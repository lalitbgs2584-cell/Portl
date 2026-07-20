import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/useThemeStore';

type AppScreenProps = {
  children: ReactNode;
  scroll?: boolean;
};

export default function AppScreen({ children, scroll = true }: AppScreenProps) {
  const colors = useThemeStore((state) => state.colors);
  const insets = useSafeAreaInsets();
  const contentStyle = [styles.content, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }];

  if (!scroll) {
    return <View style={[styles.screen, { backgroundColor: colors.background }, contentStyle]}>{children}</View>;
  }

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={contentStyle}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 20 },
});
