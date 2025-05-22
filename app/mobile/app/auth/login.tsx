import React, { useState } from 'react';
import SafeUIView from '@/components/SafeUIView';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { authLogin } from '@/api/auth';

export default function LoginPage() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSend = async (event: GestureResponderEvent) => {
    event.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    if (!email) {
      setErrorMsg('Email mancante');
      setIsLoading(false);
      return;
    }
    if (!password) {
      setErrorMsg('Password mancante');
      setIsLoading(false);
      return;
    }

    // some complicated server-side checks
    // ...
    const res = await authLogin(email, password);

    // todo: remove 2s delay in prod
    setTimeout(() => {
      if (res.user) {
        router.replace('/(tabs)');
      } else {
        setErrorMsg(res.error ?? 'Credenziali non valide');
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <SafeUIView style={{ backgroundColor: '#0a0a0a', padding: 30, isolation: 'isolate' }}>
      <LinearGradient
        colors={['#0a0a0a', Colors.primary]}
        locations={[0.25, 1]}
        style={styles.background}
      />
      <Text style={styles.pageTitle}>Login</Text>
      <View style={styles.inputContainer}>
        <View style={[styles.errorBox, { display: errorMsg ? 'flex' : 'none' }]}>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>

        <Text style={{ color: styles.input.color, fontFamily: 'Montserrat' }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="La tua email"
          placeholderTextColor={styles.input.color}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={{ color: styles.input.color, fontFamily: 'Montserrat' }}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="La tua password"
          placeholderTextColor={styles.input.color}
          keyboardType="default"
          autoComplete="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.footerText}>
          Non hai ancora un account?{' '}
          <Link href={'/auth/register'} style={styles.footerLink}>
            Creane uno!
          </Link>
        </Text>

        <TouchableWithoutFeedback
          onPress={async (e) => {
            await onSend(e);
          }}>
          <Text style={styles.submitBtn}>
            {isLoading ? (
              <ActivityIndicator size={styles.submitBtn.fontSize + 11} color={Colors.primary} />
            ) : (
              'Invia'
            )}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeUIView>
  );
}

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  pageTitle: {
    fontFamily: 'Montserrat_800ExtraBold',
    textTransform: 'uppercase',
    fontSize: 50,
    marginTop: 100,
    color: '#fff',
    borderBottomColor: Colors.ternary,
    borderBottomWidth: 10,
    width: '75%',
  },
  errorBox: {
    borderColor: Colors.accent1,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    fontFamily: 'Montserrat',
  },
  errorText: {
    color: Colors.accent1,
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    gap: 10,
    marginTop: 50,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#222',
    backgroundColor: 'transparent',
    fontFamily: 'Montserrat',
    color: '#ddd',
    fontSize: 16,
  },
  submitBtn: {
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: Colors.secondary,
    padding: 16,
    fontSize: 20,
    marginTop: 'auto',
    marginBottom: 30,
    fontFamily: 'Montserrat_600SemiBold',
  },
  footerText: {
    color: '#ccc',
    fontFamily: 'Montserrat_600SemiBold',
  },
  footerLink: {
    color: Colors.accent1,
    fontFamily: 'Montserrat_600SemiBold',
    textDecorationLine: 'underline',
  },
});
