import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTheme } from '@/store/useTheme';
// import { supabase } from '@/lib/supabase'; // wire this up to your actual client

export default function GuardSignInScreen() {
  const { colors, radius } = useTheme();
  const [phone, setPhone] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (phone.trim().length < 10) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }

    setError(null);
    setChecking(true);

    try {
      // TODO: replace with your real Supabase lookup, e.g.:
      // const { data, error: dbError } = await supabase
      //   .from('guards')
      //   .select('id, name')
      //   .eq('phone', phone.trim())
      //   .maybeSingle();
      //
      // if (dbError) throw dbError;
      // if (!data) {
      //   setError("This number isn't registered by your admin. Ask them to add you first.");
      //   return;
      // }
      // router.replace(`/guard-app/${data.id}`);

      // Placeholder behavior until Supabase is wired in:
      const found = phone.trim() === '9876543210'; // stand-in for the DB check above
      if (!found) {
        setError("This number isn't registered by your admin. Ask them to add you first.");
        return;
      }
      router.replace('/'); // navigate into the guard-facing app once verified
    } finally {
      setChecking(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>Guard sign in</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        Enter the phone number your admin registered for you.
      </Text>

      <Text style={[styles.label, { color: colors.mutedForeground, marginTop: 20 }]}>Phone number</Text>
      <TextInput
        value={phone}
        onChangeText={(value) => {
          setPhone(value);
          setError(null);
        }}
        placeholder="9876543210"
        keyboardType="phone-pad"
        placeholderTextColor={colors.mutedForeground}
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: error ? colors.destructive : colors.border,
            borderRadius: radius.lg,
            color: colors.foreground,
          },
        ]}
      />
      {error ? (
        <Text style={{ color: colors.destructive, fontSize: 11, marginTop: 6 }}>{error}</Text>
      ) : null}

      <Pressable
        disabled={checking}
        onPress={handleContinue}
        style={[
          styles.continueButton,
          { backgroundColor: colors.primary, borderRadius: radius.lg, opacity: checking ? 0.7 : 1 },
        ]}
      >
        {checking ? (
          <ActivityIndicator color={colors.primaryForeground} />
        ) : (
          <Text style={{ color: colors.primaryForeground, fontWeight: '600', fontSize: 14 }}>Continue</Text>
        )}
      </Pressable>

      <Text style={[styles.footnote, { color: colors.mutedForeground }]}>
        Guards can't create their own account — access is only granted once an admin has added your
        number to the society's guard list.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 6,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
  },
  continueButton: {
    marginTop: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  footnote: {
    fontSize: 11,
    marginTop: 24,
    lineHeight: 16,
  },
});
