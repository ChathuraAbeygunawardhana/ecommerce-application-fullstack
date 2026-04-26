import { useQuery } from '@tanstack/react-query';
import { watchService, type SearchWatchesParams } from '../services/watchService';
import type {
  MakesResponse,
  ModelsResponse,
  WatchesListResponse,
  Watch,
} from '../types/watch.types';

// Hook to search watches
export const useSearchWatches = (searchTerm: string, page: number = 1, limit: number = 20, enabled: boolean = true) => {
  return useQuery<WatchesListResponse, Error>({
    queryKey: ['watches', 'search', searchTerm, page, limit],
    queryFn: () => watchService.searchWatches(searchTerm, page, limit),
    enabled: enabled && !!searchTerm,
  });
};

// Hook to get all watches with filters
export const useWatches = (params: SearchWatchesParams = {}, enabled: boolean = true) => {
  return useQuery<WatchesListResponse, Error>({
    queryKey: ['watches', params],
    queryFn: () => watchService.getWatches(params),
    enabled,
  });
};

// Hook to get all watch makes
export const useWatchMakes = () => {
  return useQuery<MakesResponse, Error>({
    queryKey: ['watchMakes'],
    queryFn: () => watchService.getMakes(),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
};

// Hook to get models, optionally filtered by make
export const useWatchModels = (make?: string, enabled: boolean = true) => {
  return useQuery<ModelsResponse, Error>({
    queryKey: ['watchModels', make],
    queryFn: () => watchService.getModels(make),
    enabled,
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });
};

// Hook to get paginated watches by make
export const useWatchesByMake = (
  makeName: string | null,
  page: number = 1,
  limit: number = 20,
  enabled: boolean = true
) => {
  return useQuery<WatchesListResponse, Error>({
    queryKey: ['watchesByMake', makeName, page, limit],
    queryFn: () => watchService.getWatchesByMake(makeName!, page, limit),
    enabled: enabled && !!makeName,
    placeholderData: (previousData) => previousData,
  });
};

// Hook to get paginated watches by model
export const useWatchesByModel = (
  modelName: string | null,
  page: number = 1,
  limit: number = 20,
  enabled: boolean = true
) => {
  return useQuery<WatchesListResponse, Error>({
    queryKey: ['watchesByModel', modelName, page, limit],
    queryFn: () => watchService.getWatchesByModel(modelName!, page, limit),
    enabled: enabled && !!modelName,
    placeholderData: (previousData) => previousData,
  });
};

// Hook to get full watch details
export const useWatchDetails = (watchId: number | null, enabled: boolean = true) => {
  return useQuery<Watch, Error>({
    queryKey: ['watchDetails', watchId],
    queryFn: () => watchService.getWatchDetails(watchId!),
    enabled: enabled && watchId !== null,
  });
};
