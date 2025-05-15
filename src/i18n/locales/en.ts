import { Translations } from '../types';

const en: Translations = {
  welcome: {
    name: 'Shijie Fan | 范世杰',
    nickname: 'Zhupi222',
    role: {
      fullstack: 'Full-stack Developer',
      tech: 'Tech Enthusiast',
      game: 'Game Lover',
    },
    enter: 'Enter',
    techStack: {
      title: 'Tech Stack',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    projects: {
      title: 'Featured Projects',
      items: [
        {
          title: 'Project 1',
          description: 'Description of project 1',
        },
        {
          title: 'Project 2',
          description: 'Description of project 2',
        },
      ],
    },
    contact: {
      title: 'Get In Touch',
      description: 'Feel free to reach out for collaborations or just a friendly hello',
      platforms: ['GitHub', 'LinkedIn', 'Email'],
    },
  },
  home: {
    title: 'Home',
    welcome: 'Welcome to My Space',
    description: 'Full-stack developer passionate about creating meaningful digital experiences.',
    enter: 'Enter',
    role: {
      fullstack: 'Full-stack Developer',
      tech: 'Tech Enthusiast',
      game: 'Game Lover',
    },
    features: {
      about: {
        title: 'About Me',
        description: 'Learn more about my journey, skills, and experiences.',
        action: 'View Profile',
      },
      projects: {
        title: 'Projects',
        description: 'Explore my portfolio of work and side projects.',
        action: 'View Projects',
      },
      blog: {
        title: 'Code Blog',
        description: 'Technical articles, tutorials, and code snippets.',
        action: 'Read Posts',
      },
    },
    activity: {
      title: 'Activity Tracking',
      leetcode: {
        title: 'LeetCode Stats',
        status: 'Coming Soon',
        placeholder: 'LeetCode statistics will be displayed here',
        statsTitle: 'Statistics',
        totalSolved: 'Total Solved',
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
        acceptanceRate: 'Acceptance Rate',
        ranking: 'Ranking',
        completion: 'Completion',
        reputation: 'Reputation',
      },
      steam: {
        title: 'Steam Achievements',
        status: 'Coming Soon',
        placeholder: 'Steam achievements will be displayed here',
      },
    },
  },
  about: {
    title: 'About Me',
    description: 'Full-stack developer passionate about creating meaningful digital experiences.',
    skills: {
      title: 'Skills',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        devops: 'DevOps',
        tools: 'Tools',
      },
    },
    experience: {
      title: 'Experience',
    },
  },
  projects: {
    title: 'Projects',
    description: 'A collection of my recent work and personal projects.',
    highlights: 'Key Highlights',
  },
  blog: {
    title: 'Blog',
    description: 'Technical articles, tutorials, and code snippets to help you learn and grow.',
    readMore: 'Read More',
  },
  contact: {
    title: 'Contact',
  },
  notFound: {
    title: '404',
    description: 'Sorry, the page you are looking for might have been moved or does not exist.',
    backHome: 'Back to Home',
  },
};

export default en;
