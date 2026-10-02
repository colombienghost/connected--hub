import { create } from 'zustand';

type Conversation = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: string;
};

type MessagesState = {
  conversations: Conversation[];
  messages: string[];
  addMessage: (message: string) => void;
};

export const useMessagesStore = create<MessagesState>((set) => ({
  conversations: [
    { id: 'sarah-m', name: 'Sarah M.', preview: 'Votre colis est bien pris en charge', time: '10:33', unread: '2' },
    { id: 'awa-t', name: 'Awa T.', preview: 'J’ai encore 2 places disponibles', time: 'Hier', unread: '' },
    { id: 'ibrahim-k', name: 'Ibrahim K.', preview: 'Merci pour votre confiance', time: 'Lun', unread: '1' },
  ],
  messages: ['Bonjour Franck, votre colis est bien pris en charge.', 'Parfait, on se retrouve au terminal 1.'],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
