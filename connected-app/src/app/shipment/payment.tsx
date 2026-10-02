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

function Payment({ go }: { go: (screen: Screen) => void }) { return <ScreenFrame go={go} title="Paiement sécurisé"><Card style={styles.trustPanel}><Text style={styles.trustIcon}>⌾</Text><View style={styles.flex}><Text style={styles.cardTitle}>Paiement protégé</Text><Text style={styles.meta}>Fonds conservés jusqu’à la livraison</Text></View></Card><Card><Text style={styles.cardEyebrow}>RÉCAPITULATIF</Text><View style={styles.summaryLine}><Text style={styles.meta}>Montréal → Abidjan</Text><Text style={styles.cardTitle}>85 $ CAD</Text></View><View style={styles.summaryLine}><Text style={styles.meta}>Colis CNCT-7821</Text><Text style={styles.cardTitle}>12 kg</Text></View></Card><Text style={styles.label}>Moyen de paiement</Text><Card style={styles.paymentMethod}><Text style={styles.paymentIcon}>▣</Text><Text style={[styles.cardTitle, styles.flex]}>Carte •••• 4242</Text><Text style={styles.link}>Modifier</Text></Card><Button title="Payer 85 $ CAD" onPress={() => go('done')} /><Text style={styles.legalNote}>Simulation locale — aucun débit réel</Text></ScreenFrame>; }

export default function PaymentRoute() {
  const go = useScreenNavigation();
  return <Payment go={go} />;
}
