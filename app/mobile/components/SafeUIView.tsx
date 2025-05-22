import React from 'react';
import { Platform } from 'react-native';
import { ViewProps, SafeAreaView, StyleSheet, StatusBar } from 'react-native';

type SafeUIViewProps = ViewProps;

// cross patform version of SafeAreaView that also works on android
export default function SafeUIView({ style, ...more }: SafeUIViewProps) {
  return <SafeAreaView style={[styles.safe, style]} {...more} />;
}

const styles = StyleSheet.create({
  safe: {
    height: '100%',
    width: '100%',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 30 : 0,
  },
});
