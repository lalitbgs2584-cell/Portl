import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Header from '@/components/resident/layout/Header';
import GreetingHeader from '@/components/resident/home/GreetingHeader';
import VisitorAlertBanner from '@/components/resident/home/VisitorAlertBanner';
import QuickActionGrid from '@/components/resident/home/QuickActionGrid';
import DuesCard from '@/components/resident/home/DuesCard';
import { useRouter } from 'expo-router';
import { useTheme } from '@/store/useTheme';
import SectionHeader from '@/components/resident/SectionHeader';

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Portl Heights" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <GreetingHeader />
        <VisitorAlertBanner
          onApprove={() => alert('Visitor Approved')}
          onDeny={() => alert('Visitor Denied')}
        />
        <QuickActionGrid />
        <DuesCard />

        <View style={styles.section}>
          <SectionHeader
            title="Active Community Poll"
            actionText="View All"
            onActionPress={() => router.push('/polls')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 24,
  },
  section: {
    paddingHorizontal: 16,
  },
});