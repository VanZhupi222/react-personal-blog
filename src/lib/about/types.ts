import { Locale } from '@/i18n/types';

export interface Skills {
  frontend: string[];
  backend: string[];
  devops: string[];
  tools: string[];
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  description: string;
  achievements: string[];
  period?: string;
}

export interface AboutData {
  skills: {
    [key in Locale]: Skills | null;
  };
  experiences: {
    [key in Locale]: Experience[] | null;
  };
}

export interface RawSkillsData {
  language: Locale;
  skills: Skills;
}

export interface RawExperiencesData {
  language: Locale;
  experiences: Experience[];
}

export interface RawAboutData {
  skills: RawSkillsData[];
  experiences: RawExperiencesData[];
}
