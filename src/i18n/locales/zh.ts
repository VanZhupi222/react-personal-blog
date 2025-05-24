import { Translations } from '../types';

const zh: Translations = {
  common: {
    refresh: '刷新',
    error: {
      title: '哎呀！出错了。',
      message: '别担心，你可以再试一次！',
      retry: '重试',
    },
    update: {
      title: '发现新版本',
      message: '请刷新页面以获取最新内容',
      refresh: '立即刷新',
    },
  },
  welcome: {
    name: 'Shijie Fan | 范世杰',
    nickname: 'Zhupi222',
    role: {
      fullstack: '全栈开发者',
      tech: '技术爱好者',
      game: '游戏玩家',
    },
    enter: '进入',
    techStack: {
      title: '技术栈',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    projects: {
      title: '精选项目',
      items: [
        {
          title: '个人博客主页',
          description: '一个现代化的个人网站，基于 Next.js、React 和 MongoDB 构建。',
        },
        {
          title: '日历组件',
          description:
            '在Salesforce中使用 LWC (Lightning Web Component)写的基于原生html、css、javascript的日历组件',
        },
      ],
    },
    contact: {
      title: '联系我',
      description: '无论是项目合作还是友好交流，都欢迎联系我',
      platforms: ['GitHub', '微信', '邮箱'],
    },
  },
  home: {
    title: '首页',
    welcome: '欢迎来到我的空间',
    description: '热衷于创造有意义的数字体验的全栈开发者',
    enter: '进入',
    role: {
      fullstack: '全栈开发者',
      tech: '技术爱好者',
      game: '游戏玩家',
    },
    features: {
      about: {
        title: '关于我',
        description: '了解我的经历、技能和经验',
        action: '查看简介',
      },
      projects: {
        title: '项目',
        description: '探索我的作品集和个人项目',
        action: '查看项目',
      },
      blog: {
        title: '技术博客',
        description: '技术文章、教程和代码片段',
        action: '阅读文章',
      },
    },
    activity: {
      title: '业余活动',
      leetcode: {
        title: 'LeetCode 统计',
        status: '即将推出',
        placeholder: '这里将显示 LeetCode 统计信息',
        statsTitle: '统计信息',
        totalSolved: '已解总数',
        easy: '简单',
        medium: '中等',
        hard: '困难',
        acceptanceRate: '完成率',
        ranking: '排名',
        completion: '完成率',
        reputation: '声望',
      },
      steam: {
        title: 'Steam 成就',
        status: '即将推出',
        placeholder: 'Steam 成就将在这里显示',
        viewAchievements: '查看成就',
        totalPlaytime: '总游戏时间',
        recentGames: '最近游戏',
        online: '在线',
        offline: '离线',
      },
    },
  },
  about: {
    title: '关于我',
    description: '热衷于创造有意义的数字体验的全栈开发者',
    skills: {
      title: '技能',
      categories: {
        frontend: '前端',
        backend: '后端',
        devops: '运维',
        tools: '工具',
      },
    },
    experience: {
      title: '经验',
    },
  },
  projects: {
    title: '项目',
    description: '我最近的工作和个人项目集合',
    highlights: '主要亮点',
  },
  blog: {
    title: '博客',
    description: '技术文章、经验和实用代码片段',
    readMore: '阅读更多',
  },
  contact: {
    title: '联系',
    github: 'GitHub',
    emails: '邮箱',
    socials: '社交网站',
  },
  notFound: {
    title: '404',
    description: '抱歉，您要找的页面可能已经被移动或不存在',
    backHome: '返回首页',
  },
  achievements: {
    title: '成就进度',
    stats: {
      totalGames: {
        title: '游戏总数',
        subtitle: '游戏时长 >= {hours}小时',
      },
      totalPlaytime: {
        title: '总游戏时长',
        subtitle: '所有游戏',
      },
      achievements: {
        title: '成就',
        subtitle: '完成度 {percentage}',
      },
    },
    gameCard: {
      achievements: '{achieved}/{total} 成就',
    },
    pagination: {
      page: '第 {current} 页，共 {total} 页',
    },
  },
};

export default zh;
