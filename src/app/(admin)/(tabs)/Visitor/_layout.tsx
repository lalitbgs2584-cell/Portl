// app/(drawer)/reports/_layout.tsx
import { Tabs } from 'expo-router';

export default function ReportsTabs() {
  return (
    <Tabs>
      <Tabs.Screen name="visitor-report" options={{ title: 'Visitor' }} />
      <Tabs.Screen name="complaint-report" options={{ title: 'Complaints' }} />
      <Tabs.Screen name="revenue-report" options={{ title: 'Revenue' }} />
      <Tabs.Screen name="analytics" options={{ title: 'Analytics' }} />
    </Tabs>
  );
}