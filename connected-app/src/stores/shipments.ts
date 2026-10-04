import { create } from "zustand";

import { auth, db, serverTimestamp } from "@/lib/firebase";

export type Shipment = {
  id: string;
  route: string;
  status: string;
  tripId?: string;
};
const mockShipments: Shipment[] = [
  {
    id: "CNCT-7821",
    route: "Montréal → Abidjan",
    status: "En route",
    tripId: "sarah-m",
  },
];

type ShipmentsState = {
  shipments: Shipment[];
  activeShipmentId: string;
  setActiveShipment: (id: string) => void;
  listenToShipments: () => () => void;
  createShipment: (tripId: string) => Promise<string>;
};

export const useShipmentsStore = create<ShipmentsState>((set) => ({
  shipments: mockShipments,
  activeShipmentId: mockShipments[0].id,
  setActiveShipment: (id) => set({ activeShipmentId: id }),
  listenToShipments: () => {
    const user = auth?.currentUser;
    if (!db || !user) return () => undefined;
    return db
      .collection("parcels")
      .where("senderId", "==", user.uid)
      .onSnapshot((snapshot: any) =>
        set({
          shipments: snapshot.docs.map((document: any) => {
            const data = document.data();
            return {
              id: document.id,
              route: `${data.from ?? "Montréal"} → ${data.to ?? "Abidjan"}`,
              status: typeof data.status === "string" ? data.status : "Réservé",
              tripId: typeof data.tripId === "string" ? data.tripId : undefined,
            };
          }),
        }),
      );
  },
  createShipment: async (tripId): Promise<string> => {
    const user = auth?.currentUser;
    if (!db || !user) return useShipmentsStore.getState().activeShipmentId;
    const parcel = db.collection("parcels").doc();
    const booking = db.collection("bookings").doc();
    const batch = db.batch();
    batch.set(parcel, {
      senderId: user.uid,
      tripId,
      bookingId: booking.id,
      reference: `CNCT-${parcel.id.slice(0, 6).toUpperCase()}`,
      from: "Montréal",
      to: "Abidjan",
      contentType: "Vêtements",
      weightKg: 12,
      dimensions: { length: 0, width: 0, height: 0 },
      description: "",
      declaredValueCents: 10000,
      status: "reserved",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    batch.set(booking, {
      senderId: user.uid,
      travelerId: "",
      parcelId: parcel.id,
      tripId,
      status: "reserved",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    await batch.commit();
    set({ activeShipmentId: parcel.id });
    return parcel.id;
  },
}));
