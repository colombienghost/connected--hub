import { Href, useRouter } from "expo-router";

import { Screen } from "./components";
import { useMessagesStore } from "@/stores/messages";
import { useShipmentsStore } from "@/stores/shipments";
import { useTripsStore } from "@/stores/trips";

const screenPaths: Record<Screen, string> = {
  onboarding: "/onboarding",
  login: "/login",
  home: "/(tabs)/home",
  trips: "/(tabs)/trips",
  trip: "/trip/sarah-m",
  shipment: "/shipment",
  reservation: "/shipment/reservation",
  payment: "/shipment/payment",
  done: "/shipment/success",
  publish: "/publish",
  published: "/publish",
  messages: "/(tabs)/messages",
  chat: "/chat/sarah-m",
  tracking: "/tracking/CNCT-7821",
  profile: "/(tabs)/profile",
  notifications: "/notifications",
};

export function useScreenNavigation() {
  const router = useRouter();
  const tripId = useTripsStore((state) => state.selectedTripId);
  const shipmentId = useShipmentsStore((state) => state.activeShipmentId);
  const conversationId = useMessagesStore(
    (state) => state.activeConversationId,
  );

  return (screen: Screen) => {
    const dynamicPaths: Partial<Record<Screen, string>> = {
      trip: `/trip/${tripId}`,
      chat: `/chat/${conversationId}`,
      tracking: `/tracking/${shipmentId}`,
    };
    router.push((dynamicPaths[screen] ?? screenPaths[screen]) as Href);
  };
}
