export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  RAPIDAPI: {
    BASE_URL: 'https://watch-database1.p.rapidapi.com',
    KEY: process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '970b4fa26fmsh397f674876f86dap1a656cjsna4e0c2863761',
    HOST: 'watch-database1.p.rapidapi.com'
  }
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: '/api/auth/sign-in',
    SIGN_UP: '/api/auth/sign-up'
  },
  WATCHES: {
    SEARCH: '/search-watches-by-name'
  }
} as const;
