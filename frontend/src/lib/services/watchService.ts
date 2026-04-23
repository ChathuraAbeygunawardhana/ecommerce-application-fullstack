import { rapidApiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/config';
import type {
  MakesResponse,
  ModelsResponse,
  WatchesListResponse,
  WatchDetailsResponse,
} from '../types/watch.types';

export interface Watch {
  id?: string;
  watchId?: string;
  makeName: string;
  modelName: string;
  familyName?: string;
  yearProducedName?: string;
  reference?: string;
  movementName?: string;
  priceInEuro?: number;
}

export interface SearchWatchesRequest {
  searchTerm: string;
  page?: number;
  limit?: number;
}

export interface SearchWatchesResponse {
  watches: Watch[];
}

export const watchService = {
  // Existing search endpoint
  searchWatches: async ({
    searchTerm,
    page = 1,
    limit = 20,
  }: SearchWatchesRequest): Promise<Watch[]> => {
    const params = new URLSearchParams();
    params.append('searchTerm', searchTerm);
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await rapidApiClient.post<SearchWatchesResponse>(
      API_ENDPOINTS.WATCHES.SEARCH,
      params
    );

    return response.watches || [];
  },

  // 1. Get all watch makes
  getMakes: async (): Promise<MakesResponse> => {
    try {
      const response = await rapidApiClient.get<MakesResponse>(
        API_ENDPOINTS.WATCHES.MAKES
      );
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch watch makes: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  },

  // 2. Get all models by make ID
  getModelsByMake: async (makeId: number): Promise<ModelsResponse> => {
    try {
      const response = await rapidApiClient.get<ModelsResponse>(
        API_ENDPOINTS.WATCHES.MODELS(makeId)
      );
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch models for make ${makeId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  },

  // 3. Get paginated watches by make
  getWatchesByMake: async (
    makeId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<WatchesListResponse> => {
    try {
      const response = await rapidApiClient.get<WatchesListResponse>(
        API_ENDPOINTS.WATCHES.WATCHES_BY_MAKE(makeId, page, limit)
      );
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch watches for make ${makeId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  },

  // 4. Get paginated watches by model
  getWatchesByModel: async (
    modelId: number,
    page: number = 1,
    limit: number = 20
  ): Promise<WatchesListResponse> => {
    try {
      const response = await rapidApiClient.get<WatchesListResponse>(
        API_ENDPOINTS.WATCHES.WATCHES_BY_MODEL(modelId, page, limit)
      );
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch watches for model ${modelId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  },

  // 5. Get full watch details
  getWatchDetails: async (watchId: number): Promise<WatchDetailsResponse> => {
    try {
      const response = await rapidApiClient.get<WatchDetailsResponse>(
        API_ENDPOINTS.WATCHES.WATCH_DETAILS(watchId)
      );
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch watch details for ${watchId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  },
};
