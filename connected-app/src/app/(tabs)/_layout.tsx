import { Tabs, usePathname } from 'expo-router';

import { BottomNavigation, Tab } from '@/design-system/components';
import { useScreenNavigation } from '@/design-system/screen-navigation';

function currentTab(pathname: string): Tab {
  if (pathname.includes('/trips')) return 'trips';
  if (pathname.includes('/messages')) return 'messages';
  if (pathname.includes('/profile')) return 'profile';
  return 'home';
}

export default function TabsLayout() {
  const go = useScreenNavigation();
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={() => <BottomNavigation active={currentTab(pathname)} go={go} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="trips" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
