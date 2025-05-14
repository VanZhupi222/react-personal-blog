export interface Translations {
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
      };
      steam: {
        title: string;
        status: string;
        placeholder: string;
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
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
}
