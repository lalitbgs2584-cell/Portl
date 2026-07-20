// app/(auth)/SignIn.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser'
import { useRouter } from 'expo-router';
import { useThemeStore } from '@/store/useThemeStore';
import { useRoleStore } from '@/store/useRoleStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius } from '@/lib/theme';
import { GoogleIcon } from '@/constants/google.constants';

export default function SignInScreen() {
  const router = useRouter();
  const colors = useThemeStore((s) => s.colors);
  const role = useRoleStore((s) => s.role);
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
  async function handleOAuthSignIn() {
    
  }
  return (
    <KeyboardAvoidingView
      style={[styles.root, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 32 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerBlock}>
          {role && (
            <View style={[styles.rolePill, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
              <Text style={[styles.rolePillText, { color: colors.primary }]}>
                {role.name}
              </Text>
            </View>
          )}
          <Text style={[styles.title, { color: colors.foreground }]}>Welcome Back</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Sign in to your Portl account
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.foreground }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.foreground, backgroundColor: colors.card },
              ]}
              placeholder="you@example.com"
              placeholderTextColor={colors.mutedForeground}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={[styles.label, { color: colors.foreground }]}>Password</Text>
              <TouchableOpacity>
                <Text style={[styles.forgot, { color: colors.primary }]}>Forgot?</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.foreground, backgroundColor: colors.card },
              ]}
              placeholder="••••••••"
              placeholderTextColor={colors.mutedForeground}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Sign In button */}
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.primary, borderRadius: radius.xl }]}
            activeOpacity={0.85}
            onPress={() => router.push('/(auth)/Otp' as never)}
          >
            <Text style={[styles.primaryBtnText, { color: colors.primaryForeground }]}>Sign In</Text>
          </TouchableOpacity>

          {/* OR separator */}
          <View style={styles.separator}>
            <View style={[styles.separatorLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.separatorText, { color: colors.mutedForeground }]}>OR</Text>
            <View style={[styles.separatorLine, { backgroundColor: colors.border }]} />
          </View>

          {/* Google button */}
          <Pressable
          onPress={handleOAuthSignIn}
            style={[
              styles.googleBtn,
              { borderColor: colors.border, backgroundColor: colors.card, borderRadius: radius.xl },
            ]}
          >
            <GoogleIcon />
            <Text style={[styles.googleBtnText, { color: colors.foreground }]}>Continue with Google</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <TouchableOpacity onPress={() => router.replace('/(auth)/SignUp')}>
          <Text style={[styles.footer, { color: colors.mutedForeground }]}>
            Don't have an account?{' '}
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 24, flexGrow: 1, justifyContent: 'center' },
  headerBlock: { marginBottom: 36, gap: 8 },
  rolePill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 4,
  },
  rolePillText: { fontSize: 12, fontWeight: '600', letterSpacing: 0.5 },
  title: { fontSize: 30, fontWeight: '700', letterSpacing: 0.2 },
  subtitle: { fontSize: 15, marginTop: 4 },
  form: { gap: 16, marginBottom: 28 },
  inputGroup: { gap: 6 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 14, fontWeight: '500' },
  forgot: { fontSize: 13, fontWeight: '500' },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  primaryBtn: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '700' },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  separatorLine: { flex: 1, height: StyleSheet.hairlineWidth },
  separatorText: { fontSize: 13, fontWeight: '500' },
  googleBtn: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
  },
  googleBtnText: { fontSize: 15, fontWeight: '600' },
  footer: { textAlign: 'center', fontSize: 14 },
});
