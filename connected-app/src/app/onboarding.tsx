import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, LogoMark, Screen, VerifiedBadge } from '@/design-system/components';
import { Icon, IconName } from '@/design-system/icons';
import { useScreenNavigation } from '@/design-system/screen-navigation';
import { styles } from '@/design-system/screen-styles';
import { colors } from '@/design-system/tokens';
import { useUserStore } from '@/stores/user';

function Onboarding({ go }: { go: (screen: Screen) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const steps: { title: string; body: string; icon: IconName }[] = [
    { title: 'Comment vous appelez-vous ?', body: 'Votre nom nous aide à personnaliser votre expérience.', icon: 'user' },
    { title: 'Où êtes-vous situé ?', body: 'Nous adapterons les trajets et les formats à votre pays.', icon: 'pin' },
    { title: 'Choisissez votre rôle', body: 'Vous pourrez changer de mode à tout moment.', icon: 'route' },
    { title: 'Votre numéro de téléphone', body: 'Il servira à sécuriser votre compte.', icon: 'chat' },
    { title: 'Vérifiez votre identité', body: 'La confiance protège chaque envoi CONNECTED.', icon: 'shield-check' },
    { title: 'Bienvenue dans CONNECTED', body: 'Votre profil est prêt pour votre premier trajet.', icon: 'check' },
  ];
  const current = steps[step];
  return <SafeAreaView style={styles.lightSafe}><ScrollView contentContainerStyle={styles.onboarding} keyboardShouldPersistTaps="handled" style={styles.mobileViewport}>
    <View style={styles.onboardingTop}><Pressable accessibilityLabel="Retour" onPress={() => step > 0 && setStep(step - 1)} style={styles.backLight}><Icon name="chevron-left" size={28} /></Pressable><View style={styles.brandLockup}><LogoMark size={34} /><Text style={styles.brandName}>CONNECTED</Text></View><View style={styles.backLight} /></View>
    <Text style={styles.stepText}>{step + 1} sur 6</Text><View style={styles.segmentRow}>{steps.map((_, index) => <View key={index} style={[styles.segment, index <= step && styles.segmentActive]} />)}</View>
    <View style={styles.onboardingIllustration}><View style={styles.illustrationOrbit} /><View style={styles.illustrationCase}><Icon name={current.icon} size={28} /></View><View style={styles.illustrationPlane}><Icon name="plane" size={24} /></View></View>
    <Text style={styles.displayTitle}>{current.title}</Text><Text style={styles.displayBody}>{current.body}</Text>
    <View style={styles.onboardingControl}>
      {step === 0 && <TextInput accessibilityLabel="Nom complet" onChangeText={setName} placeholder="Nom complet" placeholderTextColor={colors.textTertiary} style={styles.heroInput} value={name} />}
      {step === 1 && <Card style={styles.choiceSelected}><Text style={styles.choiceTitle}>Canada</Text><Icon color={colors.success} name="check" size={20} strokeWidth={2.5} /></Card>}
      {step === 2 && <View style={styles.choiceGrid}><Card style={styles.roleCard}><Icon name="package" size={28} /><Text style={styles.choiceTitle}>Expéditeur</Text></Card><Card style={styles.roleCard}><Icon name="plane" size={28} /><Text style={styles.choiceTitle}>Convoyeur</Text></Card></View>}
      {step === 3 && <TextInput accessibilityLabel="Numéro de téléphone" placeholder="+1 514 000 0000" placeholderTextColor={colors.textTertiary} style={styles.heroInput} />}
      {step === 4 && <Card style={styles.trustPanel}><Icon name="shield-check" size={24} /><View style={styles.flex}><Text style={styles.cardTitle}>Identité protégée</Text><Text style={styles.meta}>Vérification simulée dans ce prototype</Text></View></Card>}
      {step === 5 && <Card style={styles.profileReady}><VerifiedBadge label="Profil créé" /><Text style={styles.readyName}>{name || 'Franck O.'}</Text><Text style={styles.meta}>Expéditeur · Canada</Text></Card>}
    </View>
    <View style={styles.onboardingFooter}><Button title={step === 5 ? 'Découvrir CONNECTED' : 'Continuer'} trailingIcon="chevron-right" onPress={() => step === 5 ? go('login') : setStep(step + 1)} /><Pressable onPress={() => go('login')}><Text style={styles.skip}>Passer</Text></Pressable></View>
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
