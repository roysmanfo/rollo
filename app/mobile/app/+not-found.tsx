import React from 'react';
import SafeUIView from '@/components/SafeUIView';
import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '404 Not Found!' }} />
      <SafeUIView style={{ marginTop: 200 }}>
        <View style={styles.container}>
          <Text>This screen doesn't exist.</Text>
          <Link href="/" style={styles.link}>
            <Text>Go to home screen!</Text>
          </Link>
        </View>
      </SafeUIView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
