import { Text, View } from 'react-native';

import { Card, Screen, ScreenFrame } from '@/design-system/components';
import { SectionTitle } from '@/design-system/screen-components';
import { useScreenNavigation } from '@/design-system/screen-navigation';
import { styles } from '@/design-system/screen-styles';

function Notifications({ go }: { go: (screen: Screen) => void }) { return <ScreenFrame go={go} title="Notifications"><SectionTitle title="Aujourd’hui" />{[['✓', 'Réservation confirmée', 'Montréal → Abidjan'], ['◌', 'Sarah M. vous a envoyé un message', 'On se retrouve au terminal 1'], ['✈', 'Nouveau convoyeur disponible', '18 kg sur Montréal → Abidjan']].map(([icon, title, copy]) => <Card key={title} onPress={() => go(title.includes('message') ? 'chat' : 'tracking')} style={styles.notification}><View style={styles.settingIcon}><Text style={styles.settingGlyph}>{icon}</Text></View><View style={styles.flex}><Text style={styles.cardTitle}>{title}</Text><Text style={styles.meta}>{copy}</Text></View></Card>)}</ScreenFrame>; }

export default function NotificationsRoute() {
  const go = useScreenNavigation();
  return <Notifications go={go} />;
}
