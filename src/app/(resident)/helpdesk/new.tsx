import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useRouter } from 'expo-router';
import Input from '@/components/resident/Input';
import Button from '@/components/resident/Button';
import { useTheme } from '@/store/useTheme';

export default function NewComplaintScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Raise Complaint" showSearch={false} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Input label="Issue Title" placeholder="e.g. Corridor Light Off" value={title} onChangeText={setTitle} />
        <Input label="Category" placeholder="e.g. Electrical / Plumbing" />
        <Input
          label="Description"
          placeholder="Describe the problem in detail..."
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: 'top' }}
          value={desc}
          onChangeText={setDesc}
        />
        <Button
          title="Submit Ticket"
          onPress={() => {
            alert('Ticket created successfully!');
            router.back();
          }}
          style={{ marginTop: 12 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });