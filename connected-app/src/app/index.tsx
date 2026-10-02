import { Href, Redirect } from 'expo-router';

import { useUserStore } from '@/stores/user';

export default function Index() {
  const hasSeenOnboarding = useUserStore((state) => state.hasSeenOnboarding);

  return <Redirect href={(hasSeenOnboarding ? '/(tabs)/home' : '/onboarding') as Href} />;
}
