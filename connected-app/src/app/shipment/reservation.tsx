import { useState } from "react";
import { Pressable, View } from "react-native";

import { Text } from "@/design-system/text";

import {
  Button,
  Card,
  RouteSummary,
  Screen,
  ScreenFrame,
  TripCard,
} from "@/design-system/components";
import { Icon } from "@/design-system/icons";
import { useScreenNavigation } from "@/design-system/screen-navigation";
import { styles } from "@/design-system/screen-styles";
import { useTripsStore } from "@/stores/trips";

function Reservation({ go }: { go: (screen: Screen) => void }) {
  const trips = useTripsStore((state) => state.trips);

  const [accepted, setAccepted] = useState(false);
  return (
    <ScreenFrame go={go} title="Confirmer ce trajet">
      <Text style={styles.flowStep}>Étape 3 sur 4 · 75 %</Text>
      <View style={styles.flowProgress}>
        <View style={[styles.flowProgressFill, { width: "75%" }]} />
      </View>
      <TripCard onPress={() => go("trip")} recommended trip={trips[0]} />
      <Card>
        <Text style={styles.cardEyebrow}>VOTRE RÉSERVATION</Text>
        <RouteSummary />
        {[
          ["Votre colis", "12 kg · Vêtements"],
          ["Transport", "75 $"],
          ["Frais de service", "10 $"],
          ["Total", "85 $ CAD"],
        ].map(([label, value]) => (
          <View key={label} style={styles.summaryLine}>
            <Text style={styles.meta}>{label}</Text>
            <Text style={label === "Total" ? styles.total : styles.cardTitle}>
              {value}
            </Text>
          </View>
        ))}
      </Card>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: accepted }}
        onPress={() => setAccepted(!accepted)}
        style={styles.checkRow}
      >
        <View style={[styles.checkbox, accepted && styles.checkboxOn]}>
          {accepted && <Icon name="check" size={16} strokeWidth={2.5} />}
        </View>
        <Text style={styles.checkLabel}>
          J’accepte les règles relatives aux objets autorisés
        </Text>
      </Pressable>
      <Button
        disabled={!accepted}
        title="Continuer vers le paiement"
        onPress={() => go("payment")}
      />
    </ScreenFrame>
  );
}

export default function ReservationRoute() {
  const go = useScreenNavigation();
  return <Reservation go={go} />;
}
