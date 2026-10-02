import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AppHeader,
  BottomNavigation,
  Button,
  Card,
  LogoMark,
  RouteSummary,
  Screen,
  ScreenFrame,
  Trip,
  TripCard,
  VerifiedBadge,
} from '@/design-system/components';
import { Detail, Field, SearchSummary, SectionTitle } from '@/design-system/screen-components';
import { useScreenNavigation } from '@/design-system/screen-navigation';
import { styles } from '@/design-system/screen-styles';
import { colors, radius, shadows, spacing, typography } from '@/design-system/tokens';
import { useMessagesStore } from '@/stores/messages';
import { useShipmentsStore } from '@/stores/shipments';
import { useTripsStore } from '@/stores/trips';

function Trips({ go }: { go: (screen: Screen) => void }) {
  const trips = useTripsStore((state) => state.trips);

  return <SafeAreaView style={styles.darkSafe}><View style={styles.app}><AppHeader mode title="Trajets" /><ScrollView contentContainerStyle={styles.tripsContent}><SearchSummary onPress={() => go('shipment')} /><ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>{['Tous', '✓ Vérifiés', '▣ Aujourd’hui', '⇅ Prix'].map((filter, index) => <View key={filter} style={[styles.filterChip, index === 0 && styles.filterActive]}><Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>{filter}</Text></View>)}</ScrollView><SectionTitle title="Trajets disponibles" />{trips.map((trip, index) => <TripCard key={trip.name} onPress={() => go('trip')} recommended={index === 0} trip={trip} />)}</ScrollView></View></SafeAreaView>;
}

export default function TripsRoute() {
  const go = useScreenNavigation();
  return <Trips go={go} />;
}
