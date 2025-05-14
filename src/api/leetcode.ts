import axios from 'axios';
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
    }
  `;

  async getUserStats(username: string): Promise<LeetCodeStats> {
    try {
      const { data } = await axios.post<{ data: LeetCodeResponse }>(this.baseURL, {
        query: this.query,
        variables: { username }
      });

      return parseLeetCodeStats(data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch LeetCode stats: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * 获取用户最近的提交记录
   * @param username LeetCode 用户名
   * @param limit 限制返回的记录数量
   */
  public async getRecentSubmissions(username: string, limit: number = 10) {
    // TODO: 实现获取最近提交记录的功能
    return [];
  }
}

export const leetcodeAPI = new LeetCodeAPI();

// 导出默认实例
export default leetcodeAPI; 