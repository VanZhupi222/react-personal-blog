// Configuration Errors
export const CONFIG_ERRORS = {
  STEAM_API_KEY_MISSING: 'Steam API key is not configured',
  STEAM_ID_MISSING: 'Steam ID is not configured',
  LEETCODE_USERNAME_MISSING: 'LeetCode username is not configured',
  MONGODB_URI_MISSING: 'MongoDB URI is not configured',
} as const;

// API Errors
export const API_ERRORS = {
  STEAM_API_ERROR: 'Failed to fetch Steam data',
  LEETCODE_API_ERROR: 'Failed to fetch LeetCode data',
  MONGODB_ERROR: 'Database operation failed',
  STEAM_PROFILE_NOT_FOUND: 'Steam profile not found',
  STEAM_ACHIEVEMENTS_FETCH_FAILED: 'Failed to fetch achievements for app',
  STEAM_SCHEMA_FETCH_FAILED: 'Failed to fetch schema for app',
  STEAM_GLOBAL_ACHIEVEMENTS_FETCH_FAILED: 'Failed to fetch global achievement rarity for app',
  STEAM_USER_STATS_FETCH_FAILED: 'Failed to get user stats',
} as const;

// Validation Errors
export const VALIDATION_ERRORS = {
  INVALID_APP_ID: 'Invalid app ID',
  INVALID_LANGUAGE: 'Invalid language code',
  INVALID_DATE: 'Invalid date format',
} as const;
