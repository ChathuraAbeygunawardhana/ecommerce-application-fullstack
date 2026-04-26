import { useQuery } from '@tanstack/react-query';
import { adminService } from '../services/adminService';

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
