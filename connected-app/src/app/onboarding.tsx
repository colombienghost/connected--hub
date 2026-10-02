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

function Onboarding({ go }: { go: (screen: Screen) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const steps = [
    { title: 'Comment vous appelez-vous ?', body: 'Votre nom nous aide à personnaliser votre expérience.', symbol: 'ID' },
    { title: 'Où êtes-vous situé ?', body: 'Nous adapterons les trajets et les formats à votre pays.', symbol: 'CA' },
    { title: 'Choisissez votre rôle', body: 'Vous pourrez changer de mode à tout moment.', symbol: '⇄' },
    { title: 'Votre numéro de téléphone', body: 'Il servira à sécuriser votre compte.', symbol: '+1' },
    { title: 'Vérifiez votre identité', body: 'La confiance protège chaque envoi CONNECTED.', symbol: '✓' },
    { title: 'Bienvenue dans CONNECTED', body: 'Votre profil est prêt pour votre premier trajet.', symbol: '✓' },
  ];
  const current = steps[step];
  return <SafeAreaView style={styles.lightSafe}><ScrollView contentContainerStyle={styles.onboarding} keyboardShouldPersistTaps="handled" style={styles.mobileViewport}>
    <View style={styles.onboardingTop}><Pressable accessibilityLabel="Retour" onPress={() => step > 0 && setStep(step - 1)} style={styles.backLight}><Text style={styles.backLightText}>‹</Text></Pressable><View style={styles.brandLockup}><LogoMark size={34} /><Text style={styles.brandName}>CONNECTED</Text></View><View style={styles.backLight} /></View>
    <Text style={styles.stepText}>{step + 1} sur 6</Text><View style={styles.segmentRow}>{steps.map((_, index) => <View key={index} style={[styles.segment, index <= step && styles.segmentActive]} />)}</View>
    <View style={styles.onboardingIllustration}><View style={styles.illustrationOrbit} /><View style={styles.illustrationCase}><Text style={styles.illustrationSymbol}>{current.symbol}</Text></View><View style={styles.illustrationPlane}><Text style={styles.illustrationPlaneText}>✈</Text></View></View>
    <Text style={styles.displayTitle}>{current.title}</Text><Text style={styles.displayBody}>{current.body}</Text>
    <View style={styles.onboardingControl}>
      {step === 0 && <TextInput accessibilityLabel="Nom complet" onChangeText={setName} placeholder="Nom complet" placeholderTextColor={colors.textTertiary} style={styles.heroInput} value={name} />}
      {step === 1 && <Card style={styles.choiceSelected}><Text style={styles.choiceTitle}>Canada</Text><Text style={styles.choiceCheck}>✓</Text></Card>}
      {step === 2 && <View style={styles.choiceGrid}><Card style={styles.roleCard}><Text style={styles.roleIcon}>□</Text><Text style={styles.choiceTitle}>Expéditeur</Text></Card><Card style={styles.roleCard}><Text style={styles.roleIcon}>✈</Text><Text style={styles.choiceTitle}>Convoyeur</Text></Card></View>}
      {step === 3 && <TextInput accessibilityLabel="Numéro de téléphone" placeholder="+1 514 000 0000" placeholderTextColor={colors.textTertiary} style={styles.heroInput} />}
      {step === 4 && <Card style={styles.trustPanel}><Text style={styles.trustIcon}>✓</Text><View style={styles.flex}><Text style={styles.cardTitle}>Identité protégée</Text><Text style={styles.meta}>Vérification simulée dans ce prototype</Text></View></Card>}
      {step === 5 && <Card style={styles.profileReady}><VerifiedBadge label="Profil créé" /><Text style={styles.readyName}>{name || 'Franck O.'}</Text><Text style={styles.meta}>Expéditeur · Canada</Text></Card>}
    </View>
    <View style={styles.onboardingFooter}><Button title={step === 5 ? 'Découvrir CONNECTED  →' : 'Continuer  →'} onPress={() => step === 5 ? go('login') : setStep(step + 1)} /><Pressable onPress={() => go('login')}><Text style={styles.skip}>Passer</Text></Pressable></View>
  </ScrollView></SafeAreaView>;
}

export default function OnboardingRoute() {
  const completeOnboarding = useUserStore((state) => state.completeOnboarding);
  const navigate = useScreenNavigation();
  const go = (screen: Screen) => {
    if (screen === 'login') completeOnboarding();
    navigate(screen);
  };

  return <Onboarding go={go} />;
}
