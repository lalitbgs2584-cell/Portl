import React from 'react';
import { View, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { router, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@/store/useTheme';
import { GuardCard, Guard } from '@/components/admin/guard/GuardCard';

// Replace with real Supabase query
const MOCK_GUARDS: Guard[] = [
  { id: '1', name: 'Rahul Sharma', role: 'Security guard', phone: '9876543210', dutyArea: 'Block A' },
  { id: '2', name: 'Vikram Singh', role: 'Security guard', phone: '9876500000', dutyArea: 'Block B' },
  { id: '3', name: 'Imran Khan', role: 'Security guard', phone: '9876511111', dutyArea: 'Main gate' },
];

export default function GuardListScreen() {
  const { colors, radius } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => router.push('./add')}
              style={[styles.addButton, { backgroundColor: colors.primary, borderRadius: radius.lg }]}
            >
              <Feather name="plus" size={14} color={colors.primaryForeground} />
              <Text style={{ color: colors.primaryForeground, fontSize: 12, fontWeight: '600', marginLeft: 4 }}>
                Add
              </Text>
            </Pressable>
          ),
        }}
      />
      <FlatList
        data={MOCK_GUARDS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <GuardCard guard={item} onPress={(g) => router.push(`./${g.id}/tabs/profile`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 12,
  },
  list: {
    padding: 12,
  },
});
