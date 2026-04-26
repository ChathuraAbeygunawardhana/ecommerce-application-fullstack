import { apiClient } from '../api/client';

export interface Analytics {
  users: {
    total: number;
    customers: number;
    admins: number;
  };
  products: {
    total: number;
  };
  watches: {
    total: number;
  };
  recent_customers: Array<{
    id: number;
    full_name: string | null;
    email: string;
    is_active: boolean;
  }>;
}

export interface User {
  id: number;
  full_name: string | null;
  email: string;
  role: string;
}

export const adminService = {
  getAnalytics: async (): Promise<Analytics> => {
    return apiClient.get<Analytics>('/api/admin/analytics');
  },

  getAllUsers: async (skip: number = 0, limit: number = 50): Promise<User[]> => {
    return apiClient.get<User[]>(`/api/admin/users?skip=${skip}&limit=${limit}`);
  },

  getCustomers: async (skip: number = 0, limit: number = 50): Promise<User[]> => {
    return apiClient.get<User[]>(`/api/admin/customers?skip=${skip}&limit=${limit}`);
  },
};
