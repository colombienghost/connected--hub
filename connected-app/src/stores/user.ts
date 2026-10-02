import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type MockSession = {
  id: string;
  name: string;
};

type UserState = {
  hasSeenOnboarding: boolean;
  session: MockSession | null;
  completeOnboarding: () => void;
  signIn: () => void;
  signOut: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      session: null,
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
      signIn: () => set({ hasSeenOnboarding: true, session: { id: 'franck-o', name: 'Franck O.' } }),
      signOut: () => set({ session: null }),
    }),
    {
      name: 'connected-user',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
