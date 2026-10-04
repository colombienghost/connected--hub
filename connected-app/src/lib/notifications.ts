import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotifications() {
  if (Platform.OS === "web" || !Device.isDevice) return null;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("connected", {
      importance: Notifications.AndroidImportance.DEFAULT,
      name: "CONNECTED",
    });
  }

  const permissions = await Notifications.getPermissionsAsync();
  const status =
    permissions.status === "granted"
      ? permissions.status
      : (await Notifications.requestPermissionsAsync()).status;
  if (status !== "granted") return null;

  const projectId =
    Constants.easConfig?.projectId ??
    Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) return null;

  return (await Notifications.getExpoPushTokenAsync({ projectId })).data;
}
