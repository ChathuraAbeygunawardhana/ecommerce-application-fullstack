// Make Types
export interface Make {
  make_id: number;
  make_name: string;
  count: number;
}

export interface MakesResponse {
  count: number;
  makes: Make[];
}

// Model Types
export interface Model {
  model_id: number;
  model_name: string;
  make_name: string;
  count: number;
}

export interface ModelsResponse {
  count: number;
  models: Model[];
}

// Watch Types
export interface Watch {
  id: number;
  make_name: string;
  model_name: string;
  family_name: string | null;
  year_produced: string | null;
  reference: string | null;
  movement_name: string | null;
  case_material: string | null;
  case_diameter: string | null;
  dial_color: string | null;
  price_euro: number | null;
  description: string | null;
  image_url: string | null;
  functions: string | null;
  limited_edition: string | null;
  water_resistance: string | null;
}

export interface WatchesListResponse {
  count: number;
  page: number;
  total_pages: number;
  limit: number;
  watches: Watch[];
}

// Legacy types for backward compatibility
export interface WatchListItem extends Watch {
  watchId?: number;
  makeName?: string;
  modelName?: string;
  familyName?: string;
  yearProducedName?: string;
  limitedName?: string;
  descriptionContent?: string | null;
  movementName?: string;
  functionName?: string;
  priceInEuro?: string;
  watchImageName?: string;
  url?: string;
}

export interface WatchDetailsResponse extends Watch {
  // Extended details can be added here if needed
}
