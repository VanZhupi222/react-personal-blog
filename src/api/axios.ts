import axios, { 
  AxiosInstance, 
  AxiosError, 
  AxiosResponse, 
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_CONFIG, API_TIMEOUT, API_ERROR_MESSAGES } from './config';

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_TIMEOUT.DEFAULT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在这里可以添加认证信息等
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      // 服务器返回错误状态码
      switch (error.response.status) {
        case 401:
          console.error(API_ERROR_MESSAGES.UNAUTHORIZED);
          break;
        case 403:
          console.error(API_ERROR_MESSAGES.FORBIDDEN);
          break;
        case 404:
          console.error(API_ERROR_MESSAGES.NOT_FOUND);
          break;
        case 500:
          console.error(API_ERROR_MESSAGES.SERVER_ERROR);
          break;
        default:
          console.error(API_ERROR_MESSAGES.NETWORK_ERROR);
      }
    } else if (error.request) {
      // 请求发出但没有收到响应
      console.error(API_ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      // 请求配置出错
      console.error('Request config error:', error.message);
    }
    return Promise.reject(error);
  }
);

// 封装请求方法
export const request = {
  get: <T>(url: string, config: AxiosRequestConfig = {}) => {
    return instance.get<any, T>(url, config);
  },
  post: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}) => {
    return instance.post<any, T>(url, data, config);
  },
  put: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}) => {
    return instance.put<any, T>(url, data, config);
  },
  delete: <T>(url: string, config: AxiosRequestConfig = {}) => {
    return instance.delete<any, T>(url, config);
  },
  patch: <T>(url: string, data: any = {}, config: AxiosRequestConfig = {}) => {
    return instance.patch<any, T>(url, data, config);
  },
};

// 导出类型
export type { AxiosError, AxiosResponse, AxiosRequestConfig };

// 导出实例
export default instance; 