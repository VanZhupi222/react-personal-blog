import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 响应拦截器
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 统一处理错误
    if (error.response) {
      // 服务器返回错误状态码
      console.error('Response Error:', error.response.data);
    } else if (error.request) {
      // 请求发出但没有收到响应
      console.error('Request Error:', error.request);
    } else {
      // 请求配置出错
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export { instance as axios };
