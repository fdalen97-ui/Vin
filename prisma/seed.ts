import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

const wines = [
  { name: "Barolo Riserva", producer: "Giacomo Conterno", vintage: 2016, country: "Italia", region: "Piemonte", subRegion: "Barolo", grapeVarieties: JSON.stringify(["Nebbiolo"]), type: "RED", abv: 14.5, price: 1299, description: "Kraftig og elegant med noter av tjære, roser, kirsebær og krydder. Lang ettersmak." },
  { name: "Chablis Grand Cru Les Clos", producer: "William Fèvre", vintage: 2020, country: "Frankrike", region: "Burgund", subRegion: "Chablis", grapeVarieties: JSON.stringify(["Chardonnay"]), type: "WHITE", abv: 13.0, price: 699, description: "Mineralsk og elegant med sitrus, eple og subtile eiknotater." },
  { name: "Châteauneuf-du-Pape", producer: "Château de Beaucastel", vintage: 2018, country: "Frankrike", region: "Rhône", subRegion: "Châteauneuf-du-Pape", grapeVarieties: JSON.stringify(["Grenache", "Mourvèdre", "Syrah", "Counoise"]), type: "RED", abv: 14.5, price: 549, description: "Kompleks blanding med mørke bær, krydder, lær og garrigue." },
  { name: "Cloudy Bay Sauvignon Blanc", producer: "Cloudy Bay", vintage: 2023, country: "New Zealand", region: "Marlborough", grapeVarieties: JSON.stringify(["Sauvignon Blanc"]), type: "WHITE", abv: 13.5, price: 249, description: "Frisk og aromatisk med passionsfrukt, lime og gressaktige noter." },
  { name: "Bollinger Special Cuvée", producer: "Bollinger", country: "Frankrike", region: "Champagne", grapeVarieties: JSON.stringify(["Pinot Noir", "Chardonnay", "Pinot Meunier"]), type: "SPARKLING", abv: 12.0, price: 599, description: "Kraftfull champagne med brioche, eple og hasselnøtt. Kremet mousse." },
  { name: "Whispering Angel", producer: "Château d'Esclans", vintage: 2023, country: "Frankrike", region: "Provence", grapeVarieties: JSON.stringify(["Grenache", "Cinsault", "Rolle"]), type: "ROSE", abv: 13.0, price: 199, description: "Lys laksrosa med jordbær, sitrus og hvite blomster. Frisk og elegant." },
  { name: "Amarone della Valpolicella Classico", producer: "Bertani", vintage: 2017, country: "Italia", region: "Veneto", subRegion: "Valpolicella", grapeVarieties: JSON.stringify(["Corvina", "Rondinella", "Molinara"]), type: "RED", abv: 15.5, price: 799, description: "Rik og konsentrert med tørkede frukter, sjokolade, kanel og vanilje." },
  { name: "Riesling Clos Sainte Hune", producer: "Trimbach", vintage: 2016, country: "Frankrike", region: "Alsace", grapeVarieties: JSON.stringify(["Riesling"]), type: "WHITE", abv: 12.5, price: 1899, description: "Ekstraordinær mineralitet med sitron, fersken og petrolnoter. Lagringsvin." },
  { name: "Tignanello", producer: "Antinori", vintage: 2020, country: "Italia", region: "Toscana", grapeVarieties: JSON.stringify(["Sangiovese", "Cabernet Sauvignon", "Cabernet Franc"]), type: "RED", abv: 14.0, price: 899, description: "Super Toscanar med kirsebær, plomme, krydder og tobakk. Silkemyk tannin." },
  { name: "Malvasía Volcánica", producer: "Los Bermejos", vintage: 2022, country: "Spania", region: "Kanariske øyer", subRegion: "Lanzarote", grapeVarieties: JSON.stringify(["Malvasía Volcánica"]), type: "WHITE", abv: 13.0, price: 299, description: "Vulkansk mineralitet med eksotiske frukter, hvite blomster og salte noter." },
  { name: "Opus One", producer: "Opus One Winery", vintage: 2019, country: "USA", region: "California", subRegion: "Napa Valley", grapeVarieties: JSON.stringify(["Cabernet Sauvignon", "Merlot", "Cabernet Franc"]), type: "RED", abv: 14.5, price: 4999, description: "Ikonisk Napa-blend med cassis, mørk sjokolade, fioler og cedartre." },
  { name: "Puligny-Montrachet 1er Cru", producer: "Domaine Leflaive", vintage: 2020, country: "Frankrike", region: "Burgund", subRegion: "Puligny-Montrachet", grapeVarieties: JSON.stringify(["Chardonnay"]), type: "WHITE", abv: 13.5, price: 1599, description: "Raffinert hvitburgunder med hasselnøtt, sitrus, hvite blomster og elegant mineralitet." },
  { name: "Rioja Reserva", producer: "La Rioja Alta", vintage: 2017, country: "Spania", region: "Rioja", grapeVarieties: JSON.stringify(["Tempranillo", "Graciano", "Mazuelo"]), type: "RED", abv: 13.5, price: 349, description: "Klassisk Rioja med kirsebær, vanilje, tobakk og lær. Elegant og balansert." },
  { name: "Sancerre", producer: "Domaine Vacheron", vintage: 2022, country: "Frankrike", region: "Loire", subRegion: "Sancerre", grapeVarieties: JSON.stringify(["Sauvignon Blanc"]), type: "WHITE", abv: 13.0, price: 329, description: "Mineralsk Sancerre med grapefrukt, stikkelsbær og røykte noter." },
  { name: "Penfolds Grange", producer: "Penfolds", vintage: 2018, country: "Australia", region: "South Australia", subRegion: "Barossa Valley", grapeVarieties: JSON.stringify(["Shiraz", "Cabernet Sauvignon"]), type: "RED", abv: 14.5, price: 5999, description: "Australias mest ikoniske vin med mørke bær, sjokolade, lakris og eikekrydder." },
  { name: "Dom Pérignon", producer: "Moët & Chandon", vintage: 2013, country: "Frankrike", region: "Champagne", grapeVarieties: JSON.stringify(["Chardonnay", "Pinot Noir"]), type: "SPARKLING", abv: 12.5, price: 2499, description: "Prestisjechampagne med brioche, mandler, sitrus og rørte bær." },
  { name: "Brunello di Montalcino", producer: "Biondi-Santi", vintage: 2017, country: "Italia", region: "Toscana", subRegion: "Montalcino", grapeVarieties: JSON.stringify(["Sangiovese Grosso"]), type: "RED", abv: 14.0, price: 1899, description: "Klassisk Brunello med kirsebær, te, tobakk og jordlige noter." },
  { name: "Grüner Veltliner Smaragd", producer: "Domäne Wachau", vintage: 2022, country: "Østerrike", region: "Wachau", grapeVarieties: JSON.stringify(["Grüner Veltliner"]), type: "WHITE", abv: 13.0, price: 289, description: "Fylddig Grüner Veltliner med hvit pepper, sitrus, urter og mineralske noter." },
  { name: "Valpolicella Ripasso", producer: "Allegrini", vintage: 2020, country: "Italia", region: "Veneto", subRegion: "Valpolicella", grapeVarieties: JSON.stringify(["Corvina", "Rondinella", "Oseleta"]), type: "RED", abv: 13.5, price: 249, description: "Rik og fruktig med kirsebær, plomme, sjokolade og krydder. God verdi." },
  { name: "Taylor's Vintage Port", producer: "Taylor's", vintage: 2017, country: "Portugal", region: "Douro", grapeVarieties: JSON.stringify(["Touriga Nacional", "Touriga Franca", "Tinta Roriz"]), type: "FORTIFIED", abv: 20.0, price: 799, description: "Kraftig portvin med mørke bær, sjokolade, fiken og krydder." },
  { name: "Moscato d'Asti", producer: "Paolo Saracco", vintage: 2023, country: "Italia", region: "Piemonte", subRegion: "Asti", grapeVarieties: JSON.stringify(["Moscato Bianco"]), type: "DESSERT", abv: 5.5, price: 179, description: "Lett og søt med fersken, aprikos, hvite blomster og honning." },
  { name: "Skin Contact Pinot Grigio", producer: "Radikon", vintage: 2019, country: "Italia", region: "Friuli-Venezia Giulia", grapeVarieties: JSON.stringify(["Pinot Grigio"]), type: "ORANGE", abv: 13.5, price: 499, description: "Naturvin med lang skinnkontakt. Aprikos, te, nøtter og kryddernoter." },
  { name: "Château Margaux", producer: "Château Margaux", vintage: 2015, country: "Frankrike", region: "Bordeaux", subRegion: "Margaux", grapeVarieties: JSON.stringify(["Cabernet Sauvignon", "Merlot", "Petit Verdot", "Cabernet Franc"]), type: "RED", abv: 13.5, price: 8999, description: "Ikonisk premier cru med fioler, cassis, blyant og røyk. Silkemyk tekstur." },
  { name: "Cava Brut Nature Gran Reserva", producer: "Gramona", vintage: 2018, country: "Spania", region: "Penedès", grapeVarieties: JSON.stringify(["Xarel·lo", "Macabeo", "Parellada"]), type: "SPARKLING", abv: 11.5, price: 299, description: "Elegant cava med eple, sitrus, mandler og brødbakenoter. Tørr og forfriskende." },
];

const foodPairings = [
  { dish: "Laks", category: "Sjømat", strength: 5, wineIndex: 1 },
  { dish: "Biff", category: "Kjøtt", strength: 5, wineIndex: 0 },
  { dish: "Lam", category: "Kjøtt", strength: 5, wineIndex: 2 },
  { dish: "Modne oster", category: "Ost", strength: 4, wineIndex: 6 },
  { dish: "Sushi", category: "Sjømat", strength: 4, wineIndex: 3 },
  { dish: "Pasta Carbonara", category: "Pasta", strength: 4, wineIndex: 3 },
  { dish: "Pizza Margherita", category: "Pasta", strength: 4, wineIndex: 8 },
  { dish: "Sjokoladekake", category: "Dessert", strength: 5, wineIndex: 20 },
  { dish: "Sjømat", category: "Sjømat", strength: 5, wineIndex: 4 },
  { dish: "Tapas", category: "Småretter", strength: 5, wineIndex: 12 },
  { dish: "Osso Buco", category: "Kjøtt", strength: 5, wineIndex: 0 },
  { dish: "Trøffel-risotto", category: "Pasta", strength: 5, wineIndex: 0 },
  { dish: "Østers", category: "Sjømat", strength: 5, wineIndex: 1 },
  { dish: "Grillet hummer", category: "Sjømat", strength: 4, wineIndex: 1 },
  { dish: "Viltgryte", category: "Kjøtt", strength: 5, wineIndex: 2 },
  { dish: "Reker", category: "Sjømat", strength: 4, wineIndex: 3 },
  { dish: "Thai-kylling", category: "Kylling", strength: 4, wineIndex: 3 },
  { dish: "Niçoise-salat", category: "Salat", strength: 5, wineIndex: 5 },
  { dish: "Grillet asparges", category: "Grønnsaker", strength: 4, wineIndex: 13 },
  { dish: "Chèvre", category: "Ost", strength: 5, wineIndex: 13 },
  { dish: "Paella", category: "Ris", strength: 5, wineIndex: 12 },
  { dish: "Lammecarré", category: "Kjøtt", strength: 4, wineIndex: 0 },
  { dish: "Tiramisu", category: "Dessert", strength: 5, wineIndex: 20 },
  { dish: "Frukt og bær", category: "Dessert", strength: 4, wineIndex: 20 },
  { dish: "Blåmuggost", category: "Ost", strength: 5, wineIndex: 19 },
];

async function main() {
  console.log("Seeding database...");

  // Clean
  await prisma.foodPairing.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cellarItem.deleteMany();
  await prisma.tasteProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.wine.deleteMany();
  await prisma.user.deleteMany();

  // Create demo user
  const user = await prisma.user.create({
    data: {
      name: "Demo Bruker",
      email: "demo@vin.no",
      password: "demo1234",
    },
  });
  console.log(`  Created user: ${user.email}`);

  // Create wines
  const createdWines = [];
  for (const wine of wines) {
    const created = await prisma.wine.create({ data: wine });
    createdWines.push(created);
  }
  console.log(`  Created ${createdWines.length} wines`);

  // Create reviews
  const reviewsData = [
    { wineIdx: 0, rating: 4.8, nose: "Tjære, roser, kirsebær", palate: "Kraftig, elegant, balansert", finish: "Lang og silkemyk", notes: "Fantastisk Barolo! Verdt ventetiden." },
    { wineIdx: 0, rating: 4.7, nose: "Mørke bær, krydder", palate: "Kompleks, strukturert", finish: "Veldig lang", notes: "En av de beste Barolo-ene jeg har smakt." },
    { wineIdx: 2, rating: 4.7, nose: "Mørke bær, krydder, lær", palate: "Rik og kompleks", finish: "Lang med jordlige noter", notes: "Beaucastel leverer som alltid." },
    { wineIdx: 3, rating: 4.2, nose: "Passionsfrukt, grapefrukt", palate: "Frisk, aromatisk", finish: "Sprø og ren", notes: "Perfekt sommervin!" },
    { wineIdx: 1, rating: 4.5, nose: "Sitrus, flint, grønt eple", palate: "Mineralsk, presis", finish: "Lang med fin syre", notes: "Strålende Chablis." },
    { wineIdx: 6, rating: 4.5, nose: "Tørkede kirsebær, sjokolade", palate: "Velvet, konsentrert", finish: "Lang og varm", notes: "Imponerende Amarone." },
    { wineIdx: 12, rating: 4.3, nose: "Kirsebær, vanilje, tobakk", palate: "Elegant, balansert", finish: "Myk og lang", notes: "Klassisk Rioja til en god pris." },
    { wineIdx: 8, rating: 4.6, nose: "Mørke bær, vanilje, krydder", palate: "Elegant og strukturert", finish: "Lang med fin eik", notes: "Supertoskaner av høyeste klasse." },
  ];

  for (const r of reviewsData) {
    await prisma.review.create({
      data: {
        rating: r.rating,
        nose: r.nose,
        palate: r.palate,
        finish: r.finish,
        notes: r.notes,
        userId: user.id,
        wineId: createdWines[r.wineIdx].id,
      },
    });
  }
  console.log(`  Created ${reviewsData.length} reviews`);

  // Update wine avg ratings from reviews
  for (const wine of createdWines) {
    const reviews = await prisma.review.findMany({ where: { wineId: wine.id } });
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await prisma.wine.update({
        where: { id: wine.id },
        data: { avgRating: Math.round(avg * 10) / 10, reviewCount: reviews.length },
      });
    }
  }

  // Create cellar items
  const cellarData = [
    { wineIdx: 0, quantity: 3, price: 1299, location: "Rack A, Rad 2", drinkFrom: new Date("2024-01-01"), drinkBefore: new Date("2035-12-31") },
    { wineIdx: 1, quantity: 2, price: 699, location: "Rack B, Rad 1", drinkFrom: new Date("2023-01-01"), drinkBefore: new Date("2026-09-01") },
    { wineIdx: 2, quantity: 1, price: 549, location: "Rack A, Rad 4", drinkFrom: new Date("2023-01-01"), drinkBefore: new Date("2030-12-31") },
    { wineIdx: 4, quantity: 6, price: 599, location: "Rack C, Rad 3", drinkBefore: new Date("2027-12-31") },
    { wineIdx: 6, quantity: 2, price: 899, location: "Rack A, Rad 1", drinkFrom: new Date("2023-01-01"), drinkBefore: new Date("2032-12-31") },
    { wineIdx: 12, quantity: 4, price: 349, location: "Rack B, Rad 3", drinkBefore: new Date("2026-04-01") },
    { wineIdx: 13, quantity: 1, price: 329, location: "Rack B, Rad 2", drinkBefore: new Date("2026-02-01") },
    { wineIdx: 8, quantity: 2, price: 899, location: "Rack A, Rad 3", drinkFrom: new Date("2025-01-01"), drinkBefore: new Date("2035-12-31") },
    { wineIdx: 16, quantity: 1, price: 1899, location: "Rack D, Rad 1", drinkFrom: new Date("2027-01-01"), drinkBefore: new Date("2045-12-31") },
    { wineIdx: 18, quantity: 3, price: 249, location: "Rack B, Rad 4", drinkBefore: new Date("2028-12-31") },
  ];

  for (const c of cellarData) {
    await prisma.cellarItem.create({
      data: {
        quantity: c.quantity,
        purchasePrice: c.price,
        purchaseDate: new Date("2024-06-15"),
        location: c.location,
        drinkFrom: c.drinkFrom,
        drinkBefore: c.drinkBefore,
        userId: user.id,
        wineId: createdWines[c.wineIdx].id,
      },
    });
  }
  console.log(`  Created ${cellarData.length} cellar items`);

  // Create food pairings
  for (const p of foodPairings) {
    await prisma.foodPairing.create({
      data: {
        dish: p.dish,
        category: p.category,
        strength: p.strength,
        wineId: createdWines[p.wineIndex].id,
      },
    });
  }
  console.log(`  Created ${foodPairings.length} food pairings`);

  // Create taste profile
  await prisma.tasteProfile.create({
    data: {
      preferredTypes: JSON.stringify(["RED", "WHITE"]),
      preferredRegions: JSON.stringify(["Piemonte", "Burgund", "Rhône"]),
      flavorNotes: JSON.stringify(["fruity", "oaky", "spicy"]),
      priceRange: "200-1500",
      userId: user.id,
    },
  });

  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
