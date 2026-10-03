import { View } from "react-native";

import { Text } from "@/design-system/text";

import { Button, Card, Screen, ScreenFrame } from "@/design-system/components";
import { Icon } from "@/design-system/icons";
import { useScreenNavigation } from "@/design-system/screen-navigation";
import { styles } from "@/design-system/screen-styles";

function Payment({ go }: { go: (screen: Screen) => void }) {
  return (
    <ScreenFrame go={go} title="Paiement sécurisé">
      <Card style={styles.trustPanel}>
        <Icon name="shield-check" size={24} />
        <View style={styles.flex}>
          <Text style={styles.cardTitle}>Paiement protégé</Text>
          <Text style={styles.meta}>Fonds conservés jusqu’à la livraison</Text>
        </View>
      </Card>
      <Card>
        <Text style={styles.cardEyebrow}>RÉCAPITULATIF</Text>
        <View style={styles.summaryLine}>
          <Text style={styles.meta}>Montréal → Abidjan</Text>
          <Text style={styles.cardTitle}>85 $ CAD</Text>
        </View>
        <View style={styles.summaryLine}>
          <Text style={styles.meta}>Colis CNCT-7821</Text>
          <Text style={styles.cardTitle}>12 kg</Text>
        </View>
      </Card>
      <Text style={styles.label}>Moyen de paiement</Text>
      <Card style={styles.paymentMethod}>
        <Icon name="card" size={22} />
        <Text style={[styles.cardTitle, styles.flex]}>Carte •••• 4242</Text>
        <Text style={styles.link}>Modifier</Text>
      </Card>
      <Button title="Payer 85 $ CAD" onPress={() => go("done")} />
      <Text style={styles.legalNote}>Simulation locale — aucun débit réel</Text>
    </ScreenFrame>
  );
}

export default function PaymentRoute() {
  const go = useScreenNavigation();
  return <Payment go={go} />;
}
