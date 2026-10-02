import { Pressable, Text, TextInput, View } from 'react-native';

import { Button, Card, Screen, ScreenFrame, Trip } from './components';
import { Icon } from './icons';
import { colors } from './tokens';
import { styles } from './screen-styles';

export function Field({ label, placeholder, value, onChangeText, secure = false }: { label: string; placeholder: string; value?: string; onChangeText?: (value: string) => void; secure?: boolean }) {
  return <View style={styles.fieldGroup}><Text style={styles.label}>{label}</Text><TextInput accessibilityLabel={label} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colors.textTertiary} secureTextEntry={secure} style={styles.input} value={value} /></View>;
}

export function SectionTitle({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{title}</Text>{action && onPress && <Pressable accessibilityRole="button" onPress={onPress}><Text style={styles.link}>{action}</Text></Pressable>}</View>;
}

export function SearchSummary({ onPress }: { onPress: () => void }) {
  return <Card onPress={onPress} style={styles.searchSummary}><View style={styles.searchIcon}><Icon color={colors.white} name="plane" size={23} /></View><View style={styles.searchCopy}><Text style={styles.searchRoute}>Montréal → Abidjan</Text><View style={styles.searchMeta}><Icon color={colors.textMuted} name="calendar" size={16} /><Text style={styles.meta}>20 juin</Text><Text style={styles.meta}>·</Text><Icon color={colors.textMuted} name="weight" size={16} /><Text style={styles.meta}>12 kg</Text></View></View><View style={styles.modifyPill}><Text style={styles.modifyText}>Modifier</Text></View></Card>;
}

export function Detail({ label, value }: { label: string; value: string }) { return <View style={styles.detail}><Text style={styles.meta}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>; }

export function Success({ go, published = false }: { go: (screen: Screen) => void; published?: boolean }) {
  return <ScreenFrame go={go} title={published ? 'C’est publié' : 'Réservation confirmée'}><View style={styles.successPage}><View style={styles.successMark}><Icon color={colors.navy} name="check" size={44} strokeWidth={2.5} /></View><Text style={styles.successTitle}>{published ? 'Votre trajet est en ligne' : 'C’est confirmé !'}</Text><Text style={styles.displayBody}>{published ? 'Vous serez notifié dès qu’une demande compatible est proposée.' : 'Votre réservation Montréal → Abidjan est enregistrée sous la référence CNCT-7821.'}</Text><Button title={published ? 'Voir mes annonces' : 'Voir mon envoi'} onPress={() => go(published ? 'profile' : 'tracking')} />{!published && <Button title="Retour à l’accueil" variant="outline" onPress={() => go('home')} />}</View></ScreenFrame>;
}
