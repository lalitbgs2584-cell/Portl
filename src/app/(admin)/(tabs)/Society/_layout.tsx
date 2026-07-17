// app/(drawer)/society/_layout.tsx
import { Stack } from 'expo-router';

export default function SocietyStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Society Details' }} />
      <Stack.Screen name="tower-list" options={{ title: 'Tower List' }} />
      <Stack.Screen name="add-tower" options={{ title: 'Add Tower' }} />
      <Stack.Screen name="floor-list" options={{ title: 'Floor List' }} />
    </Stack>
  );
}