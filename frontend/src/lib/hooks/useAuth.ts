import { useMutation } from '@tanstack/react-query';
import { authService, type SignInRequest, type SignUpRequest, type AuthResponse, type UserResponse } from '../services/authService';

export const useSignIn = () => {
  return useMutation<AuthResponse, Error, SignInRequest>({
    mutationFn: (credentials) => authService.signIn(credentials),
  });
};

export const useSignUp = () => {
  return useMutation<UserResponse, Error, SignUpRequest>({
    mutationFn: (userData) => authService.signUp(userData),
  });
};
