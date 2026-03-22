export type WineType =
  | "RED"
  | "WHITE"
  | "ROSE"
  | "SPARKLING"
  | "DESSERT"
  | "FORTIFIED"
  | "ORANGE";

export const WINE_TYPES: WineType[] = [
  "RED",
  "WHITE",
  "ROSE",
  "SPARKLING",
  "DESSERT",
  "FORTIFIED",
  "ORANGE",
];

export interface WineWithDetails {
  id: string;
  name: string;
  producer: string;
  vintage: number | null;
  country: string;
  region: string | null;
  subRegion: string | null;
  grapeVarieties: string[];
  type: WineType;
  color: string | null;
  abv: number | null;
  description: string | null;
  imageUrl: string | null;
  avgRating: number;
  reviewCount: number;
  vinmonopoletId: string | null;
  price: number | null;
}

export interface CellarItemWithWine {
  id: string;
  quantity: number;
  purchasePrice: number | null;
  purchaseDate: Date | null;
  location: string | null;
  drinkFrom: Date | null;
  drinkBefore: Date | null;
  notes: string | null;
  wine: WineWithDetails;
}

export interface ReviewWithUser {
  id: string;
  rating: number;
  nose: string | null;
  palate: string | null;
  finish: string | null;
  notes: string | null;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export interface DashboardStats {
  totalBottles: number;
  totalReviews: number;
  avgRating: number;
  lastTasted: WineWithDetails | null;
  cellarDistribution: { type: WineType; count: number; percentage: number }[];
  drinkSoon: CellarItemWithWine[];
  topWines: (WineWithDetails & { userRating: number })[];
  cellarValue: number;
}
