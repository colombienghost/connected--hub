import { create } from 'zustand';

type Shipment = {
  id: string;
  route: string;
  status: string;
};

type ShipmentsState = {
  shipments: Shipment[];
};

export const useShipmentsStore = create<ShipmentsState>(() => ({
  shipments: [{ id: 'CNCT-7821', route: 'Montréal → Abidjan', status: 'En route' }],
}));
