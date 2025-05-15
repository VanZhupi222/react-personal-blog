import { request } from './axios';
import type { LeetCodeStats, LeetCodeResponse } from '@/lib/leetcode/types';
import { parseLeetCodeStats } from '@/lib/leetcode/parser';

class LeetCodeAPI {
  private readonly baseURL = '/api/leetcode';
  private readonly query = `
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
          totalSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
          reputation
          starRating
        }
      }
      allQuestionsCount {
        difficulty
        count
      }
    }
  `;

  async getUserStats(username: string): Promise<LeetCodeStats> {
    try {
      const data = await request.post<{ data: LeetCodeResponse }>(this.baseURL, {
        query: this.query,
        variables: { username },
      });

      return parseLeetCodeStats(data.data);
    } catch (error) {
      throw new Error(`Failed to fetch LeetCode stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * TODO: 获取用户最近的提交记录功能待实现
   */
  // public async getRecentSubmissions(username: string, limit: number = 10) {
  //   return [];
  // }
}

export const leetcodeAPI = new LeetCodeAPI();

// 导出默认实例
export default leetcodeAPI;
