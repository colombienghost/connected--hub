import { Text, View } from 'react-native';

import { Button, Card, Screen, ScreenFrame, VerifiedBadge } from '@/design-system/components';
import { useScreenNavigation } from '@/design-system/screen-navigation';
import { styles } from '@/design-system/screen-styles';

function Tracking({ go }: { go: (screen: Screen) => void }) {
  const events = [['Réservé', '18 juin\n08:30'], ['Remis', '20 juin\n12:45'], ['En route', '21 juin\n09:15'], ['Livré', '—']];
  return <ScreenFrame go={go} title="Envoi actif"><Card style={styles.trackingHero}><View style={styles.trackingTop}><View><Text style={styles.pageTitle}>Montréal → Abidjan</Text><Text style={styles.trackingRef}>CNCT-7821</Text></View><View><View style={styles.statusPill}><Text style={styles.statusText}>En route</Text></View><Text style={styles.arrival}>Arrivée{'\n'}21 juin</Text></View></View><View style={styles.map}><Text style={styles.mapCode}>YUL</Text><View style={styles.mapRoute}><View style={styles.mapDash} /><View style={styles.mapPlane}><Text style={styles.mapPlaneText}>✈</Text></View><View style={styles.mapDash} /></View><Text style={styles.mapCode}>ABJ</Text></View></Card><Card><View style={styles.timeline}>{events.map(([label, time], index) => <View key={label} style={styles.timelineItem}><View style={[styles.timelineDot, index < 3 && styles.timelineDotOn]}><Text style={[styles.timelineDotText, index < 3 && styles.timelineDotTextOn]}>{index < 3 ? (index === 2 ? '✈' : '✓') : '○'}</Text></View><Text style={styles.timelineLabel}>{label}</Text><Text style={styles.timelineTime}>{time}</Text></View>)}</View></Card><Card style={styles.travelerRow}><View style={[styles.largeAvatar, styles.mediumAvatar]}><Text style={styles.avatarText}>SM</Text></View><View style={styles.flex}><View style={styles.inline}><Text style={styles.cardTitle}>Sarah M.</Text><VerifiedBadge /></View><Text style={styles.meta}>Dernière mise à jour · Aéroport de Montréal</Text></View><Button compact title="Message" onPress={() => go('chat')} /></Card><View style={styles.infoTiles}>{[['▱', 'Poids', '12 kg'], ['□', 'Contenu', 'Vêtements'], ['⌂', 'Remise', 'Terminal 1'], ['▦', 'Code QR', 'Afficher ›']].map(([icon, label, value]) => <Card key={label} style={styles.infoTile}><Text style={styles.tileIcon}>{icon}</Text><View><Text style={styles.meta}>{label}</Text><Text style={styles.cardTitle}>{value}</Text></View></Card>)}</View></ScreenFrame>;
}

export default function TrackingRoute() {
  const go = useScreenNavigation();
  return <Tracking go={go} />;
}
