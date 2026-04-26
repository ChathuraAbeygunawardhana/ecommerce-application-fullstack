import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/config';
import type {
  MakesResponse,
  ModelsResponse,
  WatchesListResponse,
  Watch,
} from '../types/watch.types';

export interface SearchWatchesParams {
  search?: string;
  make?: string;
  model?: string;
  page?: number;
  limit?: number;
}

export const watchService = {
  // Get all watches with optional filters
  getWatches: async (params: SearchWatchesParams = {}): Promise<WatchesListResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.make) queryParams.append('make', params.make);
    if (params.model) queryParams.append('model', params.model);
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `${API_ENDPOINTS.WATCHES.LIST}?${queryParams.toString()}`;
    return apiClient.get<WatchesListResponse>(endpoint);
  },

  // Search watches by term
  searchWatches: async (searchTerm: string, page: number = 1, limit: number = 20): Promise<WatchesListResponse> => {
    return watchService.getWatches({ search: searchTerm, page, limit });
  },

  // Get all watch makes
  getMakes: async (): Promise<MakesResponse> => {
    return apiClient.get<MakesResponse>(API_ENDPOINTS.WATCHES.MAKES);
  },

  // Get all models, optionally filtered by make
  getModels: async (make?: string): Promise<ModelsResponse> => {
    const endpoint = make 
      ? `${API_ENDPOINTS.WATCHES.MODELS}?make=${encodeURIComponent(make)}`
      : API_ENDPOINTS.WATCHES.MODELS;
    return apiClient.get<ModelsResponse>(endpoint);
  },

  // Get watches by make
  getWatchesByMake: async (
    makeName: string,
    page: number = 1,
    limit: number = 20
  ): Promise<WatchesListResponse> => {
    return watchService.getWatches({ make: makeName, page, limit });
  },

  // Get watches by model
  getWatchesByModel: async (
    modelName: string,
    page: number = 1,
    limit: number = 20
  ): Promise<WatchesListResponse> => {
    return watchService.getWatches({ model: modelName, page, limit });
  },

  // Get full watch details
  getWatchDetails: async (watchId: number): Promise<Watch> => {
    return apiClient.get<Watch>(API_ENDPOINTS.WATCHES.DETAILS(watchId));
  },
};
