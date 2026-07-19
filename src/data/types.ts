export interface ResumeRole {
  title: string;
  start: string;
  end: string;
  description: string;
}

export interface ResumeExperience {
  company: string;
  location: string;
  roles: ResumeRole[];
  note?: string;
}

export interface ResumeData {
  meta: {
    last_updated: string;
  };
  profile: {
    name: string;
    headline: string;
    location: string;
    summary: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  top_skills: string[];
  experience: ResumeExperience[];
  military_service: {
    branch: string;
    unit: string;
    rank: string;
    mos: string;
    service_period: string;
    deployment: {
      operation: string;
      location: string;
      type: string;
    };
    additional_qualifications: string[];
    description: string;
  };
  education: Array<{
    institution: string;
    credential: string;
    start: string;
    end: string;
    status: string;
  }>;
  github_config: {
    username: string;
  };
}

export interface Highlight {
  id: string;
  title: string;
  org: string;
  period: string;
  blurb: string;
  tag: string;
}
