// API 基础配置
export const API_CONFIG = {
  // 基础 URL
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  
  // LeetCode API
  LEETCODE: {
    BASE: 'https://leetcode-stats-api.herokuapp.com',
    USER_STATS: (username: string) => `/users/${username}`,
  },

  // Steam API（后续添加）
  STEAM: {
    BASE: 'https://api.steampowered.com',
    // 待添加具体端点
  },
} as const;

// API 超时配置
export const API_TIMEOUT = {
  DEFAULT: 10000,
  LONG: 30000,
} as const;

// API 错误消息
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: '网络错误，请检查您的网络连接',
  SERVER_ERROR: '服务器错误，请稍后重试',
  TIMEOUT_ERROR: '请求超时，请稍后重试',
  NOT_FOUND: '请求的资源不存在',
  UNAUTHORIZED: '未授权，请先登录',
  FORBIDDEN: '无权访问该资源',
} as const;

// HTTP 状态码
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const; 