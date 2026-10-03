import { Pressable, View } from "react-native";

import { Text } from "@/design-system/text";

import {
  Button,
  Card,
  RouteSummary,
  Screen,
  ScreenFrame,
  VerifiedBadge,
} from "@/design-system/components";
import { Icon } from "@/design-system/icons";
import { colors } from "@/design-system/tokens";
import { Detail } from "@/design-system/screen-components";
import { useScreenNavigation } from "@/design-system/screen-navigation";
import { styles } from "@/design-system/screen-styles";
import { useTripsStore } from "@/stores/trips";

function TripDetail({ go }: { go: (screen: Screen) => void }) {
  const trips = useTripsStore((state) => state.trips);

  return (
    <ScreenFrame go={go} title="Détails du trajet">
      <View style={styles.travelerHero}>
        <View
          style={[styles.largeAvatar, { backgroundColor: trips[0].avatarTone }]}
        >
          <Text style={styles.largeAvatarText}>SM</Text>
        </View>
        <Text style={styles.pageTitle}>Sarah M.</Text>
        <VerifiedBadge />
        <View style={styles.ratingRow}>
          <Icon color={colors.amberPressed} name="star" size={14} />
          <Text style={styles.rating}>4,9 · 18 livraisons réussies</Text>
        </View>
      </View>
      <Card>
        <Text style={styles.cardEyebrow}>TRAJET SÉLECTIONNÉ</Text>
        <RouteSummary />
        <View style={styles.detailGrid}>
          <Detail label="Départ" value="20 juin, 08:30" />
          <Detail label="Arrivée" value="21 juin, 09:15" />
          <Detail label="Capacité" value="23 kg disponibles" />
          <Detail label="Tarif" value="85 $ CAD" />
        </View>
      </Card>
      <Card style={styles.trustPanel}>
        <Icon name="shield-check" size={24} />
        <View style={styles.flex}>
          <Text style={styles.cardTitle}>Voyageuse vérifiée</Text>
          <Text style={styles.meta}>Identité contrôlée · Paiement protégé</Text>
        </View>
      </Card>
      <Button title="Réserver avec Sarah" onPress={() => go("reservation")} />
      <Pressable onPress={() => go("chat")}>
        <Text style={styles.centerLink}>Poser une question à Sarah</Text>
      </Pressable>
    </ScreenFrame>
  );
}

export default function TripDetailRoute() {
  const go = useScreenNavigation();
  return <TripDetail go={go} />;
}
