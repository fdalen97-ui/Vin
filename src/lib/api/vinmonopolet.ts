const BASE_URL = "https://apis.vinmonopolet.no";

export interface VinmonopoletProduct {
  basic: {
    productId: string;
    productShortName: string;
    productLongName: string;
    volume: number;
    alcoholContent: number;
    vintage: number;
    ageLimit: string;
    packagingMaterialUrl: string;
    url: string;
    country: string;
    region: string;
    subRegion: string;
    productSelection: string;
    storeCategory: string;
    color: string;
    bioDynamic: boolean;
    ecoFriendly: boolean;
    gluten_free: boolean;
    kosher: boolean;
    fairTrade: boolean;
    sugar: number;
    acid: number;
    storable: string;
  };
  lastChanged: {
    date: string;
    time: string;
  };
  prices: Array<{
    salesPrice: number;
    salesPricePrLiter: number;
    bottleReturnValue: number;
  }>;
  description: {
    characteristics: {
      colour: string;
      odour: string;
      taste: string;
    };
    recommendedFood: string[];
  };
  classification: {
    mainCategory: {
      code: string;
      name: string;
    };
    subCategory: {
      code: string;
      name: string;
    };
    productTypeName: string;
    productGroupName: string;
  };
  origins: {
    origin: {
      country: string;
      region: string;
      subRegion: string;
    };
    production: {
      producerName: string;
      producerShortName: string;
    };
  };
  properties: {
    packaging: string;
    volumeType: string;
    cork: string;
  };
  rawMaterials: Array<{
    id: string;
    name: string;
    percentage: number;
  }>;
  images: Array<{
    format: string;
    url: string;
  }>;
}

export interface VinmonopoletStore {
  storeId: string;
  storeName: string;
  status: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
  };
  telephone: string;
  email: string;
  category: string;
  gpsCoord: string;
  openingHours: {
    regularHours: Array<{
      dayOfTheWeek: string;
      openingTime: string;
      closingTime: string;
    }>;
  };
}

class VinmonopoletClient {
  private apiKey: string;

  constructor() {
    const key = process.env.VINMONOPOLET_API_KEY;
    if (!key) {
      console.warn(
        "VINMONOPOLET_API_KEY not set. Vinmonopolet API calls will fail."
      );
    }
    this.apiKey = key || "";
  }

  private async fetch<T>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<T> {
    const url = new URL(`${BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value)
      );
    }

    const response = await fetch(url.toString(), {
      headers: {
        "Ocp-Apim-Subscription-Key": this.apiKey,
        Accept: "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(
        `Vinmonopolet API error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  async getProducts(params?: {
    maxResults?: number;
    start?: number;
    changedSince?: string;
  }): Promise<VinmonopoletProduct[]> {
    const queryParams: Record<string, string> = {};
    if (params?.maxResults)
      queryParams.maxResults = params.maxResults.toString();
    if (params?.start) queryParams.start = params.start.toString();
    if (params?.changedSince) queryParams.changedSince = params.changedSince;

    return this.fetch<VinmonopoletProduct[]>(
      "/products/v0/details-normal",
      queryParams
    );
  }

  async getProductById(
    productId: string
  ): Promise<VinmonopoletProduct | null> {
    try {
      const products = await this.fetch<VinmonopoletProduct[]>(
        `/products/v0/details-normal`,
        { productId }
      );
      return products[0] || null;
    } catch {
      return null;
    }
  }

  async getStores(): Promise<VinmonopoletStore[]> {
    return this.fetch<VinmonopoletStore[]>("/stores/v0/details");
  }

  async searchProducts(query: string): Promise<VinmonopoletProduct[]> {
    return this.fetch<VinmonopoletProduct[]>(
      "/products/v0/details-normal",
      {
        productShortName: query,
        maxResults: "20",
      }
    );
  }
}

export const vinmonopolet = new VinmonopoletClient();
