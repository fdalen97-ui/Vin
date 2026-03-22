import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const wines = [
  {
    name: "Barolo Riserva",
    producer: "Giacomo Conterno",
    vintage: 2016,
    country: "Italia",
    region: "Piemonte",
    subRegion: "Barolo",
    grapeVarieties: JSON.stringify(["Nebbiolo"]),
    type: "RED",
    abv: 14.5,
    description: "Kraftig og elegant med noter av tjære, roser, kirsebær og krydder. Lang ettersmak.",
    avgRating: 4.8,
    reviewCount: 12,
    price: 1299,
  },
  {
    name: "Chablis Grand Cru Les Clos",
    producer: "William Fèvre",
    vintage: 2020,
    country: "Frankrike",
    region: "Burgund",
    subRegion: "Chablis",
    grapeVarieties: JSON.stringify(["Chardonnay"]),
    type: "WHITE",
    abv: 13.0,
    description: "Mineralsk og elegant med sitrus, eple og subtile eiknotater.",
    avgRating: 4.5,
    reviewCount: 8,
    price: 699,
  },
  {
    name: "Châteauneuf-du-Pape",
    producer: "Château de Beaucastel",
    vintage: 2018,
    country: "Frankrike",
    region: "Rhône",
    subRegion: "Châteauneuf-du-Pape",
    grapeVarieties: JSON.stringify(["Grenache", "Mourvèdre", "Syrah", "Counoise"]),
    type: "RED",
    abv: 14.5,
    description: "Kompleks blanding med mørke bær, krydder, lær og garrigue.",
    avgRating: 4.7,
    reviewCount: 15,
    price: 549,
  },
  {
    name: "Cloudy Bay Sauvignon Blanc",
    producer: "Cloudy Bay",
    vintage: 2023,
    country: "New Zealand",
    region: "Marlborough",
    grapeVarieties: JSON.stringify(["Sauvignon Blanc"]),
    type: "WHITE",
    abv: 13.5,
    description: "Frisk og aromatisk med passionsfrukt, lime og gressaktige noter.",
    avgRating: 4.2,
    reviewCount: 22,
    price: 249,
  },
  {
    name: "Bollinger Special Cuvée",
    producer: "Bollinger",
    country: "Frankrike",
    region: "Champagne",
    grapeVarieties: JSON.stringify(["Pinot Noir", "Chardonnay", "Pinot Meunier"]),
    type: "SPARKLING",
    abv: 12.0,
    description: "Kraftfull champagne med brioche, eple og hasselnøtt. Kremet mousse.",
    avgRating: 4.4,
    reviewCount: 18,
    price: 599,
  },
  {
    name: "Whispering Angel",
    producer: "Château d'Esclans",
    vintage: 2023,
    country: "Frankrike",
    region: "Provence",
    grapeVarieties: JSON.stringify(["Grenache", "Cinsault", "Rolle"]),
    type: "ROSE",
    abv: 13.0,
    description: "Lys laksrosa med jordbær, sitrus og hvite blomster. Frisk og elegant.",
    avgRating: 4.0,
    reviewCount: 30,
    price: 199,
  },
  {
    name: "Amarone della Valpolicella Classico",
    producer: "Bertani",
    vintage: 2017,
    country: "Italia",
    region: "Veneto",
    subRegion: "Valpolicella",
    grapeVarieties: JSON.stringify(["Corvina", "Rondinella", "Molinara"]),
    type: "RED",
    abv: 15.5,
    description: "Rik og konsentrert med tørkede frukter, sjokolade, kanel og vanilje.",
    avgRating: 4.5,
    reviewCount: 9,
    price: 799,
  },
  {
    name: "Riesling Clos Sainte Hune",
    producer: "Trimbach",
    vintage: 2016,
    country: "Frankrike",
    region: "Alsace",
    grapeVarieties: JSON.stringify(["Riesling"]),
    type: "WHITE",
    abv: 12.5,
    description: "Ekstraordinær mineralitet med sitron, fersken og petrolnoter. Lagringsvin.",
    avgRating: 4.9,
    reviewCount: 5,
    price: 1899,
  },
  {
    name: "Tignanello",
    producer: "Antinori",
    vintage: 2020,
    country: "Italia",
    region: "Toscana",
    grapeVarieties: JSON.stringify(["Sangiovese", "Cabernet Sauvignon", "Cabernet Franc"]),
    type: "RED",
    abv: 14.0,
    description: "Super Toscanar med kirsebær, plomme, krydder og tobakk. Silkemyk tannin.",
    avgRating: 4.6,
    reviewCount: 14,
    price: 899,
  },
  {
    name: "Malvasía Volcánica",
    producer: "Los Bermejos",
    vintage: 2022,
    country: "Spania",
    region: "Kanariske øyer",
    subRegion: "Lanzarote",
    grapeVarieties: JSON.stringify(["Malvasía Volcánica"]),
    type: "WHITE",
    abv: 13.0,
    description: "Vulkansk mineralitet med eksotiske frukter, hvite blomster og salte noter.",
    avgRating: 4.3,
    reviewCount: 6,
    price: 299,
  },
];

const foodPairings = [
  { dish: "Laks", category: "Fish", strength: 5, wineIndex: 1 },
  { dish: "Biff", category: "Meat", strength: 5, wineIndex: 0 },
  { dish: "Lam", category: "Meat", strength: 5, wineIndex: 2 },
  { dish: "Ost", category: "Cheese", strength: 4, wineIndex: 6 },
  { dish: "Sushi", category: "Fish", strength: 4, wineIndex: 3 },
  { dish: "Pasta Carbonara", category: "Pasta", strength: 4, wineIndex: 3 },
  { dish: "Pizza Margherita", category: "Pasta", strength: 4, wineIndex: 8 },
  { dish: "Sjokoladekake", category: "Dessert", strength: 3, wineIndex: 6 },
  { dish: "Sjømat", category: "Fish", strength: 5, wineIndex: 4 },
  { dish: "Tapas", category: "Meat", strength: 4, wineIndex: 5 },
];

async function main() {
  console.log("Seeding database...");

  // Create wines
  const createdWines = [];
  for (const wine of wines) {
    const created = await prisma.wine.create({ data: wine });
    createdWines.push(created);
    console.log(`  Created wine: ${created.name}`);
  }

  // Create food pairings
  for (const pairing of foodPairings) {
    await prisma.foodPairing.create({
      data: {
        dish: pairing.dish,
        category: pairing.category,
        strength: pairing.strength,
        wineId: createdWines[pairing.wineIndex].id,
      },
    });
    console.log(`  Created pairing: ${pairing.dish}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
