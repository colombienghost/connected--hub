import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

void SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_400Regular,
    "Inter Medium": Inter_500Medium,
    "Inter SemiBold": Inter_600SemiBold,
    "Inter Bold": Inter_700Bold,
    "Playfair Display": PlayfairDisplay_600SemiBold,
    "Playfair Display Bold": PlayfairDisplay_700Bold,
  });
  const [fontTimeoutElapsed, setFontTimeoutElapsed] = useState(false);
  const ready = fontsLoaded || Boolean(fontError) || fontTimeoutElapsed;

  useEffect(() => {
    const timeout = setTimeout(() => setFontTimeoutElapsed(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (ready) {
      void SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="publish" options={{ presentation: "modal" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
