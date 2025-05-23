import { AboutData, RawAboutData, Experience } from './types';

export const parseAboutData = (rawData: RawAboutData): AboutData => {
  const skills = {
    en: null as AboutData['skills']['en'],
    zh: null as AboutData['skills']['zh'],
  };
  const experiences = {
    en: [] as Experience[],
    zh: [] as Experience[],
  };

  // 处理技能数据
  rawData.skills.forEach((item) => {
    if (item.language === 'en') {
      skills.en = item.skills;
    } else if (item.language === 'zh') {
      skills.zh = item.skills;
    }
  });

  // 格式化 period 字段
  function formatPeriod(startDate: string, endDate?: string | null) {
    const start = startDate.replace('-', '.');
    const end = endDate ? endDate.replace('-', '.') : 'Present';
    return `${start} - ${end}`;
  }

  // 合并同一语言的所有经验
  rawData.experiences.forEach((item) => {
    const withPeriod = item.experiences.map((exp) => ({
      ...exp,
      period: formatPeriod(exp.startDate, exp.endDate),
    }));
    if (item.language === 'en') {
      experiences.en = experiences.en.concat(withPeriod);
    } else if (item.language === 'zh') {
      experiences.zh = experiences.zh.concat(withPeriod);
    }
  });

  // 按 startDate 降序排序
  const sortByStartDateDesc = (a: Experience, b: Experience) =>
    b.startDate.localeCompare(a.startDate);

  experiences.en.sort(sortByStartDateDesc);
  experiences.zh.sort(sortByStartDateDesc);

  return { skills, experiences };
};
