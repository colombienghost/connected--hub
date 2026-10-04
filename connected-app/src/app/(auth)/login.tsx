import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { Text } from "@/design-system/text";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, LogoMark, Screen } from "@/design-system/components";
import { Icon } from "@/design-system/icons";
import { Field } from "@/design-system/screen-components";
import { useScreenNavigation } from "@/design-system/screen-navigation";
import { styles } from "@/design-system/screen-styles";
import { useUserStore } from "@/stores/user";

function Login({ go }: { go: (screen: Screen) => void }) {
  const [method, setMethod] = useState<"choice" | "email" | "phone">("choice");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const phoneConfirmation = useUserStore((state) => state.phoneConfirmation);
  const authError = useUserStore((state) => state.authError);
  const sendPhoneCode = useUserStore((state) => state.sendPhoneCode);
  const confirmPhoneCode = useUserStore((state) => state.confirmPhoneCode);
  return (
    <SafeAreaView style={styles.authSafe}>
      <ScrollView
        contentContainerStyle={styles.authPage}
        keyboardShouldPersistTaps="handled"
        style={styles.mobileViewport}
      >
        <View style={styles.authBrand}>
          <LogoMark inverse size={54} />
          <Text style={styles.authBrandName}>CONNECTED</Text>
        </View>
        <View style={styles.authIntro}>
          <Text style={styles.authTitle}>
            {method === "choice"
              ? "Bienvenue sur\nCONNECTED"
              : method === "email"
                ? "Connexion par e-mail"
                : "Connexion par téléphone"}
          </Text>
          <View style={styles.amberDash} />
          <Text style={styles.authSubtitle}>
            {method === "choice"
              ? "Envoyez. Voyagez. Connectez-vous."
              : "Retrouvez vos trajets et vos envois."}
          </Text>
        </View>
        <View style={styles.authSheet}>
          {method === "choice" ? (
            <>
              <Button
                title="Continuer avec Apple"
                variant="outline"
                onPress={() => setMethod("email")}
              />
              <Button
                title="Continuer avec Google"
                variant="outline"
                onPress={() => setMethod("email")}
              />
              <View style={styles.orRow}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>ou</Text>
                <View style={styles.orLine} />
              </View>
              <Button
                title="Continuer avec un e-mail"
                variant="secondary"
                onPress={() => setMethod("email")}
              />
              <Pressable onPress={() => setMethod("phone")}>
                <Text style={styles.authLink}>Continuer par téléphone</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                onPress={() => setMethod("choice")}
                style={styles.backToMethods}
              >
                <Icon name="chevron-left" size={16} />
                <Text style={styles.backToMethodsText}>
                  Toutes les méthodes
                </Text>
              </Pressable>
              {method === "phone" ? (
                <>
                  <Field
                    label="Numéro de téléphone"
                    onChangeText={setPhoneNumber}
                    placeholder="+1 514 000 0000"
                    value={phoneNumber}
                  />
                  {phoneConfirmation && (
                    <Field
                      label="Code reçu"
                      onChangeText={setCode}
                      placeholder="123456"
                      value={code}
                    />
                  )}
                  {authError && (
                    <Text style={styles.legalNote}>{authError}</Text>
                  )}
                  <Button
                    title={
                      phoneConfirmation
                        ? "Confirmer le code"
                        : "Recevoir un code"
                    }
                    onPress={() =>
                      void (phoneConfirmation
                        ? confirmPhoneCode(code)
                        : sendPhoneCode(phoneNumber))
                    }
                  />
                </>
              ) : (
                <>
                  <Field
                    label="Adresse e-mail"
                    placeholder="franck@email.com"
                  />
                  <Field label="Mot de passe" placeholder="••••••••" secure />
                  <Button title="Se connecter" onPress={() => go("home")} />
                </>
              )}
            </>
          )}
          <Pressable onPress={() => go("home")}>
            <Text style={styles.createAccount}>Créer un compte</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function LoginRoute() {
  const session = useUserStore((state) => state.session);
  const navigate = useScreenNavigation();
  const go = (screen: Screen) => {
    navigate(screen);
  };

  useEffect(() => {
    if (session) navigate("home");
  }, [navigate, session]);

  return <Login go={go} />;
}
