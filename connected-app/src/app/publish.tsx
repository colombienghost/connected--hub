import { useState } from "react";
import { View } from "react-native";

import { Text } from "@/design-system/text";

import { Button, Screen, ScreenFrame } from "@/design-system/components";
import { Field, Success } from "@/design-system/screen-components";
import { useScreenNavigation } from "@/design-system/screen-navigation";
import { styles } from "@/design-system/screen-styles";

function Publish({ go }: { go: (screen: Screen) => void }) {
  return (
    <ScreenFrame go={go} title="Proposer un trajet">
      <Text style={styles.flowStep}>Nouveau trajet</Text>
      <Text style={styles.pageTitle}>Publiez votre espace disponible</Text>
      <View style={styles.dimensionRow}>
        <View style={styles.flex}>
          <Field label="Départ" placeholder="Montréal" />
        </View>
        <View style={styles.flex}>
          <Field label="Destination" placeholder="Abidjan" />
        </View>
      </View>
      <Field label="Date de départ" placeholder="20 juin 2026" />
      <Field label="Capacité disponible" placeholder="20 kg" />
      <Field label="Prix par kilogramme" placeholder="45 $ CAD" />
      <Button title="Publier le trajet" onPress={() => go("published")} />
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
