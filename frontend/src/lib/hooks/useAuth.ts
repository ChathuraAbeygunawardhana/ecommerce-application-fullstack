import { useMutation } from '@tanstack/react-query';
import { authService, type SignInRequest, type SignUpRequest, type AuthResponse } from '../services/authService';

export const useSignIn = () => {
  return useMutation<AuthResponse, Error, SignInRequest>({
    mutationFn: (credentials) => authService.signIn(credentials),
    onSuccess: (data) => {
      localStorage.setItem('user', JSON.stringify(data.user));
    },
  });
};

export const useSignUp = () => {
  return useMutation<AuthResponse, Error, SignUpRequest>({
    mutationFn: (userData) => authService.signUp(userData),
  });
};
