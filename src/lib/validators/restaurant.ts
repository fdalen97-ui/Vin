import { z } from "zod";

export const wineHighlightSchema = z.object({
  category: z.enum([
    "SPARKLING",
    "WHITE",
    "RED",
    "ORANGE",
    "ROSÉ",
    "SWEET",
    "FORTIFIED",
    "SAKE",
    "BEER",
    "OTHER",
  ]),
  wineName: z.string(),
  producer: z.string().nullable(),
  vintage: z.number().int().nullable(),
  priceBottleNok: z.number().int().nullable(),
  priceGlassNok: z.number().int().nullable(),
  pour: z.enum(["glass", "1/2 glass", "bottle", "unknown"]).nullable(),
  sourceRef: z.string().nullable(),
});

export const restaurantSchema = z.object({
  name: z.string(),
  address: z.string().nullable(),
  city: z.string(),
  region: z.string(),
  area: z.string().nullable(),
  venueType: z.string().nullable(),
  wineCount: z.number().int().nullable(),
  rating: z.number().nullable(),
  priceTier: z.enum(["$", "$$", "$$$", "$$$$"]).nullable(),
  tags: z.array(z.string()),
  awards: z.array(z.string()),
  description: z.string().nullable(),
  documentUrl: z.string().url().nullable(),
  confidence: z.enum(["high", "medium", "low"]),
  highlights: z.array(wineHighlightSchema),
});

export const restaurantListResponseSchema = z.object({
  city: z.string().nullable(),
  region: z.string().nullable(),
  generatedAt: z.string(),
  ranking: z.object({
    method: z.enum(["source_order", "scored"]),
    scoringRules: z.string().nullable(),
  }),
  results: z.array(
    restaurantSchema.extend({
      id: z.string(),
      rank: z.number().int(),
    })
  ),
  total: z.number().int(),
  errors: z.array(z.string()),
});

export type WineHighlight = z.infer<typeof wineHighlightSchema>;
export type RestaurantData = z.infer<typeof restaurantSchema>;
export type RestaurantListResponse = z.infer<typeof restaurantListResponseSchema>;
