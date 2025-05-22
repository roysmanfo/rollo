import React, { StrictMode, useEffect } from 'react';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import { useFonts } from '@expo-google-fonts/montserrat/useFonts';
import { Montserrat_100Thin } from '@expo-google-fonts/montserrat/100Thin';
import { Montserrat_200ExtraLight } from '@expo-google-fonts/montserrat/200ExtraLight';
import { Montserrat_300Light } from '@expo-google-fonts/montserrat/300Light';
import { Montserrat_400Regular as Montserrat } from '@expo-google-fonts/montserrat/400Regular';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat/500Medium';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat/600SemiBold';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat/700Bold';
import { Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat/800ExtraBold';
import { Montserrat_900Black } from '@expo-google-fonts/montserrat/900Black';
import { Montserrat_100Thin_Italic } from '@expo-google-fonts/montserrat/100Thin_Italic';
import { Montserrat_200ExtraLight_Italic } from '@expo-google-fonts/montserrat/200ExtraLight_Italic';
import { Montserrat_300Light_Italic } from '@expo-google-fonts/montserrat/300Light_Italic';
import { Montserrat_400Regular_Italic as MontserratItalic } from '@expo-google-fonts/montserrat/400Regular_Italic';
import { Montserrat_500Medium_Italic } from '@expo-google-fonts/montserrat/500Medium_Italic';
import { Montserrat_600SemiBold_Italic } from '@expo-google-fonts/montserrat/600SemiBold_Italic';
import { Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat/700Bold_Italic';
import { Montserrat_800ExtraBold_Italic } from '@expo-google-fonts/montserrat/800ExtraBold_Italic';
import { Montserrat_900Black_Italic } from '@expo-google-fonts/montserrat/900Black_Italic';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    MontserratItalic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return;

  return (
    <StrictMode>
      <ThemeProvider value={DarkTheme}>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="about" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </ThemeProvider>
    </StrictMode>
  );
}
