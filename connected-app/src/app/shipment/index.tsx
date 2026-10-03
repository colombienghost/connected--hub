import { useState } from "react";
import { Pressable, View } from "react-native";

import { Text, TextInput } from "@/design-system/text";

import { Button, Card, Screen, ScreenFrame } from "@/design-system/components";
import { Icon } from "@/design-system/icons";
import { Field } from "@/design-system/screen-components";
import { useScreenNavigation } from "@/design-system/screen-navigation";
import { styles } from "@/design-system/screen-styles";
import { colors } from "@/design-system/tokens";

function Shipment({ go }: { go: (screen: Screen) => void }) {
  const [kg, setKg] = useState("12");
  return (
    <ScreenFrame go={go} title="Expédier un colis">
      <Text style={styles.flowStep}>Étape 1 sur 4</Text>
      <View style={styles.flowProgress}>
        <View style={styles.flowProgressFill} />
      </View>
      <Text style={styles.pageTitle}>Parlez-nous de votre colis</Text>
      <Text style={styles.label}>Type de colis</Text>
      <View style={styles.chipGrid}>
        {["Documents", "Vêtements", "Électronique", "Autre"].map((item) => (
          <View
            key={item}
            style={[
              styles.packageChip,
              item === "Vêtements" && styles.packageSelected,
            ]}
          >
            <Text
              style={[
                styles.packageText,
                item === "Vêtements" && styles.packageTextSelected,
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
      <Text style={styles.label}>Poids du colis</Text>
      <View style={styles.stepper}>
        <Pressable
          onPress={() => setKg(String(Math.max(1, Number(kg) - 1)))}
          style={styles.stepperControl}
        >
          <Icon name="chevron-left" size={20} />
        </Pressable>
        <TextInput
          keyboardType="numeric"
          onChangeText={setKg}
          style={styles.stepperValue}
          value={kg}
        />
        <Text style={styles.unit}>kg</Text>
        <Pressable
          onPress={() => setKg(String(Number(kg) + 1))}
          style={styles.stepperControl}
        >
          <Icon name="plus" size={20} />
        </Pressable>
      </View>
      <Text style={styles.label}>Dimensions</Text>
      <View style={styles.dimensionRow}>
        {["Longueur", "Largeur", "Hauteur"].map((item) => (
          <TextInput
            key={item}
            placeholder={item}
            placeholderTextColor={colors.textTertiary}
            style={[styles.input, styles.dimensionInput]}
          />
        ))}
      </View>
      <Field
        label="Description"
        placeholder="Décrivez le contenu de votre colis"
      />
      <Card style={styles.estimateCard}>
        <View>
          <Text style={styles.meta}>Valeur déclarée</Text>
          <Text style={styles.cardTitle}>100 $ CAD</Text>
        </View>
        <View style={styles.estimateRight}>
          <Text style={styles.meta}>Total estimé</Text>
          <Text style={styles.total}>60 $ CAD</Text>
        </View>
      </Card>
      <Button title="Trouver un voyageur" onPress={() => go("reservation")} />
    </ScreenFrame>
  );
}

export default function ShipmentRoute() {
  const go = useScreenNavigation();
  return <Shipment go={go} />;
}
