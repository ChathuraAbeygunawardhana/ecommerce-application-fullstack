import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../services/adminService';
import type { WatchCreate, WatchUpdate } from '../services/adminService';

export const useAnalytics = () => {
  return useQuery({
    queryKey: ['admin', 'analytics'],
    queryFn: () => adminService.getAnalytics(),
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => adminService.getAllUsers(),
  });
};

export const useCustomers = () => {
  return useQuery({
    queryKey: ['admin', 'customers'],
    queryFn: () => adminService.getCustomers(),
  });
};

export const useAdminWatches = (page: number = 1, limit: number = 50) => {
  return useQuery({
    queryKey: ['admin', 'watches', page, limit],
    queryFn: () => adminService.getAllWatches(page, limit),
  });
};

export const useCreateWatch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (watch: WatchCreate) => adminService.createWatch(watch),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'watches'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'analytics'] });
    },
  });
};

export const useUpdateWatch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, watch }: { id: number; watch: WatchUpdate }) => 
      adminService.updateWatch(id, watch),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'watches'] });
    },
  });
};

export const useDeleteWatch = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => adminService.deleteWatch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'watches'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'analytics'] });
    },
  });
};
