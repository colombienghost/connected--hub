import { Href, useRouter } from 'expo-router';

import { Screen } from './components';

const screenPaths: Record<Screen, string> = {
  onboarding: '/onboarding',
  login: '/login',
  home: '/(tabs)/home',
  trips: '/(tabs)/trips',
  trip: '/trip/sarah-m',
  shipment: '/shipment',
  reservation: '/shipment/reservation',
  payment: '/shipment/payment',
  done: '/shipment/success',
  publish: '/publish',
  published: '/publish',
  messages: '/(tabs)/messages',
  chat: '/chat/sarah-m',
  tracking: '/tracking/CNCT-7821',
  profile: '/(tabs)/profile',
  notifications: '/notifications',
};

export function useScreenNavigation() {
  const router = useRouter();

  return (screen: Screen) => router.push(screenPaths[screen] as Href);
}
