export type UnitType = "bungalow_dry_toilet" | "room_standard_toilet";

export type AccommodationUnit = {
  id: string;
  name: string;
  type: UnitType;
  capacity: number;
  nightlyRateDh: number;
};

export type ReservationChannel = "airbnb" | "booking" | "direct";

export type Reservation = {
  id: string;
  guestName: string;
  channel: ReservationChannel;
  unitId: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  status: "confirmed" | "pending" | "checked_in" | "checked_out";
};

export type AccommodationContent = {
  slug: string;
  unitId: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  amenities: string[];
  images: string[];
};

export type InvoiceStatus = "draft" | "sent" | "partial" | "paid";

export type Invoice = {
  id: string;
  clientName: string;
  reservationId: string;
  amountDh: number;
  status: InvoiceStatus;
  createdAt: string;
  dueAt?: string;
  paidAmountDh?: number;
};

export type ClientAccount = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  language: "fr" | "en" | "ar";
  notes: string;
  staysCount: number;
  sourceChannel: ReservationChannel;
  totalSpentDh: number;
  lastStayDate: string;
  dietaryPreferences?: string;
};

export type QuoteStatus = "draft" | "sent" | "accepted" | "expired";

export type Quote = {
  id: string;
  clientName: string;
  reservationId: string;
  amountDh: number;
  status: QuoteStatus;
  validUntil: string;
  createdAt: string;
};

export type StockItem = {
  id: string;
  name: string;
  unit: string;
  currentQty: number;
  minQty: number;
  category: "kitchen" | "cleaning" | "maintenance";
};

export type StockNeed = {
  itemId: string;
  itemName: string;
  requiredQty: number;
  unit: string;
  currentQty: number;
  missingQty: number;
};

export type MealPlanDay = {
  date: string;
  breakfastCovers: number;
  lunchCovers: number;
  dinnerCovers: number;
};

export type OpsTask = {
  id: string;
  date: string;
  label: string;
  assignee: string;
  status: "todo" | "in_progress" | "done";
  category: "housekeeping" | "checkin" | "maintenance" | "shopping";
};

export type MessageTemplate = {
  id: string;
  key: "directions" | "check_in" | "check_out" | "faq" | "review_request";
  label: string;
  body: string;
};

export const units: AccommodationUnit[] = [
  { id: "bungalow-chronos", name: "Bungalow Chronos", type: "bungalow_dry_toilet", capacity: 4, nightlyRateDh: 850 },
  { id: "bungalow-atlas", name: "Bungalow Atlas", type: "bungalow_dry_toilet", capacity: 3, nightlyRateDh: 850 },
  { id: "bungalow-oasis", name: "Bungalow Oasis", type: "bungalow_dry_toilet", capacity: 5, nightlyRateDh: 1200 },
  { id: "bungalow-nomade", name: "Bungalow Nomade", type: "bungalow_dry_toilet", capacity: 3, nightlyRateDh: 850 },
  { id: "room-ocre", name: "Chambre Ocre", type: "room_standard_toilet", capacity: 2, nightlyRateDh: 700 },
  { id: "room-africaine", name: "Chambre Africaine", type: "room_standard_toilet", capacity: 2, nightlyRateDh: 700 },
  { id: "room-jardin", name: "Chambre Jardin", type: "room_standard_toilet", capacity: 2, nightlyRateDh: 700 },
  { id: "room-colline", name: "Chambre Colline", type: "room_standard_toilet", capacity: 2, nightlyRateDh: 700 },
];

export const reservations: Reservation[] = [
  {
    id: "res-001",
    guestName: "Emma Laurent",
    channel: "airbnb",
    unitId: "bungalow-oasis",
    checkIn: "2026-04-24",
    checkOut: "2026-04-27",
    guestsCount: 4,
    status: "confirmed",
  },
  {
    id: "res-002",
    guestName: "Youssef Martin",
    channel: "direct",
    unitId: "room-ocre",
    checkIn: "2026-04-23",
    checkOut: "2026-04-25",
    guestsCount: 2,
    status: "pending",
  },
];

export const invoices: Invoice[] = [
  {
    id: "inv-1001",
    clientName: "Emma Laurent",
    reservationId: "res-001",
    amountDh: 3600,
    status: "sent",
    createdAt: "2026-04-20",
    dueAt: "2026-04-24",
    paidAmountDh: 0,
  },
  {
    id: "inv-1002",
    clientName: "Youssef Martin",
    reservationId: "res-002",
    amountDh: 1400,
    status: "partial",
    createdAt: "2026-04-21",
    dueAt: "2026-04-23",
    paidAmountDh: 700,
  },
];

export const quotes: Quote[] = [
  {
    id: "q-2001",
    clientName: "Claire Dubois",
    reservationId: "res-002",
    amountDh: 2800,
    status: "sent",
    validUntil: "2026-04-28",
    createdAt: "2026-04-22",
  },
];

export const clients: ClientAccount[] = [
  {
    id: "cli-001",
    fullName: "Emma Laurent",
    email: "emma@example.com",
    phone: "+212600000001",
    language: "fr",
    notes: "Aime les repas vegetariens.",
    staysCount: 2,
    sourceChannel: "airbnb",
    totalSpentDh: 7200,
    lastStayDate: "2026-03-18",
    dietaryPreferences: "Vegetarien",
  },
  {
    id: "cli-002",
    fullName: "Youssef Martin",
    email: "youssef@example.com",
    phone: "+212600000002",
    language: "fr",
    notes: "Arrive tard le soir, check-in autonome prefere.",
    staysCount: 1,
    sourceChannel: "direct",
    totalSpentDh: 1400,
    lastStayDate: "2026-04-03",
    dietaryPreferences: "Sans preference",
  },
];

export const stockItems: StockItem[] = [
  { id: "stk-1", name: "Huile d'olive", unit: "L", currentQty: 3, minQty: 5, category: "kitchen" },
  { id: "stk-2", name: "Farine", unit: "kg", currentQty: 10, minQty: 6, category: "kitchen" },
  { id: "stk-3", name: "Produit vaisselle", unit: "L", currentQty: 1, minQty: 3, category: "cleaning" },
];

export const mealPlanWeek: MealPlanDay[] = [
  { date: "2026-04-23", breakfastCovers: 8, lunchCovers: 12, dinnerCovers: 10 },
  { date: "2026-04-24", breakfastCovers: 10, lunchCovers: 14, dinnerCovers: 12 },
];

export const operationsTasks: OpsTask[] = [
  {
    id: "task-1",
    date: "2026-04-23",
    label: "Check-in Chambre Ocre",
    assignee: "Laurent",
    status: "todo",
    category: "checkin",
  },
  {
    id: "task-2",
    date: "2026-04-23",
    label: "Courses legumes hebdo",
    assignee: "Fatima",
    status: "in_progress",
    category: "shopping",
  },
  {
    id: "task-3",
    date: "2026-04-24",
    label: "Menage Bungalow Oasis",
    assignee: "Khadija",
    status: "todo",
    category: "housekeeping",
  },
];

const stockNeedPerGuest: Record<string, { itemId: string; qty: number }[]> = {
  breakfast: [
    { itemId: "stk-1", qty: 0.03 },
    { itemId: "stk-2", qty: 0.08 },
  ],
  lunch: [
    { itemId: "stk-1", qty: 0.02 },
    { itemId: "stk-2", qty: 0.12 },
  ],
  dinner: [
    { itemId: "stk-1", qty: 0.04 },
    { itemId: "stk-2", qty: 0.06 },
  ],
};

export function computeWeeklyStockNeeds(): StockNeed[] {
  const totalGuests = mealPlanWeek.reduce(
    (acc, day) => acc + day.breakfastCovers + day.lunchCovers + day.dinnerCovers,
    0,
  );
  const factor = totalGuests / 3;
  const requiredByItem = new Map<string, number>();

  Object.values(stockNeedPerGuest).forEach((entries) => {
    entries.forEach((entry) => {
      requiredByItem.set(entry.itemId, (requiredByItem.get(entry.itemId) ?? 0) + entry.qty * factor);
    });
  });

  return stockItems.map((item) => {
    const requiredQty = Number((requiredByItem.get(item.id) ?? 0).toFixed(2));
    const missingQty = Number(Math.max(0, requiredQty - item.currentQty).toFixed(2));
    return {
      itemId: item.id,
      itemName: item.name,
      requiredQty,
      unit: item.unit,
      currentQty: item.currentQty,
      missingQty,
    };
  });
}

export function computeReservationDemandHorizon(days = 7) {
  const now = new Date("2026-04-22");
  const end = new Date(now);
  end.setDate(end.getDate() + days);

  const upcomingGuests = reservations
    .filter((reservation) => {
      const checkIn = new Date(reservation.checkIn);
      return checkIn >= now && checkIn <= end;
    })
    .reduce((sum, reservation) => sum + reservation.guestsCount, 0);

  return {
    days,
    upcomingGuests,
    estimatedBreakfasts: upcomingGuests,
    estimatedLunches: Math.round(upcomingGuests * 0.8),
    estimatedDinners: Math.round(upcomingGuests * 0.9),
  };
}

export const accommodations: AccommodationContent[] = [
  {
    slug: "bungalow-chronos",
    unitId: "bungalow-chronos",
    title: "Bungalow Chronos",
    shortDescription: "Bungalow familial en terre crue avec vue nature.",
    longDescription:
      "Un bungalow spacieux ideal pour les familles, construit avec des materiaux naturels et une ventilation passive adaptee au climat.",
    amenities: ["Toilettes seches", "Terrasse", "Lits familiaux", "Vue collines"],
    images: ["/images/piscine-bungalows-oulad-chmicha.jpg"],
  },
  {
    slug: "bungalow-atlas",
    unitId: "bungalow-atlas",
    title: "Bungalow Atlas",
    shortDescription: "Confort et simplicite pour un sejour ressourcant.",
    longDescription:
      "Bungalow cosy au coeur de la ferme, parfait pour deconnecter et vivre une experience authentique.",
    amenities: ["Toilettes seches", "Coin salon", "Wifi", "Vue jardin"],
    images: ["/images/piscine-collines-oulad-chmicha.jpg"],
  },
  {
    slug: "bungalow-oasis",
    unitId: "bungalow-oasis",
    title: "Bungalow Oasis",
    shortDescription: "Le plus grand bungalow, ideal pour groupe ou famille.",
    longDescription:
      "Grand espace interieur avec chambre double et coin nuit supplementaire, proche des espaces de vie du domaine.",
    amenities: ["Toilettes seches", "Grande capacite", "Proche piscine", "Lumiere naturelle"],
    images: ["/images/transat-piscine-oulad-chmicha.jpg"],
  },
  {
    slug: "bungalow-nomade",
    unitId: "bungalow-nomade",
    title: "Bungalow Nomade",
    shortDescription: "Bungalow calme pour un sejour reposant.",
    longDescription:
      "Ambiance intime avec materiaux naturels, ideal pour les visiteurs qui recherchent le silence et la nature.",
    amenities: ["Toilettes seches", "Lit double", "Ventilation naturelle", "Vue champ"],
    images: ["/images/piscine-bungalows-oulad-chmicha.jpg"],
  },
  {
    slug: "chambre-ocre",
    unitId: "room-ocre",
    title: "Chambre Ocre",
    shortDescription: "Chambre confortable dans la maison principale.",
    longDescription:
      "Chambre lumineuse avec acces rapide aux espaces communs et sanitaires classiques.",
    amenities: ["Toilettes normales", "Lit double", "Proche salon", "Acces facile"],
    images: ["/images/cuisine-houmous-oulad-chmicha.jpg"],
  },
  {
    slug: "chambre-africaine",
    unitId: "room-africaine",
    title: "Chambre Africaine",
    shortDescription: "Chambre chaleureuse et authentique.",
    longDescription:
      "Une chambre inspiree des matieres et tons locaux, ideale pour se reposer apres une journee de decouverte.",
    amenities: ["Toilettes normales", "Decoration artisanale", "Calme", "Wifi"],
    images: ["/images/cuisine-kefta-oulad-chmicha.jpg"],
  },
  {
    slug: "chambre-jardin",
    unitId: "room-jardin",
    title: "Chambre Jardin",
    shortDescription: "Chambre avec vue sur les espaces vegetaux.",
    longDescription:
      "Un espace agreable pour les voyageurs qui veulent rester proches de la nature et des jardins.",
    amenities: ["Toilettes normales", "Vue jardin", "Lit double", "Rangements"],
    images: ["/images/cuisine-frites-oulad-chmicha.jpg"],
  },
  {
    slug: "chambre-colline",
    unitId: "room-colline",
    title: "Chambre Colline",
    shortDescription: "Chambre simple, efficace et economique.",
    longDescription:
      "Option parfaite pour les sejours courts avec tout le necessaire et un acces direct aux activites.",
    amenities: ["Toilettes normales", "Lit double", "Bonne ventilation", "Ambiance calme"],
    images: ["/images/piscine-collines-oulad-chmicha.jpg"],
  },
];

export const activities = [
  "Atelier de permaculture",
  "Visite de la ferme de 20 hectares",
  "Decouverte de l'architecture ecologique en briques d'argile",
  "Initiation a la gestion durable de l'eau",
  "Experiences nature et sejour responsable",
];

export const messageTemplates: MessageTemplate[] = [
  {
    id: "tpl-1",
    key: "directions",
    label: "Indications pour arriver",
    body: "Bonjour {{guestName}}, voici les indications pour arriver a Oulad Chmicha depuis {{departureCity}}...",
  },
  {
    id: "tpl-2",
    key: "check_in",
    label: "Message check-in",
    body: "Bonjour {{guestName}}, nous vous attendons le {{checkInDate}}. Voici les infos check-in...",
  },
  {
    id: "tpl-3",
    key: "check_out",
    label: "Message check-out",
    body: "Bonjour {{guestName}}, check-out prevu le {{checkOutDate}} avant 11h. Merci pour votre sejour.",
  },
];
