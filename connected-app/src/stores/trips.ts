import { create } from 'zustand';

import { colors } from '@/design-system/tokens';

export type Trip = {
  id: string;
  name: string;
  date: string;
  kg: string;
  price: string;
  rating: string;
  initials: string;
  avatarTone: string;
};

type TripsState = {
  trips: Trip[];
};

export const useTripsStore = create<TripsState>(() => ({
  trips: [
    { id: 'sarah-m', name: 'Sarah M.', date: '20 juin', kg: '23 kg disponibles', price: '85 $', rating: '4,9', initials: 'SM', avatarTone: colors.avatarWarm },
    { id: 'yann-k', name: 'Yann K.', date: '22 juin', kg: '15 kg disponibles', price: '70 $', rating: '4,8', initials: 'YK', avatarTone: colors.skyMap },
    { id: 'mohamed-b', name: 'Mohamed B.', date: '24 juin', kg: '30 kg disponibles', price: '95 $', rating: '4,9', initials: 'MB', avatarTone: colors.gray },
  ],
}));
