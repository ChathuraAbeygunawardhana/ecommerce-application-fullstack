import { useQuery } from '@tanstack/react-query';
import { watchService, type Watch, type SearchWatchesRequest } from '../services/watchService';
import type {
  MakesResponse,
  ModelsResponse,
  WatchesListResponse,
  WatchDetailsResponse,
} from '../types/watch.types';

// Existing search hook
export const useSearchWatches = (params: SearchWatchesRequest, enabled: boolean = true) => {
  return useQuery<Watch[], Error>({
    queryKey: ['watches', params.searchTerm, params.page, params.limit],
    queryFn: () => watchService.searchWatches(params),
    enabled: enabled && !!params.searchTerm,
  });
};

// 1. Hook to get all watch makes
export const useWatchMakes = () => {
  return useQuery<MakesResponse, Error>({
    queryKey: ['watchMakes'],
    queryFn: () => watchService.getMakes(),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};

// 2. Hook to get models by make ID
export const useModelsByMake = (makeId: number | null, enabled: boolean = true) => {
  return useQuery<ModelsResponse, Error>({
    queryKey: ['watchModels', makeId],
    queryFn: () => watchService.getModelsByMake(makeId!),
    enabled: enabled && makeId !== null,
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });
};

// 3. Hook to get paginated watches by make
export const useWatchesByMake = (
  makeId: number | null,
  page: number = 1,
  limit: number = 20,
  enabled: boolean = true
) => {
  return useQuery<WatchesListResponse, Error>({
    queryKey: ['watchesByMake', makeId, page, limit],
    queryFn: () => watchService.getWatchesByMake(makeId!, page, limit),
    enabled: enabled && makeId !== null,
    keepPreviousData: true,
  });
};

// 4. Hook to get paginated watches by model
export const useWatchesByModel = (
  modelId: number | null,
  page: number = 1,
  limit: number = 20,
  enabled: boolean = true
) => {
  return useQuery<WatchesListResponse, Error>({
    queryKey: ['watchesByModel', modelId, page, limit],
    queryFn: () => watchService.getWatchesByModel(modelId!, page, limit),
    enabled: enabled && modelId !== null,
    keepPreviousData: true,
  });
};

// 5. Hook to get full watch details
export const useWatchDetails = (watchId: number | null, enabled: boolean = true) => {
  return useQuery<WatchDetailsResponse, Error>({
    queryKey: ['watchDetails', watchId],
    queryFn: () => watchService.getWatchDetails(watchId!),
    enabled: enabled && watchId !== null,
  });
};
