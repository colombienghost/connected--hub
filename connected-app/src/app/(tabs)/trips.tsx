import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, Screen, TripCard } from '@/design-system/components';
import { Icon, IconName } from '@/design-system/icons';
import { colors } from '@/design-system/tokens';
import { SearchSummary, SectionTitle } from '@/design-system/screen-components';
import { useScreenNavigation } from '@/design-system/screen-navigation';
import { styles } from '@/design-system/screen-styles';
import { useTripsStore } from '@/stores/trips';

function Trips({ go }: { go: (screen: Screen) => void }) {
  const trips = useTripsStore((state) => state.trips);
  const filters: { icon?: IconName; label: string }[] = [{ label: 'Tous' }, { icon: 'check', label: 'Vérifiés' }, { icon: 'calendar', label: 'Aujourd’hui' }, { icon: 'sliders', label: 'Prix' }];

  return <SafeAreaView style={styles.darkSafe}><View style={styles.app}><AppHeader mode title="Trajets" /><ScrollView contentContainerStyle={styles.tripsContent}><SearchSummary onPress={() => go('shipment')} /><ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>{filters.map((filter, index) => <View key={filter.label} style={[styles.filterChip, index === 0 && styles.filterActive]}>{filter.icon && <Icon color={index === 0 ? colors.white : colors.navy} name={filter.icon} size={16} />}<Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>{filter.label}</Text></View>)}</ScrollView><SectionTitle title="Trajets disponibles" />{trips.map((trip, index) => <TripCard key={trip.name} onPress={() => go('trip')} recommended={index === 0} trip={trip} />)}</ScrollView></View></SafeAreaView>;
}

export default function TripsRoute() {
  const go = useScreenNavigation();
  return <Trips go={go} />;
}
