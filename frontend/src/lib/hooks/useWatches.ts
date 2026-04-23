import { useQuery } from '@tanstack/react-query';
import { watchService, type Watch, type SearchWatchesRequest } from '../services/watchService';

export const useSearchWatches = (params: SearchWatchesRequest, enabled: boolean = true) => {
  return useQuery<Watch[], Error>({
    queryKey: ['watches', params.searchTerm, params.page, params.limit],
    queryFn: () => watchService.searchWatches(params),
    enabled: enabled && !!params.searchTerm,
  });
};
