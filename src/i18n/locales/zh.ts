import { Translations } from '../types';

const zh: Translations = {
  home: {
    title: '首页',
    welcome: '欢迎来到我的空间',
    description: '热衷于创造有意义的数字体验的全栈开发者。',
    enter: '进入',
    role: {
      fullstack: '全栈开发者',
      tech: '技术爱好者',
      game: '游戏玩家',
    },
    features: {
      about: {
        title: '关于我',
        description: '了解我的经历、技能和经验。',
        action: '查看简介',
      },
      projects: {
        title: '项目',
        description: '探索我的作品集和个人项目。',
        action: '查看项目',
      },
      blog: {
        title: '技术博客',
        description: '技术文章、教程和代码片段。',
        action: '阅读文章',
      },
    },
    activity: {
      title: '活动追踪',
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
        placeholder: '这里将显示 Steam 成就信息',
      },
    },
  },
  about: {
    title: '关于我',
    description: '热衷于创造有意义的数字体验的全栈开发者。',
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
    description: '我最近的工作和个人项目集合。',
    highlights: '主要亮点',
  },
  blog: {
    title: '博客',
    description: '技术文章、教程和代码片段，助您学习和成长。',
    readMore: '阅读更多',
  },
  contact: {
    title: '联系我',
  },
  notFound: {
    title: '404',
    description: '抱歉，您要找的页面可能已经被移动或不存在',
    backHome: '返回首页',
  },
};

export default zh;
