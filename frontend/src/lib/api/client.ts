import { API_CONFIG } from './config';

interface RequestOptions extends RequestInit {
  body?: any;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { body, headers, ...restOptions } = options;

    const config: RequestInit = {
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Request failed with status ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

class RapidApiClient {
  private baseURL: string;
  private apiKey: string;
  private host: string;

  constructor(baseURL: string, apiKey: string, host: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.host = host;
  }

  private getHeaders(contentType: string = 'application/json'): HeadersInit {
    return {
      'Content-Type': contentType,
      'x-rapidapi-host': this.host,
      'x-rapidapi-key': this.apiKey,
    };
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }

  async post<T>(endpoint: string, body: URLSearchParams): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders('application/x-www-form-urlencoded'),
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient(API_CONFIG.BASE_URL);
export const rapidApiClient = new RapidApiClient(
  API_CONFIG.RAPIDAPI.BASE_URL,
  API_CONFIG.RAPIDAPI.KEY,
  API_CONFIG.RAPIDAPI.HOST
);
