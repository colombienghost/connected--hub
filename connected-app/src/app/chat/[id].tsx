import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Text, TextInput } from "@/design-system/text";

import { Button, Card, Screen, ScreenFrame } from "@/design-system/components";
import { Icon, IconName } from "@/design-system/icons";
import { useScreenNavigation } from "@/design-system/screen-navigation";
import { styles } from "@/design-system/screen-styles";
import { colors } from "@/design-system/tokens";
import { useMessagesStore } from "@/stores/messages";

function Chat({ go }: { go: (screen: Screen) => void }) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [draft, setDraft] = useState("");
  const messages = useMessagesStore((state) => state.messages);
  const conversations = useMessagesStore((state) => state.conversations);
  const selectConversation = useMessagesStore(
    (state) => state.selectConversation,
  );
  const listenToMessages = useMessagesStore((state) => state.listenToMessages);
  const sendMessage = useMessagesStore((state) => state.sendMessage);
  const conversation =
    conversations.find((item) => item.id === id) ?? conversations[0];
  useEffect(() => {
    selectConversation(conversation.id);
    return listenToMessages(conversation.id);
  }, [conversation.id, listenToMessages, selectConversation]);
  const timelineIcons: IconName[] = ["check", "check", "plane", "clock"];
  return (
    <ScreenFrame active="messages" go={go} showNav title={conversation.name}>
      <Card style={styles.contextCard}>
        <View style={styles.contextTop}>
          <View>
            <Text style={styles.contextRef}>CNCT-7821</Text>
            <Text style={styles.meta}>12 kg · Montréal → Abidjan</Text>
          </View>
          <Button compact title="Suivi" onPress={() => go("tracking")} />
        </View>
        <View style={styles.miniTimeline}>
          <View style={styles.miniLine} />
          {timelineIcons.map((item, index) => (
            <View
              key={`${item}-${index}`}
              style={[styles.miniDot, index < 3 && styles.miniDotOn]}
            >
              <Icon
                color={index < 3 ? colors.white : colors.textTertiary}
                name={item}
                size={16}
              />
            </View>
          ))}
        </View>
      </Card>
      <View style={styles.chatBody}>
        {messages.map((message, index) => (
          <View
            key={`${message}-${index}`}
            style={[styles.bubble, index % 2 === 1 && styles.bubbleMine]}
          >
            <Text
              style={[
                styles.bubbleText,
                index % 2 === 1 && styles.bubbleTextMine,
              ]}
            >
              {message}
            </Text>
            <Text style={styles.bubbleTime}>10:3{index}</Text>
          </View>
        ))}
        <Card style={styles.handover}>
          <Icon name="card" size={20} />
          <View style={styles.flex}>
            <Text style={styles.cardTitle}>Code de remise</Text>
            <Text style={styles.meta}>À montrer à la livraison</Text>
          </View>
          <Text style={styles.handoverCode}>•• 48</Text>
        </Card>
      </View>
      <View style={styles.composer}>
        <TextInput
          onChangeText={setDraft}
          placeholder="Message à Sarah"
          placeholderTextColor={colors.textTertiary}
          style={styles.composerInput}
          value={draft}
        />
        <Pressable
          accessibilityLabel="Envoyer"
          onPress={() => {
            if (draft.trim()) {
              void sendMessage(draft.trim(), conversation.id);
              setDraft("");
            }
          }}
          style={styles.sendButton}
        >
          <Icon name="chevron-right" size={20} />
        </Pressable>
      </View>
    </ScreenFrame>
  );
}

export default function ChatRoute() {
  const go = useScreenNavigation();
  return <Chat go={go} />;
}
