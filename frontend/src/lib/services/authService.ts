import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/config';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: number;
  full_name: string | null;
  email: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface UserResponse {
  id: number;
  full_name: string | null;
  email: string;
  role: string;
}

export const authService = {
  signIn: async (credentials: SignInRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGN_IN, credentials);
    // Store token in localStorage
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  signUp: async (userData: SignUpRequest): Promise<UserResponse> => {
    return apiClient.post<UserResponse>(API_ENDPOINTS.AUTH.SIGN_UP, userData);
  },

  signOut: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('access_token');
  },

  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  },
};
