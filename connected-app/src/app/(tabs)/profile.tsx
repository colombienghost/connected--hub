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
import { useUserStore } from '@/stores/user';

function Profile({ go }: { go: (screen: Screen) => void }) {
  const settings = [['✓', 'Vérifier mon identité'], ['□', 'Mes envois et trajets'], ['⌖', 'Suivi en temps réel'], ['▤', 'Preuves et reçus'], ['▣', 'Paiements'], ['?', 'Aide et sécurité']];
  return <ScreenFrame active="profile" go={go} title="Profil"><Card style={styles.profileCard}><View style={styles.profileIdentity}><View style={[styles.largeAvatar, { backgroundColor: colors.skyMap }]}><Text style={styles.largeAvatarText}>FO</Text></View><View style={styles.flex}><Text style={styles.profileName}>Franck O.</Text><VerifiedBadge label="Identité vérifiée" /><Text style={styles.rating}>★ 4,8 · Membre depuis 2026</Text></View></View><View style={styles.profileMetrics}><View style={styles.metric}><Text style={styles.metricValue}>3</Text><Text style={styles.meta}>envois actifs</Text></View><View style={styles.metric}><Text style={styles.metricValue}>12</Text><Text style={styles.meta}>trajets suivis</Text></View></View></Card><Card style={styles.settingsCard}>{settings.map(([icon, label], index) => <Pressable key={label} onPress={() => label === 'Suivi en temps réel' ? go('tracking') : undefined} style={[styles.settingRow, index === settings.length - 1 && styles.settingRowLast]}><View style={styles.settingIcon}><Text style={styles.settingGlyph}>{icon}</Text></View><Text style={[styles.cardTitle, styles.flex]}>{label}</Text><Text style={styles.chevron}>›</Text></Pressable>)}</Card><Card onPress={() => go('tracking')} style={styles.activeShipment}><View style={styles.inline}><View style={styles.statusPill}><Text style={styles.statusText}>En cours</Text></View><Text style={styles.contextRef}>CNCT-7821</Text></View><Text style={styles.cardTitle}>Montréal → Abidjan</Text><Text style={styles.link}>Remise confirmée · Voir le suivi</Text></Card><Pressable onPress={() => go('login')}><Text style={styles.logout}>Se déconnecter</Text></Pressable></ScreenFrame>;
}

export default function ProfileRoute() {
  const signOut = useUserStore((state) => state.signOut);
  const navigate = useScreenNavigation();
  const go = (screen: Screen) => {
    if (screen === 'login') signOut();
    navigate(screen);
  };

  return <Profile go={go} />;
}
