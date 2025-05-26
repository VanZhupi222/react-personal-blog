export const leetcodeQuery = `
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
