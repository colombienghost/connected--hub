import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { auth, db, isFirebaseAvailable, serverTimestamp } from "@/lib/firebase";
import { registerForPushNotifications } from "@/lib/notifications";

export type ConnectedUser = {
  id: string;
  name: string;
  photoURL: string | null;
  verified: boolean;
};

type UserState = {
  hasSeenOnboarding: boolean;
  isAuthLoading: boolean;
  session: ConnectedUser | null;
  phoneConfirmation: { confirm: (code: string) => Promise<unknown> } | null;
  authError: string | null;
  completeOnboarding: () => void;
  startAuthListener: () => () => void;
  sendPhoneCode: (phoneNumber: string) => Promise<void>;
  confirmPhoneCode: (code: string) => Promise<void>;
  clearAuthError: () => void;
  signOut: () => Promise<void>;
};

let unsubscribeProfile: (() => void) | undefined;

function userFromDocument(
  uid: string,
  data: Record<string, unknown> | undefined,
): ConnectedUser {
  return {
    id: uid,
    name:
      typeof data?.displayName === "string"
        ? data.displayName
        : "Membre CONNECTED",
    photoURL: typeof data?.photoURL === "string" ? data.photoURL : null,
    verified: data?.verified === true,
  };
}

function readableAuthError(error: unknown) {
  const code = (error as { code?: string }).code;

  if (code === "auth/invalid-phone-number") {
    return "Saisissez un numéro au format international, par exemple +15140000000.";
  }
  if (code === "auth/too-many-requests") {
    return "Trop de tentatives. Réessayez plus tard.";
  }
  if (code === "auth/invalid-verification-code") {
    return "Le code reçu est incorrect.";
  }

  return "La vérification n’a pas pu aboutir. Réessayez depuis un dev build Android ou iOS.";
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      hasSeenOnboarding: false,
      isAuthLoading: isFirebaseAvailable,
      session: null,
      phoneConfirmation: null,
      authError: null,
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
      startAuthListener: () => {
        if (!auth || !db) {
          set({ isAuthLoading: false });
          return () => undefined;
        }

        return auth.onAuthStateChanged((firebaseUser: any) => {
          unsubscribeProfile?.();
          unsubscribeProfile = undefined;

          if (!firebaseUser) {
            set({
              isAuthLoading: false,
              phoneConfirmation: null,
              session: null,
            });
            return;
          }

          const profile = db.collection("users").doc(firebaseUser.uid);
          unsubscribeProfile = profile.onSnapshot(
            (snapshot: any) => {
              if (!snapshot.exists) {
                void profile.set(
                  {
                    displayName: firebaseUser.displayName ?? "Membre CONNECTED",
                    photoURL: firebaseUser.photoURL ?? null,
                    verified: false,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                  },
                  { merge: true },
                );
              }

              set({
                isAuthLoading: false,
                phoneConfirmation: null,
                session: userFromDocument(firebaseUser.uid, snapshot.data()),
              });
            },
            () => set({ isAuthLoading: false }),
          );

          void registerForPushNotifications().then((pushToken) => {
            if (pushToken) {
              void profile.set(
                { pushToken, updatedAt: serverTimestamp() },
                { merge: true },
              );
            }
          });
        });
      },
      sendPhoneCode: async (phoneNumber) => {
        if (!auth) {
          set({
            authError:
              "La connexion par téléphone nécessite un dev build Android ou iOS. Expo Go reste disponible en mode démo.",
          });
          return;
        }

        try {
          const confirmation = await auth.signInWithPhoneNumber(phoneNumber);
          set({ authError: null, phoneConfirmation: confirmation });
        } catch (error) {
          set({ authError: readableAuthError(error) });
        }
      },
      confirmPhoneCode: async (code) => {
        const confirmation = useUserStore.getState().phoneConfirmation;
        if (!confirmation) {
          set({ authError: "Demandez un nouveau code avant de le confirmer." });
          return;
        }

        try {
          await confirmation.confirm(code);
          set({ authError: null });
        } catch (error) {
          set({ authError: readableAuthError(error) });
        }
      },
      clearAuthError: () => set({ authError: null }),
      signOut: async () => {
        unsubscribeProfile?.();
        unsubscribeProfile = undefined;

        if (auth) {
          await auth.signOut();
        }
        set({ phoneConfirmation: null, session: null });
      },
    }),
    {
      name: "connected-user",
      partialize: (state) => ({ hasSeenOnboarding: state.hasSeenOnboarding }),
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
