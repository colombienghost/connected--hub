# CONNECTED — Pack maître de design et prototype

## 1. Objet du projet

CONNECTED est une application peer-to-peer qui met en relation :

- des expéditeurs qui souhaitent envoyer un colis ;
- des voyageurs/convoyeurs qui disposent de capacité disponible dans leurs bagages.

Promesse : **envoyer moins cher avec des voyageurs vérifiés**.

Le projet est confidentiel. Ce document sert de référence unique pour reprendre le design et transformer le prototype en MVP fonctionnel avec Codex ou Lovable.

## 2. Ordre officiel des livrables

### A. Branding

Le dossier `connected-design-pack/01-branding/` contient :

- `connected-brand-board.png` — planche de marque principale ;
- `connected-ui-kit.png` — composants et écrans de référence ;
- `connected-social-system.png` — système de communication sociale ;
- `connected-brand-guidelines.md` — règles complètes d’identité.

### B. Onboarding — 6 étapes validées

Le dossier `connected-design-pack/02-onboarding/` contient les écrans dans l’ordre :

1. Nom complet ;
2. Pays — Canada ;
3. Choix du rôle — Expéditeur / Convoyeur ;
4. Numéro de téléphone ;
5. Vérification d’identité ;
6. Finalisation — `Bienvenue dans CONNECTED`.

L’écran 6 est la référence finale : indicateur `6 sur 6`, boutons `Expéditeur` et `Canada`, statut `Profil créé`, CTA `Découvrir CONNECTED`.

### C. Authentification

Le dossier `connected-design-pack/03-auth/` contient les variantes validées :

- écran d’accès principal ;
- connexion par téléphone ;
- connexion par courriel.

### D. Écrans de l’application

Le dossier `connected-design-pack/04-app-screens/` suit l’ordre du produit :

1. **Accueil** — S2, header discret et encoche compacte ;
2. **Trajets** — marketplace TRJ1, détail TRJ2, publication convoyeur TRJ3 ;
3. **Envoyer un colis** — type de colis, poids/volume, recherche guidée, résultats compatibles, meilleur trajet, résumé de réservation ;
4. **Suivi** — T3, carte compacte + timeline + message + détails de remise ;
5. **Messages** — MGS3, conversation liée à un envoi avec contexte et actions ;
6. **Profil** — PRF1, tableau de bord principal.

## 3. Direction visuelle verrouillée

### Palette

| Usage | Couleur |
|---|---|
| Navy primaire | `#06254F` |
| Blanc chaud | `#FAFBFD` |
| Ambre d’action | `#FFB000` |
| Bleu ciel doux | `#D6E8F7` |
| Gris froid | `#E9EDF3` |
| Charbon | `#101820` |

Répartition indicative : 60 % blanc chaud, 25 % navy, 10 % bleu ciel/gris, 5 % ambre.

### Logo

Le symbole associe une valise et un avion. Il doit rester simple, mémorisable et lisible en petit format.

- logo complet `CONNECTED` : onboarding, accueil et réseaux sociaux ;
- pictogramme seul : icône, splash screen, favicon et écrans internes si nécessaire ;
- version navy sur blanc chaud ;
- version blanche sur navy ;
- version navy sur ambre uniquement pour les accents ou campagnes.

Ne pas déformer le symbole, ajouter de détails à l’avion, utiliser un fond chargé ou réintroduire une ancienne marque.

### UI

- style : **Liquid Glass premium fonctionnel**, base claire ;
- surfaces vitrées semi-opaques : environ 70–85 % ;
- flou modéré et bordure fine ;
- contraste cible minimum : 4,5:1 ;
- typographie d’interface : sans-serif moderne proche d’Inter ;
- titres marketing : serif/display premium proche de Playfair Display ;
- cartes blanches sur fond blanc chaud ;
- headers navy ;
- CTA principal ambre ;
- badges de confiance bleu ciel ;
- ne jamais coder une information uniquement par la couleur.

### Navigation

Navigation principale : `Accueil / Trajets / bouton central / Messages / Profil`.

- aucun onglet `Envois` ;
- aucun onglet `Voyages` ;
- aucun onglet `Suivi` dans la barre basse ;
- le bouton central sert à `Publier un voyage` ;
- encoche très serrée autour du bouton : environ 1/4 du bouton de chaque côté, soit 2/4 au total ;
- le bouton doit sembler intégré à la barre, jamais posé dans un grand vide.

## 4. Parcours fonctionnel prioritaire

```text
Inscription → choix du rôle → accueil → créer un colis ou publier un trajet
→ recherche → sélection du convoyeur → réservation → paiement protégé
→ conversation liée → dépôt → suivi → remise avec preuve → évaluation
```

### Rôles

- **Expéditeur** : crée un colis, recherche un trajet, réserve, paie, échange et suit la livraison.
- **Convoyeur** : publie un trajet, indique sa capacité en kilogrammes, reçoit une demande, accepte/refuse, transporte et confirme la remise.

## 5. Écrans officiellement retenus

| Zone | Référence officielle | Rôle |
|---|---|---|
| Accueil | S2 clean notch | point d’entrée expéditeur |
| Trajets | TRJ1 tight notch | marketplace des trajets |
| Détail trajet | TRJ2 tight notch | confiance et réservation |
| Publier voyage | TRJ3 tight notch | parcours convoyeur |
| Envoi | SND1 + logique SND2 | création guidée du colis |
| Recherche | SND4C → SND4A, avec SND4B mis en avant | date, résultats, meilleur match |
| Réservation | SND5C | synthèse avant paiement |
| Suivi | T3 balanced | carte + timeline + actions |
| Messages | MGS3 tight notch | chat rattaché au colis |
| Profil | PRF1 | tableau de bord utilisateur |

## 6. Point exact d’arrêt du prototype

Le fichier `connected-design-pack/05-prototype/connected-prototype-v2.html` est la base fonctionnelle actuelle.

Le flux atteint l’écran **Expédier un colis** avec :

- poids ;
- dimensions ;
- description ;
- valeur déclarée : `100 $ CAD` ;
- total estimé : `60 $ CAD` ;
- CTA : `Continuer vers le paiement`.

Le prototype est interactif mais ses données restent simulées. Les prochaines tâches techniques sont de connecter l’état global utilisateur/trajet/colis/réservation, puis de remplacer progressivement les anciennes vues par les références de ce pack.

## 7. Règles d’intégration technique

1. Utiliser les images de ce pack comme références officielles, pas les anciennes maquettes.
2. Supprimer toute trace des anciens libellés `Envois`, `Voyages` et de l’ancien onboarding en 4 étapes.
3. Conserver les mêmes données d’exemple pour les tests : Sarah M., Montréal → Abidjan, colis `CNCT-7821`, 12 kg.
4. Relier chaque conversation à un trajet ou à un colis identifiable.
5. Garder le suivi accessible depuis `Suivre`, une carte d’envoi actif et l’historique du profil.
6. Prévoir les statuts : créé, confirmé, remis au convoyeur, en route, arrivé, en cours de livraison, livré.
7. Prévoir vérification d’identité, paiement protégé, preuve de dépôt, preuve de remise et évaluation.
8. Pour chaque nouvel écran non encore validé, produire 3 alternatives distinctes avant décision.

## 8. Arborescence

```text
connected-design-pack/
├── 01-branding/
├── 02-onboarding/
├── 03-auth/
├── 04-app-screens/
│   ├── 01-home/
│   ├── 02-trajets/
│   ├── 03-send/
│   ├── 04-tracking/
│   ├── 05-messages/
│   └── 06-profile/
└── 05-prototype/
```

## 9. Instruction de reprise

> Analyse `CONNECTED_MASTER_SUMMARY.md` et tout le dossier `connected-design-pack`. Utilise uniquement les références officielles présentes dans ce pack. Audite `connected-prototype-v2.html`, supprime les anciennes traces de navigation et d’onboarding, puis transforme le parcours expéditeur et convoyeur en prototype fonctionnel cohérent. Respecte strictement la palette, le logo valise + avion, le style Liquid Glass clair, la navigation `Accueil / Trajets / Messages / Profil`, l’encoche compacte et les écrans officiels indiqués ci-dessus.
