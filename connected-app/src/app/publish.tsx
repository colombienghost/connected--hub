import { useState } from "react";
import { View } from "react-native";

import { Text } from "@/design-system/text";

import { Button, Screen, ScreenFrame } from "@/design-system/components";
import { Field, Success } from "@/design-system/screen-components";
import { useScreenNavigation } from "@/design-system/screen-navigation";
import { styles } from "@/design-system/screen-styles";
import { useTripsStore } from "@/stores/trips";

function Publish({ go }: { go: (screen: Screen) => void }) {
  const publishTrip = useTripsStore((state) => state.publishTrip);
  const [from, setFrom] = useState("Montréal");
  const [to, setTo] = useState("Abidjan");
  const [date, setDate] = useState("20 juin 2026");
  const [capacityKg, setCapacityKg] = useState("20 kg");
  const [price, setPrice] = useState("45 $ CAD");
  return (
    <ScreenFrame go={go} title="Proposer un trajet">
      <Text style={styles.flowStep}>Nouveau trajet</Text>
      <Text style={styles.pageTitle}>Publiez votre espace disponible</Text>
      <View style={styles.dimensionRow}>
        <View style={styles.flex}>
          <Field
            label="Départ"
            onChangeText={setFrom}
            placeholder="Montréal"
            value={from}
          />
        </View>
        <View style={styles.flex}>
          <Field
            label="Destination"
            onChangeText={setTo}
            placeholder="Abidjan"
            value={to}
          />
        </View>
      </View>
      <Field
        label="Date de départ"
        onChangeText={setDate}
        placeholder="20 juin 2026"
        value={date}
      />
      <Field
        label="Capacité disponible"
        onChangeText={setCapacityKg}
        placeholder="20 kg"
        value={capacityKg}
      />
      <Field
        label="Prix par kilogramme"
        onChangeText={setPrice}
        placeholder="45 $ CAD"
        value={price}
      />
      <Button
        title="Publier le trajet"
        onPress={() =>
          void publishTrip({ from, to, date, capacityKg, price }).then(() =>
            go("published"),
          )
        }
      />
    </ScreenFrame>
  );
}

export default function PublishRoute() {
  const [published, setPublished] = useState(false);
  const navigate = useScreenNavigation();
  const go = (screen: Screen) => {
    if (screen === "published") {
      setPublished(true);
      return;
    }
    navigate(screen);
  };

  return published ? <Success go={go} published /> : <Publish go={go} />;
}
