// LeetCode 统计数据接口
export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

// API 响应接口
export interface LeetCodeResponse {
  matchedUser: {
    submitStats: {
      acSubmissionNum: Array<{
        difficulty: string;
        count: number;
      }>;
      totalSubmissionNum: Array<{
        difficulty: string;
        count: number;
      }>;
    };
    profile: {
      ranking: number;
      reputation: number;
      starRating: number;
    };
  };
}
