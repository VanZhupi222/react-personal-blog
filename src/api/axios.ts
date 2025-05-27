import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_TIMEOUT, API_ERROR_MESSAGES } from './config';

// Create axios instance
const instance: AxiosInstance = axios.create({
  timeout: API_TIMEOUT.DEFAULT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Server returned error status code
      switch (error.response.status) {
        case 401:
          error.message = API_ERROR_MESSAGES.UNAUTHORIZED;
          break;
        case 403:
          error.message = API_ERROR_MESSAGES.FORBIDDEN;
          break;
        case 404:
          error.message = API_ERROR_MESSAGES.NOT_FOUND;
          break;
        case 500:
          error.message = API_ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          error.message = API_ERROR_MESSAGES.NETWORK_ERROR;
      }
    } else if (error.request) {
      // Request sent but no response received
      error.message = API_ERROR_MESSAGES.NETWORK_ERROR;
    } else {
      // Request config error
      error.message = API_ERROR_MESSAGES.UNKNOWN_ERROR;
    }
    return Promise.reject(error);
  }
);

// Wrap request methods
export const request = {
  get: <TResponse, TParams = Record<string, unknown>>(
    url: string,
    config: AxiosRequestConfig<TParams> = {}
  ) => {
    return instance.get<TParams, TResponse>(url, config);
  },
  post: <TResponse, TData = Record<string, unknown>>(
    url: string,
    data: TData = {} as TData,
    config: AxiosRequestConfig<TData> = {}
  ) => {
    return instance.post<TData, TResponse>(url, data, config);
  },
  put: <TResponse, TData = Record<string, unknown>>(
    url: string,
    data: TData = {} as TData,
    config: AxiosRequestConfig<TData> = {}
  ) => {
    return instance.put<TData, TResponse>(url, data, config);
  },
  delete: <TResponse, TParams = Record<string, unknown>>(
    url: string,
    config: AxiosRequestConfig<TParams> = {}
  ) => {
    return instance.delete<TParams, TResponse>(url, config);
  },
  patch: <TResponse, TData = Record<string, unknown>>(
    url: string,
    data: TData = {} as TData,
    config: AxiosRequestConfig<TData> = {}
  ) => {
    return instance.patch<TData, TResponse>(url, data, config);
  },
};

// Export types
export type { AxiosError, AxiosResponse, AxiosRequestConfig };

// Export instance
export default instance;
