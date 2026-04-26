export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: '/api/auth/sign-in',
    SIGN_UP: '/api/auth/sign-up'
  },
  WATCHES: {
    LIST: '/api/watches',
    DETAILS: (watchId: number) => `/api/watches/${watchId}`,
    MAKES: '/api/watches/makes',
    MODELS: '/api/watches/models'
  }
} as const;
