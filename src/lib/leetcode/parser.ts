import type { LeetCodeResponse, LeetCodeStats } from './types';

export function parseLeetCodeStats(data: LeetCodeResponse): LeetCodeStats {
  const stats = data.matchedUser;
  const acSubmissions = stats.submitStats.acSubmissionNum;
  const allQuestions = data.allQuestionsCount;

  // 计算各难度的解题数
  const easySolved = acSubmissions.find((s) => s.difficulty === 'Easy')?.count || 0;
  const mediumSolved = acSubmissions.find((s) => s.difficulty === 'Medium')?.count || 0;
  const hardSolved = acSubmissions.find((s) => s.difficulty === 'Hard')?.count || 0;

  // 计算各难度的总题数
  const totalEasy = allQuestions.find((q) => q.difficulty === 'Easy')?.count || 0;
  const totalMedium = allQuestions.find((q) => q.difficulty === 'Medium')?.count || 0;
  const totalHard = allQuestions.find((q) => q.difficulty === 'Hard')?.count || 0;

  // 计算接受率
  const totalSolved = easySolved + mediumSolved + hardSolved;
  const totalQuestions = totalEasy + totalMedium + totalHard;
  const acceptanceRate = totalSolved > 0 ? (totalSolved / totalQuestions) * 100 : 0;

  return {
    totalSolved,
    totalQuestions,
    easySolved,
    totalEasy,
    mediumSolved,
    totalMedium,
    hardSolved,
    totalHard,
    acceptanceRate,
    ranking: stats.profile.ranking,
    contributionPoints: stats.profile.starRating,
    reputation: stats.profile.reputation,
  };
}
