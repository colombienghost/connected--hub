import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Text } from "@/design-system/text";

import {
  Button,
  Card,
  Screen,
  ScreenFrame,
  VerifiedBadge,
} from "@/design-system/components";
import { Icon, IconName } from "@/design-system/icons";
import { useScreenNavigation } from "@/design-system/screen-navigation";
import { styles } from "@/design-system/screen-styles";
import { colors } from "@/design-system/tokens";
import { useShipmentsStore } from "@/stores/shipments";

function Tracking({ go }: { go: (screen: Screen) => void }) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const shipments = useShipmentsStore((state) => state.shipments);
  const shipment = shipments.find((item) => item.id === id) ?? shipments[0];
  const events = [
    ["Réservé", "18 juin\n08:30"],
    ["Remis", "20 juin\n12:45"],
    ["En route", "21 juin\n09:15"],
    ["Livré", "—"],
  ];
  const timelineIcons: IconName[] = ["check", "check", "plane", "clock"];
  const infoTiles: {
    icon: IconName;
    label: string;
    value: string;
    action?: boolean;
  }[] = [
    { icon: "weight", label: "Poids", value: "12 kg" },
    { icon: "package", label: "Contenu", value: "Vêtements" },
    { icon: "pin", label: "Remise", value: "Terminal 1" },
    { icon: "qr-code", label: "Code QR", value: "Afficher", action: true },
  ];
  return (
    <ScreenFrame go={go} title="Envoi actif">
      <Card style={styles.trackingHero}>
        <View style={styles.trackingTop}>
          <View>
            <Text style={styles.pageTitle}>{shipment.route}</Text>
            <Text style={styles.trackingRef}>{shipment.id}</Text>
          </View>
          <View>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>{shipment.status}</Text>
            </View>
            <Text style={styles.arrival}>Arrivée{"\n"}21 juin</Text>
          </View>
        </View>
        <View style={styles.map}>
          <Text style={styles.mapCode}>YUL</Text>
          <View style={styles.mapRoute}>
            <View style={styles.mapDash} />
            <View style={styles.mapPlane}>
              <Icon color={colors.white} name="plane" size={17} />
            </View>
            <View style={styles.mapDash} />
          </View>
          <Text style={styles.mapCode}>ABJ</Text>
        </View>
      </Card>
      <Card>
        <View style={styles.timeline}>
          {events.map(([label, time], index) => (
            <View key={label} style={styles.timelineItem}>
              <View
                style={[styles.timelineDot, index < 3 && styles.timelineDotOn]}
              >
                <Icon
                  color={index < 3 ? colors.white : colors.textTertiary}
                  name={timelineIcons[index]}
                  size={16}
                />
              </View>
              <Text style={styles.timelineLabel}>{label}</Text>
              <Text style={styles.timelineTime}>{time}</Text>
            </View>
          ))}
        </View>
      </Card>
      <Card style={styles.travelerRow}>
        <View style={[styles.largeAvatar, styles.mediumAvatar]}>
          <Text style={styles.avatarText}>SM</Text>
        </View>
        <View style={styles.flex}>
          <View style={styles.inline}>
            <Text style={styles.cardTitle}>Sarah M.</Text>
            <VerifiedBadge />
          </View>
          <Text style={styles.meta}>
            Dernière mise à jour · Aéroport de Montréal
          </Text>
        </View>
        <Button compact title="Message" onPress={() => go("chat")} />
      </Card>
      <View style={styles.infoTiles}>
        {infoTiles.map(({ icon, label, value, action }) => (
          <Card key={label} style={styles.infoTile}>
            <Icon name={icon} size={20} />
            <View>
              <Text style={styles.meta}>{label}</Text>
              <View style={styles.tileValueRow}>
                <Text style={styles.cardTitle}>{value}</Text>
                {action && <Icon name="chevron-right" size={14} />}
              </View>
            </View>
          </Card>
        ))}
      </View>
    </ScreenFrame>
  );
}

export default function TrackingRoute() {
  const go = useScreenNavigation();
  return <Tracking go={go} />;
}
