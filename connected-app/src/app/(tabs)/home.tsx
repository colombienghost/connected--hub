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

function Home({ go }: { go: (screen: Screen) => void }) {
  const trips = useTripsStore((state) => state.trips);

  return <SafeAreaView style={styles.darkSafe}><View style={styles.app}><AppHeader mode /><View style={styles.homeGreeting}><Text style={styles.greeting}>Bonjour, <Text style={styles.amberText}>Franck</Text></Text></View><ScrollView contentContainerStyle={styles.homeContent}><SearchSummary onPress={() => go('trips')} /><View style={styles.quickGrid}><Card onPress={() => go('shipment')} style={styles.quickCard}><View style={[styles.quickIcon, styles.quickAmber]}><Text style={styles.quickGlyph}>□</Text></View><Text style={styles.quickTitle}>Envoyer</Text><Text style={styles.quickArrow}>›</Text></Card><Card onPress={() => go('tracking')} style={styles.quickCard}><View style={[styles.quickIcon, styles.quickSky]}><Text style={styles.quickGlyph}>⌖</Text></View><Text style={styles.quickTitle}>Suivre</Text><Text style={styles.quickArrow}>›</Text></Card></View><SectionTitle action="Voir tout" onPress={() => go('trips')} title="Trajets disponibles" />{trips.map((trip) => <TripCard key={trip.name} onPress={() => go('trip')} trip={trip} />)}</ScrollView></View></SafeAreaView>;
}

export default function HomeRoute() {
  const go = useScreenNavigation();
  return <Home go={go} />;
}
