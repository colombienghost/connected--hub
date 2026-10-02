import { Text, View } from 'react-native';

import { Card, Screen, ScreenFrame } from '@/design-system/components';
import { useScreenNavigation } from '@/design-system/screen-navigation';
import { styles } from '@/design-system/screen-styles';
import { useMessagesStore } from '@/stores/messages';

function Messages({ go }: { go: (screen: Screen) => void }) {
  const store = useMessagesStore();

  const conversations = store.conversations.map(({ name, preview, time, unread }) => [name, preview, time, unread]);
  return <ScreenFrame active="messages" go={go} title="Messages"><View style={styles.searchField}><Text style={styles.searchGlyph}>⌕</Text><Text style={styles.searchPlaceholder}>Rechercher une conversation</Text></View>{conversations.map(([name, message, time, unread]) => <Card key={name} onPress={() => go('chat')} style={styles.conversation}><View style={styles.conversationAvatar}><Text style={styles.avatarText}>{name.split(' ').map((part) => part[0]).join('')}</Text></View><View style={styles.flex}><Text style={styles.cardTitle}>{name}</Text><Text numberOfLines={1} style={styles.meta}>{message}</Text></View><View style={styles.conversationEnd}><Text style={styles.meta}>{time}</Text>{unread && <View style={styles.unread}><Text style={styles.unreadText}>{unread}</Text></View>}</View></Card>)}</ScreenFrame>;
}

export default function MessagesRoute() {
  const go = useScreenNavigation();
  return <Messages go={go} />;
}
