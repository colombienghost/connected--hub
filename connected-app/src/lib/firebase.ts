import Constants from "expo-constants";
import { Platform } from "react-native";

type FirebaseConfig = {
  apiKey: string;
  appId: string;
  authDomain: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
};

type NativeModule<T> = {
  default?: () => T;
  serverTimestamp?: () => unknown;
};

function getNativeModule<T>(moduleName: string): NativeModule<T> | null {
  if (Platform.OS === "web") return null;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- RNFirebase is absent from Expo Go.
    return require(moduleName) as NativeModule<T>;
  } catch {
    return null;
  }
}

const extra = Constants.expoConfig?.extra as
  { firebase?: FirebaseConfig } | undefined;

// The config is public by design. Native builds use google-services.json instead.
export const firebaseConfig = extra?.firebase ?? null;

const nativeAuth = getNativeModule<any>("@react-native-firebase/auth");
const nativeFirestore = getNativeModule<any>(
  "@react-native-firebase/firestore",
);

// Expo Go has no RNFirebase native modules. Keeping these nullable preserves demo mode.
export const auth = nativeAuth?.default?.() ?? null;
export const db = nativeFirestore?.default?.() ?? null;
export const storage = null;
export const isFirebaseAvailable = Boolean(auth && db);

export function serverTimestamp() {
  return nativeFirestore?.serverTimestamp?.() ?? null;
}
