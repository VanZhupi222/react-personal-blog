export type Locale = 'en' | 'zh';

export interface Translations {
  common: {
    refresh: string;
    error: {
      title: string;
      message: string;
      retry: string;
    };
  };
  welcome: {
    name: string;
    nickname: string;
    role: {
      fullstack: string;
      tech: string;
      game: string;
    };
    enter: string;
    techStack: {
      title: string;
      items: string[];
    };
    projects: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    contact: {
      title: string;
      description: string;
      platforms: string[];
    };
  };
  home: {
    title: string;
    welcome: string;
    description: string;
    enter: string;
    role: {
      fullstack: string;
      tech: string;
      game: string;
    };
    features: {
      about: {
        title: string;
        description: string;
        action: string;
      };
      projects: {
        title: string;
        description: string;
        action: string;
      };
      blog: {
        title: string;
        description: string;
        action: string;
      };
    };
    activity: {
      title: string;
      leetcode: {
        title: string;
        status: string;
        placeholder: string;
        statsTitle: string;
        totalSolved: string;
        easy: string;
        medium: string;
        hard: string;
        acceptanceRate: string;
        ranking: string;
        completion: string;
        reputation: string;
      };
      steam: {
        title: string;
        status: string;
        placeholder: string;
        viewAchievements: string;
        totalPlaytime: string;
        recentGames: string;
        online: string;
        offline: string;
      };
    };
  };
  about: {
    title: string;
    description: string;
    skills: {
      title: string;
      categories: {
        frontend: string;
        backend: string;
        devops: string;
        tools: string;
      };
    };
    experience: {
      title: string;
    };
  };
  projects: {
    title: string;
    description: string;
    highlights: string;
  };
  blog: {
    title: string;
    description: string;
    readMore: string;
  };
  contact: {
    title: string;
    github: string;
    emails: string;
    socials: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
  achievements: {
    title: string;
    stats: {
      totalGames: {
        title: string;
        subtitle: string;
      };
      totalPlaytime: {
        title: string;
        subtitle: string;
      };
      achievements: {
        title: string;
        subtitle: string;
      };
    };
    gameCard: {
      achievements: string;
    };
    pagination: {
      page: string;
    };
  };
}
