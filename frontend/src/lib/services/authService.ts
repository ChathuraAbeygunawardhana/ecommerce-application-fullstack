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

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token?: string;
}

export const authService = {
  signIn: async (credentials: SignInRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGN_IN, credentials);
  },

  signUp: async (userData: SignUpRequest): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGN_UP, userData);
  },
};
