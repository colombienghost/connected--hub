import { create } from "zustand";

import { colors } from "@/design-system/tokens";
import { auth, db, serverTimestamp } from "@/lib/firebase";

export type Trip = {
  id: string;
  name: string;
  date: string;
  kg: string;
  price: string;
  rating: string;
  initials: string;
  avatarTone: string;
  from: string;
  to: string;
  authorId?: string;
};

const mockTrips: Trip[] = [
  {
    id: "sarah-m",
    name: "Sarah M.",
    date: "20 juin",
    kg: "23 kg disponibles",
    price: "85 $",
    rating: "4,9",
    initials: "SM",
    avatarTone: colors.avatarWarm,
    from: "Montréal",
    to: "Abidjan",
  },
  {
    id: "yann-k",
    name: "Yann K.",
    date: "22 juin",
    kg: "15 kg disponibles",
    price: "70 $",
    rating: "4,8",
    initials: "YK",
    avatarTone: colors.skyMap,
    from: "Montréal",
    to: "Abidjan",
  },
  {
    id: "mohamed-b",
    name: "Mohamed B.",
    date: "24 juin",
    kg: "30 kg disponibles",
    price: "95 $",
    rating: "4,9",
    initials: "MB",
    avatarTone: colors.gray,
    from: "Montréal",
    to: "Abidjan",
  },
];
const tones = [colors.avatarWarm, colors.skyMap, colors.gray];
const asString = (value: unknown, fallback: string) =>
  typeof value === "string" ? value : fallback;

function toTrip(
  id: string,
  data: Record<string, unknown>,
  index: number,
): Trip {
  const name = asString(data.authorName, "Voyageur CONNECTED");
  const capacityKg = typeof data.capacityKg === "number" ? data.capacityKg : 0;
  const priceCents = typeof data.priceCents === "number" ? data.priceCents : 0;
  const rating =
    typeof data.rating === "number"
      ? data.rating.toFixed(1).replace(".", ",")
      : "Nouveau";
  return {
    id,
    name,
    date: asString(data.departureDate, "Date à confirmer"),
    kg: `${capacityKg} kg disponibles`,
    price: `${Math.round(priceCents / 100)} $`,
    rating,
    initials: name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    avatarTone: tones[index % tones.length],
    from: asString(data.from, "Montréal"),
    to: asString(data.to, "Abidjan"),
    authorId: typeof data.authorId === "string" ? data.authorId : undefined,
  };
}

type TripsState = {
  trips: Trip[];
  selectedTripId: string;
  selectTrip: (id: string) => void;
  listenToTrips: () => () => void;
  publishTrip: (input: {
    from: string;
    to: string;
    date: string;
    capacityKg: string;
    price: string;
  }) => Promise<void>;
};

export const useTripsStore = create<TripsState>((set) => ({
  trips: mockTrips,
  selectedTripId: mockTrips[0].id,
  selectTrip: (id) => set({ selectedTripId: id }),
  listenToTrips: () => {
    if (!db || !auth?.currentUser) return () => undefined;
    return db
      .collection("trips")
      .where("status", "==", "published")
      .onSnapshot((snapshot: any) => {
        set({
          trips: snapshot.docs.map((document: any, index: number) =>
            toTrip(document.id, document.data(), index),
          ),
        });
      });
  },
  publishTrip: async (input) => {
    const user = auth?.currentUser;
    if (!db || !user) return;
    const price = Number(
      input.price.replace(/[^0-9.,]/g, "").replace(",", "."),
    );
    await db.collection("trips").add({
      authorId: user.uid,
      authorName: user.displayName ?? "Membre CONNECTED",
      from: input.from,
      to: input.to,
      departureDate: input.date,
      capacityKg: Number(input.capacityKg.replace(/[^0-9.]/g, "")),
      priceCents: Math.round(price * 100),
      rating: 0,
      status: "published",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  },
}));
