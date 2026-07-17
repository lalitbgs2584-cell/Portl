import { Stack } from 'expo-router';
import { useTheme } from '@/store/useTheme';

export default function PollsStackLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.foreground,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Polls' }} />
      <Stack.Screen name="create" options={{ title: 'Create poll' }} />
      <Stack.Screen name="[id]" options={{ title: 'Poll details' }} />
    </Stack>
  );
}