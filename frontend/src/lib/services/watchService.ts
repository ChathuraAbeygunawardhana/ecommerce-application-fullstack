import { rapidApiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/config';

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
};
