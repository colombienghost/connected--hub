import { Text, View } from 'react-native';

import { Card, Screen, ScreenFrame } from '@/design-system/components';
import { Icon, IconName } from '@/design-system/icons';
import { SectionTitle } from '@/design-system/screen-components';
import { useScreenNavigation } from '@/design-system/screen-navigation';
import { styles } from '@/design-system/screen-styles';

function Notifications({ go }: { go: (screen: Screen) => void }) { const notifications: { icon: IconName; title: string; copy: string }[] = [{ icon: 'check', title: 'Réservation confirmée', copy: 'Montréal → Abidjan' }, { icon: 'chat', title: 'Sarah M. vous a envoyé un message', copy: 'On se retrouve au terminal 1' }, { icon: 'plane', title: 'Nouveau convoyeur disponible', copy: '18 kg sur Montréal → Abidjan' }]; return <ScreenFrame go={go} title="Notifications"><SectionTitle title="Aujourd’hui" />{notifications.map(({ icon, title, copy }) => <Card key={title} onPress={() => go(title.includes('message') ? 'chat' : 'tracking')} style={styles.notification}><View style={styles.settingIcon}><Icon name={icon} size={20} /></View><View style={styles.flex}><Text style={styles.cardTitle}>{title}</Text><Text style={styles.meta}>{copy}</Text></View></Card>)}</ScreenFrame>; }

export default function NotificationsRoute() {
  const go = useScreenNavigation();
  return <Notifications go={go} />;
}
