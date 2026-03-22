import { MapPin, Wine, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  area: string;
  type: string;
  wineCount: number;
  rating: number;
  priceLevel: string;
  highlights: string[];
  wineList: {
    name: string;
    producer: string;
    type: string;
    vintage: number | null;
    glassPrice: number | null;
    bottlePrice: number;
  }[];
}

const osloRestaurants: Restaurant[] = [
  {
    id: "oslo-1",
    name: "Maaemo",
    address: "Dronning Eufemias gate 23",
    city: "Oslo",
    area: "Bjorvika",
    type: "Fine Dining",
    wineCount: 450,
    rating: 4.9,
    priceLevel: "$$$$",
    highlights: ["3 Michelin-stjerner", "Nordisk vinkart", "Naturvin-fokus"],
    wineList: [
      { name: "Krug Grande Cuvée", producer: "Krug", type: "SPARKLING", vintage: null, glassPrice: 650, bottlePrice: 3200 },
      { name: "Domaine Leflaive Puligny-Montrachet", producer: "Domaine Leflaive", type: "WHITE", vintage: 2019, glassPrice: null, bottlePrice: 2800 },
      { name: "Domaine de la Romanée-Conti Échézeaux", producer: "DRC", type: "RED", vintage: 2017, glassPrice: null, bottlePrice: 12500 },
      { name: "Riesling Clos Sainte Hune", producer: "Trimbach", type: "WHITE", vintage: 2016, glassPrice: null, bottlePrice: 3500 },
    ],
  },
  {
    id: "oslo-2",
    name: "Restaurant Kontrast",
    address: "Maridalsveien 15A",
    city: "Oslo",
    area: "Vulkan",
    type: "Fine Dining",
    wineCount: 280,
    rating: 4.7,
    priceLevel: "$$$",
    highlights: ["1 Michelin-stjerne", "Sesongbasert", "Nordiske viner"],
    wineList: [
      { name: "Egly-Ouriet Brut Tradition", producer: "Egly-Ouriet", type: "SPARKLING", vintage: null, glassPrice: 295, bottlePrice: 1400 },
      { name: "Riesling Schlossberg", producer: "Domaine Weinbach", type: "WHITE", vintage: 2020, glassPrice: 245, bottlePrice: 1100 },
      { name: "Barolo Cannubi", producer: "Bartolo Mascarello", type: "RED", vintage: 2017, glassPrice: null, bottlePrice: 2200 },
    ],
  },
  {
    id: "oslo-3",
    name: "Brutus",
    address: "Thorvald Meyers gate 26",
    city: "Oslo",
    area: "Grünerløkka",
    type: "Vinbar & Restaurant",
    wineCount: 180,
    rating: 4.6,
    priceLevel: "$$",
    highlights: ["Naturvin", "Avslappet stemning", "Godt glass-utvalg"],
    wineList: [
      { name: "Pet Nat Rosé", producer: "Gut Oggau", type: "SPARKLING", vintage: 2022, glassPrice: 165, bottlePrice: 650 },
      { name: "Arbois Savagnin", producer: "Domaine de la Tournelle", type: "WHITE", vintage: 2020, glassPrice: 175, bottlePrice: 750 },
      { name: "Côtes du Rhône", producer: "Domaine Gramenon", type: "RED", vintage: 2021, glassPrice: 155, bottlePrice: 595 },
    ],
  },
  {
    id: "oslo-4",
    name: "Territoriet",
    address: "Markveien 58",
    city: "Oslo",
    area: "Grünerløkka",
    type: "Vinbar",
    wineCount: 250,
    rating: 4.5,
    priceLevel: "$$",
    highlights: ["Europafokus", "Stort glass-utvalg", "Tapas"],
    wineList: [
      { name: "Champagne Rosé", producer: "Laherte Frères", type: "SPARKLING", vintage: null, glassPrice: 195, bottlePrice: 890 },
      { name: "Etna Bianco", producer: "Passopisciaro", type: "WHITE", vintage: 2021, glassPrice: 165, bottlePrice: 695 },
      { name: "Nebbiolo d'Alba", producer: "Roagna", type: "RED", vintage: 2019, glassPrice: 195, bottlePrice: 850 },
    ],
  },
  {
    id: "oslo-5",
    name: "Smalhans",
    address: "Ullevålsveien 43",
    city: "Oslo",
    area: "St. Hanshaugen",
    type: "Restaurant",
    wineCount: 120,
    rating: 4.4,
    priceLevel: "$$",
    highlights: ["Lokalt fokus", "Rimelig vinkart", "Ukens meny"],
    wineList: [
      { name: "Grüner Veltliner", producer: "Loimer", type: "WHITE", vintage: 2022, glassPrice: 135, bottlePrice: 495 },
      { name: "Gamay", producer: "Marcel Lapierre", type: "RED", vintage: 2022, glassPrice: 145, bottlePrice: 550 },
    ],
  },
];

const granCanariaRestaurants: Restaurant[] = [
  {
    id: "gc-1",
    name: "La Aquarela",
    address: "Calle Los Berrazales 35",
    city: "Agaete",
    area: "Nord Gran Canaria",
    type: "Fine Dining",
    wineCount: 320,
    rating: 4.8,
    priceLevel: "$$$",
    highlights: ["Michelin-anbefalt", "Kanariske viner", "Havutsikt"],
    wineList: [
      { name: "Malvasía Volcánica", producer: "Los Bermejos", type: "WHITE", vintage: 2022, glassPrice: null, bottlePrice: 38 },
      { name: "Listán Negro", producer: "Envínate", type: "RED", vintage: 2021, glassPrice: null, bottlePrice: 45 },
      { name: "Baboso Negro", producer: "Bodegas Tajinaste", type: "RED", vintage: 2020, glassPrice: null, bottlePrice: 52 },
      { name: "Albillo Criollo", producer: "Suertes del Marqués", type: "WHITE", vintage: 2021, glassPrice: null, bottlePrice: 42 },
    ],
  },
  {
    id: "gc-2",
    name: "Deliciosa Marta",
    address: "Calle Pérez Galdós 23",
    city: "Las Palmas",
    area: "Triana",
    type: "Restaurant",
    wineCount: 180,
    rating: 4.6,
    priceLevel: "$$",
    highlights: ["Kreativt kjøkken", "Bra vinliste", "Sentral beliggenhet"],
    wineList: [
      { name: "Cava Brut Nature Gran Reserva", producer: "Gramona", type: "SPARKLING", vintage: 2018, glassPrice: 8, bottlePrice: 35 },
      { name: "Godello", producer: "Rafael Palacios", type: "WHITE", vintage: 2021, glassPrice: 9, bottlePrice: 38 },
      { name: "Mencía", producer: "Descendientes de J. Palacios", type: "RED", vintage: 2020, glassPrice: 10, bottlePrice: 42 },
    ],
  },
  {
    id: "gc-3",
    name: "El Churrasco",
    address: "Avda. de Tirajana 28",
    city: "Maspalomas",
    area: "Sør Gran Canaria",
    type: "Steakhouse & Vinbar",
    wineCount: 250,
    rating: 4.5,
    priceLevel: "$$$",
    highlights: ["Kjøttfokus", "Argentinske og spanske viner", "Terrasse"],
    wineList: [
      { name: "Malbec Reserva", producer: "Catena Zapata", type: "RED", vintage: 2020, glassPrice: 12, bottlePrice: 45 },
      { name: "Ribera del Duero Reserva", producer: "Vega Sicilia Valbuena", type: "RED", vintage: 2018, glassPrice: null, bottlePrice: 120 },
      { name: "Rueda Verdejo", producer: "José Pariente", type: "WHITE", vintage: 2022, glassPrice: 7, bottlePrice: 24 },
    ],
  },
  {
    id: "gc-4",
    name: "Casa Montesdeoca",
    address: "Calle Montesdeoca 10",
    city: "Las Palmas",
    area: "Vegueta",
    type: "Restaurant",
    wineCount: 150,
    rating: 4.7,
    priceLevel: "$$",
    highlights: ["Historisk bygg", "Lokale viner", "Kanarisk mat"],
    wineList: [
      { name: "Listán Blanco", producer: "Bodegas Monje", type: "WHITE", vintage: 2022, glassPrice: 6, bottlePrice: 22 },
      { name: "Vijariego Negro", producer: "Frontón de Oro", type: "RED", vintage: 2021, glassPrice: 7, bottlePrice: 28 },
      { name: "Malvasía Naturalmente Dulce", producer: "Los Bermejos", type: "DESSERT", vintage: 2021, glassPrice: 9, bottlePrice: 35 },
    ],
  },
];

const typeColors: Record<string, string> = {
  RED: "bg-red-100 text-red-800",
  WHITE: "bg-amber-100 text-amber-800",
  SPARKLING: "bg-yellow-100 text-yellow-800",
  DESSERT: "bg-amber-200 text-amber-900",
};

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{restaurant.name}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {restaurant.address}, {restaurant.area}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">{restaurant.priceLevel}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">{restaurant.type}</Badge>
          <Badge variant="outline" className="gap-1">
            <Wine className="h-3 w-3" />
            {restaurant.wineCount} viner
          </Badge>
          {restaurant.highlights.map((h) => (
            <Badge key={h} variant="outline" className="text-xs">
              {h}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="text-sm font-semibold mb-3">Utvalg fra vinkartet:</h4>
        <div className="space-y-2">
          {restaurant.wineList.map((wine, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/50 text-sm"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <Badge className={`${typeColors[wine.type] || ""} text-xs shrink-0`} variant="secondary">
                  {wine.type}
                </Badge>
                <div className="min-w-0">
                  <span className="font-medium truncate block">
                    {wine.name} {wine.vintage && wine.vintage}
                  </span>
                  <span className="text-xs text-muted-foreground">{wine.producer}</span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                {wine.glassPrice && (
                  <span className="text-xs text-muted-foreground block">
                    Glass: {wine.glassPrice} {restaurant.city === "Oslo" ? "kr" : "€"}
                  </span>
                )}
                <span className="font-semibold">
                  {wine.bottlePrice} {restaurant.city === "Oslo" ? "kr" : "€"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function RestaurantsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Restauranters vinkart</h1>
        <p className="text-muted-foreground">
          Utforsk vinkart fra de beste restaurantene. Finn din neste vinopplevelse.
        </p>
      </div>

      <Tabs defaultValue="oslo" className="w-full">
        <TabsList>
          <TabsTrigger value="oslo" className="gap-2">
            <MapPin className="h-4 w-4" />
            Oslo
          </TabsTrigger>
          <TabsTrigger value="grancanaria" className="gap-2">
            <MapPin className="h-4 w-4" />
            Gran Canaria
          </TabsTrigger>
        </TabsList>

        <TabsContent value="oslo" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {osloRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grancanaria" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {granCanariaRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
