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
import * as Notifications from "expo-notifications";
import { router, type Href } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useMessagesStore } from "@/stores/messages";
import { useShipmentsStore } from "@/stores/shipments";
import { useTripsStore } from "@/stores/trips";
import { useUserStore } from "@/stores/user";

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

  const startAuthListener = useUserStore(
    (state: { startAuthListener: () => () => void }) => state.startAuthListener,
  );
  const session = useUserStore((state) => state.session);
  const listenToTrips = useTripsStore((state) => state.listenToTrips);
  const listenToShipments = useShipmentsStore(
    (state) => state.listenToShipments,
  );
  const listenToConversations = useMessagesStore(
    (state) => state.listenToConversations,
  );

  useEffect(() => {
    const timeout = setTimeout(() => setFontTimeoutElapsed(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (ready) {
      void SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [ready]);

  useEffect(() => startAuthListener(), [startAuthListener]);

  useEffect(() => {
    if (!session) return;
    const unsubscribers = [
      listenToTrips(),
      listenToShipments(),
      listenToConversations(),
    ];
    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, [listenToConversations, listenToShipments, listenToTrips, session]);

  useEffect(() => {
    const response = Notifications.getLastNotificationResponse();
    const redirect = (notification: Notifications.Notification) => {
      const url = notification.request.content.data?.url;
      if (typeof url === "string" && url.startsWith("/"))
        router.push(url as Href);
    };
    if (response?.notification) redirect(response.notification);
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (event) => redirect(event.notification),
    );
    return () => subscription.remove();
  }, []);

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
