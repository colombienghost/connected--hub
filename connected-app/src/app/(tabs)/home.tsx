import { ScrollView, View } from "react-native";

import { Text } from "@/design-system/text";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader, Card, Screen, TripCard } from "@/design-system/components";
import { Icon } from "@/design-system/icons";
import { SearchSummary, SectionTitle } from "@/design-system/screen-components";
import { useScreenNavigation } from "@/design-system/screen-navigation";
import { styles } from "@/design-system/screen-styles";
import { colors } from "@/design-system/tokens";
import { useTripsStore } from "@/stores/trips";

function Home({ go }: { go: (screen: Screen) => void }) {
  const trips = useTripsStore((state) => state.trips);

  return (
    <SafeAreaView style={styles.darkSafe}>
      <View style={styles.app}>
        <AppHeader mode />
        <View style={styles.homeGreeting}>
          <Text style={styles.greeting}>
            Bonjour, <Text style={styles.amberText}>Franck</Text>
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.homeContent}>
          <SearchSummary onPress={() => go("trips")} />
          <View style={styles.quickGrid}>
            <Card onPress={() => go("shipment")} style={styles.quickCard}>
              <View style={[styles.quickIcon, styles.quickAmber]}>
                <Icon color={colors.navy} name="package" size={22} />
              </View>
              <Text style={styles.quickTitle}>Envoyer</Text>
              <Icon color={colors.navy} name="chevron-right" size={24} />
            </Card>
            <Card onPress={() => go("tracking")} style={styles.quickCard}>
              <View style={[styles.quickIcon, styles.quickSky]}>
                <Icon color={colors.navy} name="pin" size={22} />
              </View>
              <Text style={styles.quickTitle}>Suivre</Text>
              <Icon color={colors.navy} name="chevron-right" size={24} />
            </Card>
          </View>
          <SectionTitle
            action="Voir tout"
            onPress={() => go("trips")}
            title="Trajets disponibles"
          />
          {trips.map((trip) => (
            <TripCard key={trip.name} onPress={() => go("trip")} trip={trip} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default function HomeRoute() {
  const go = useScreenNavigation();
  return <Home go={go} />;
}
