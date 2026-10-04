import { create } from "zustand";

import { auth, db, serverTimestamp } from "@/lib/firebase";

export type Conversation = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: string;
};
const mockConversations: Conversation[] = [
  {
    id: "sarah-m",
    name: "Sarah M.",
    preview: "Votre colis est bien pris en charge",
    time: "10:33",
    unread: "2",
  },
  {
    id: "awa-t",
    name: "Awa T.",
    preview: "J’ai encore 2 places disponibles",
    time: "Hier",
    unread: "",
  },
  {
    id: "ibrahim-k",
    name: "Ibrahim K.",
    preview: "Merci pour votre confiance",
    time: "Lun",
    unread: "1",
  },
];

type MessagesState = {
  conversations: Conversation[];
  messages: string[];
  activeConversationId: string;
  selectConversation: (id: string) => void;
  listenToConversations: () => () => void;
  listenToMessages: (id: string) => () => void;
  sendMessage: (message: string, recipientId?: string) => Promise<void>;
};

export const useMessagesStore = create<MessagesState>((set) => ({
  conversations: mockConversations,
  messages: [
    "Bonjour Franck, votre colis est bien pris en charge.",
    "Parfait, on se retrouve au terminal 1.",
  ],
  activeConversationId: mockConversations[0].id,
  selectConversation: (id) => set({ activeConversationId: id }),
  listenToConversations: () => {
    const user = auth?.currentUser;
    if (!db || !user) return () => undefined;
    return db
      .collection("messages")
      .where("participantIds", "array-contains", user.uid)
      .onSnapshot((snapshot: any) =>
        set({
          conversations: snapshot.docs.map((document: any) => {
            const data = document.data();
            return {
              id: document.id,
              name:
                typeof data.recipientName === "string"
                  ? data.recipientName
                  : "Conversation CONNECTED",
              preview:
                typeof data.lastMessage === "string" ? data.lastMessage : "",
              time: "",
              unread: "",
            };
          }),
        }),
      );
  },
  listenToMessages: (id) => {
    if (!db || !auth?.currentUser) return () => undefined;
    return db
      .collection("messages")
      .doc(id)
      .collection("items")
      .orderBy("createdAt")
      .onSnapshot((snapshot: any) =>
        set({
          messages: snapshot.docs.map((document: any) =>
            typeof document.data().body === "string"
              ? document.data().body
              : "",
          ),
        }),
      );
  },
  sendMessage: async (message, recipientId) => {
    const user = auth?.currentUser;
    const conversationId = useMessagesStore.getState().activeConversationId;
    if (!message.trim() || !db || !user || !recipientId) return;
    const conversation = db.collection("messages").doc(conversationId);
    await conversation.set(
      {
        participantIds: [user.uid, recipientId],
        recipientName: "Voyageur CONNECTED",
        lastMessage: message.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    await conversation.collection("items").add({
      senderId: user.uid,
      body: message.trim(),
      createdAt: serverTimestamp(),
    });
  },
}));
