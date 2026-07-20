import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from '@/components/resident/layout/Header';
import { useRouter } from 'expo-router';
import Input from '@/components/resident/Input';
import Button from '@/components/resident/Button';
import { useTheme } from '@/store/useTheme';

export default function PreApproveScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Pre-Approve Guest" showSearch={false} />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Input label="Visitor Name" placeholder="e.g. Rahul Verma" value={name} onChangeText={setName} />
        <Input label="Mobile Number" placeholder="10-digit phone number" keyboardType="numeric" value={phone} onChangeText={setPhone} />
        <Button
          title="Generate Pass"
          onPress={() => {
            alert('Pass generated successfully!');
            router.back();
          }}
          style={{ marginTop: 12 }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});