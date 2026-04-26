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

export interface Watch {
  id: number;
  make_name: string;
  model_name: string;
  family_name?: string | null;
  year_produced?: string | null;
  reference?: string | null;
  movement_name?: string | null;
  case_material?: string | null;
  case_diameter?: string | null;
  dial_color?: string | null;
  price_euro?: number | null;
  description?: string | null;
  image_url?: string | null;
  functions?: string | null;
  limited_edition?: string | null;
  water_resistance?: string | null;
}

export interface WatchCreate {
  make_name: string;
  model_name: string;
  family_name?: string | null;
  year_produced?: string | null;
  reference?: string | null;
  movement_name?: string | null;
  case_material?: string | null;
  case_diameter?: string | null;
  dial_color?: string | null;
  price_euro?: number | null;
  description?: string | null;
  image_url?: string | null;
  functions?: string | null;
  limited_edition?: string | null;
  water_resistance?: string | null;
}

export interface WatchUpdate {
  make_name?: string;
  model_name?: string;
  family_name?: string | null;
  year_produced?: string | null;
  reference?: string | null;
  movement_name?: string | null;
  case_material?: string | null;
  case_diameter?: string | null;
  dial_color?: string | null;
  price_euro?: number | null;
  description?: string | null;
  image_url?: string | null;
  functions?: string | null;
  limited_edition?: string | null;
  water_resistance?: string | null;
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

  // Watch management
  getAllWatches: async (page: number = 1, limit: number = 50): Promise<any> => {
    return apiClient.get<any>(`/api/watches?page=${page}&limit=${limit}`);
  },

  createWatch: async (watch: WatchCreate): Promise<Watch> => {
    return apiClient.post<Watch>('/api/watches', watch);
  },

  updateWatch: async (id: number, watch: WatchUpdate): Promise<Watch> => {
    return apiClient.put<Watch>(`/api/watches/${id}`, watch);
  },

  deleteWatch: async (id: number): Promise<void> => {
    return apiClient.delete<void>(`/api/watches/${id}`);
  },
};
