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

function Success({ go, published = false }: { go: (screen: Screen) => void; published?: boolean }) { return <ScreenFrame go={go} title={published ? 'C’est publié' : 'Réservation confirmée'}><View style={styles.successPage}><View style={styles.successMark}><Text style={styles.successGlyph}>✓</Text></View><Text style={styles.successTitle}>{published ? 'Votre trajet est en ligne' : 'C’est confirmé !'}</Text><Text style={styles.displayBody}>{published ? 'Vous serez notifié dès qu’une demande compatible est proposée.' : 'Votre réservation Montréal → Abidjan est enregistrée sous la référence CNCT-7821.'}</Text><Button title={published ? 'Voir mes annonces' : 'Voir mon envoi'} onPress={() => go(published ? 'profile' : 'tracking')} />{!published && <Button title="Retour à l’accueil" variant="outline" onPress={() => go('home')} />}</View></ScreenFrame>; }

export default function SuccessRoute() {
  const go = useScreenNavigation();
  return <Success go={go} />;
}
