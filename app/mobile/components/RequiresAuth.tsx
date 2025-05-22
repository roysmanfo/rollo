import React from 'react';
import { useEffect, useState } from 'react';
import { View, ViewProps, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { authLogin, fetchUserData, getUserdata, removeUserdata } from '../api/auth';
import { Href, useRouter } from 'expo-router';
import { User } from '@/utils/types';

type RequiresAuthProps = Omit<ViewProps, 'children'> & {
  timeout?: number;
  redirect: Href;
  children: (user: User) => React.ReactNode;
};

/**
 * Wrapper component to restrict access to pages if the user is not logged in
 * @param redirect the page where to redirect to if the user is not logged int
 * @param children must be a function that takes a `Session` as input and returns a `ReactNode`
 * @returns a new view containing the children view or an error message
 */
export default function RequiresAuth({
  timeout = 0,
  redirect,
  children,
  ...props
}: RequiresAuthProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loopAdded, setLoopAdded] = useState<boolean>(false);
  const [failedFetch, setFailedFetch] = useState<number>(0);

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      try {
        const { user: userSession, error } = await getUserdata();
        if (!mounted) return;

        if (error) {
          setError(error);
          setTimeout(() => router.replace(redirect), timeout);
          return;
        }

        if (!userSession) {
          router.replace(redirect);
          return;
        }

        setUser(userSession);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    checkAuth();
    return () => {
      mounted = false;
    };
  }, [redirect, router]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // update local info periodically
  if (!loopAdded && user) {
    setInterval(async () => {
      const res = await fetchUserData(user.id.toString());
      if (res.user) {
        setUser(res.user);
      } else {
        setFailedFetch((f) => f + 1);
        if (failedFetch >= 3) {
          setError('Failed to fetch user data');
          setUser(null);
          await removeUserdata();
          setTimeout(() => router.replace(redirect), timeout);
        }
      }
    }, 10000);
    setLoopAdded(true);
  }

  if (!user) return null;
  return <View {...props}>{children(user)}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
    fontFamily: 'Montserrat',
  },
  errorText: {
    color: '#f55',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});
