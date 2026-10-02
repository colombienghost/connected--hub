import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, LogoMark, Screen } from '@/design-system/components';
import { Icon } from '@/design-system/icons';
import { Field } from '@/design-system/screen-components';
import { useScreenNavigation } from '@/design-system/screen-navigation';
import { styles } from '@/design-system/screen-styles';
import { useUserStore } from '@/stores/user';

function Login({ go }: { go: (screen: Screen) => void }) {
  const [method, setMethod] = useState<'choice' | 'email' | 'phone'>('choice');
  return <SafeAreaView style={styles.authSafe}><ScrollView contentContainerStyle={styles.authPage} keyboardShouldPersistTaps="handled" style={styles.mobileViewport}>
    <View style={styles.authBrand}><LogoMark inverse size={54} /><Text style={styles.authBrandName}>CONNECTED</Text></View>
    <View style={styles.authIntro}><Text style={styles.authTitle}>{method === 'choice' ? 'Bienvenue sur\nCONNECTED' : method === 'email' ? 'Connexion par e-mail' : 'Connexion par téléphone'}</Text><View style={styles.amberDash} /><Text style={styles.authSubtitle}>{method === 'choice' ? 'Envoyez. Voyagez. Connectez-vous.' : 'Retrouvez vos trajets et vos envois.'}</Text></View>
    <View style={styles.authSheet}>{method === 'choice' ? <><Button title="Continuer avec Apple" variant="outline" onPress={() => setMethod('email')} /><Button title="Continuer avec Google" variant="outline" onPress={() => setMethod('email')} /><View style={styles.orRow}><View style={styles.orLine} /><Text style={styles.orText}>ou</Text><View style={styles.orLine} /></View><Button title="Continuer avec un e-mail" variant="secondary" onPress={() => setMethod('email')} /><Pressable onPress={() => setMethod('phone')}><Text style={styles.authLink}>Continuer par téléphone</Text></Pressable></> : <><Pressable onPress={() => setMethod('choice')} style={styles.backToMethods}><Icon name="chevron-left" size={16} /><Text style={styles.backToMethodsText}>Toutes les méthodes</Text></Pressable><Field label={method === 'email' ? 'Adresse e-mail' : 'Numéro de téléphone'} placeholder={method === 'email' ? 'franck@email.com' : '+1 514 000 0000'} /><Field label="Mot de passe" placeholder="••••••••" secure /><Button title="Se connecter" onPress={() => go('home')} /></>}<Pressable onPress={() => go('home')}><Text style={styles.createAccount}>Créer un compte</Text></Pressable></View>
  </ScrollView></SafeAreaView>;
}

export default function LoginRoute() {
  const signIn = useUserStore((state) => state.signIn);
  const navigate = useScreenNavigation();
  const go = (screen: Screen) => {
    if (screen === 'home') signIn();
    navigate(screen);
  };

  return <Login go={go} />;
}
