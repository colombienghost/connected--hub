# CONNECTED

CONNECTED est une application P2P qui met en relation des expediteurs de colis avec des voyageurs disposant d'espace dans leurs bagages. Elle permet de rechercher un trajet, reserver une capacite et suivre l'acheminement d'un envoi.

L'application est construite avec Expo SDK 57, React Native et Expo Router.

## Demarrage

```bash
npm install
npx expo start
```

Depuis le terminal Expo, ouvrez ensuite l'application avec Expo Go, un emulateur Android, le simulateur iOS ou le navigateur web.

Pour lancer les controles de code :

```bash
npx expo lint
```

## Structure

```text
src/
  app/            Routes et ecrans Expo Router
  design-system/  Composants et jetons visuels CONNECTED
assets/           Icones, images et ressources de l'application
global.css        Styles web globaux
```

## Firebase

Le projet Firebase CONNECTED utilise Firestore Standard dans `northamerica-northeast1` (Montréal) et l'authentification par téléphone. Les règles prototype se trouvent dans `firestore.rules` et ne sont pas déployées automatiquement.

L'OTP nécessite un dev build natif : `npx expo run:android` pour Android. Expo Go reste disponible pour le visuel et les données de démonstration, mais ne charge pas les modules Firebase natifs. `google-services.json` est une configuration locale Android, volontairement exclue de Git. Storage est différé : Firebase exige actuellement le plan Blaze, alors que le projet reste sur Spark.
