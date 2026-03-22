// Global Wine Score API types
export interface GlobalWineScoreResult {
  wine: string;
  wine_id: number;
  wine_slug: string;
  appellation: string;
  appellation_slug: string;
  color: string;
  wine_type: string;
  regions: string[];
  country: string;
  classification: string;
  vintage: string;
  date: string;
  is_aggregate: boolean;
  confidence_index: string;
  journalist_count: number;
  lwin: number | null;
  lwin_11: number | null;
  score: number;
}

// Vinmonopolet product mapped to our Wine model
export interface MappedWine {
  name: string;
  producer: string;
  vintage: number | null;
  country: string;
  region: string | null;
  subRegion: string | null;
  grapeVarieties: string[];
  type: string;
  abv: number | null;
  description: string | null;
  imageUrl: string | null;
  vinmonopoletId: string;
  price: number | null;
}
