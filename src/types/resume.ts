export interface Education {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  description?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  highlights: string[]
}

export interface Project {
  id: string
  name: string
  role: string
  url?: string
  startDate: string
  endDate: string
  description: string
  highlights: string[]
}

export interface CustomSectionItem {
  key: string
  value: string
}

export interface CustomSection {
  id: string
  title: string
  items: CustomSectionItem[]
}

export interface ResumeData {
  basics: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    avatar?: string
    summary: string
  }
  education: Education[]
  experience: Experience[]
  skills: string[]
  projects: Project[]
  customSections: CustomSection[]
}

/** 创建默认空的简历数据 */
export function createEmptyResume(): ResumeData {
  return {
    basics: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    customSections: [],
  }
}
