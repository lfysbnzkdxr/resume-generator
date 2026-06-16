export interface Education {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
}

export interface Project {
  id: string
  name: string
  role: string
  startDate: string
  endDate: string
  description: string
  highlights: string[]
}

export interface Competition {
  id: string
  name: string
  role: string
  date: string
  description: string
  highlights: string[]
}

export interface Award {
  id: string
  name: string
  date: string
  description: string
}

export const BASIC_FIELD_KEYS = ['name', 'title', 'phone', 'email', 'location', 'birthday'] as const
export type BasicFieldKey = typeof BASIC_FIELD_KEYS[number]

export const BASIC_FIELD_LABELS: Record<BasicFieldKey, string> = {
  name: '姓名',
  title: '专业',
  phone: '电话',
  email: '邮箱',
  location: '地址',
  birthday: '生日',
}

const BASIC_FIELD_PLACEHOLDERS: Record<BasicFieldKey, string> = {
  name: '张三',
  title: '前端开发工程师',
  phone: '138-0000-0000',
  email: 'zhangsan@example.com',
  location: '北京市',
  birthday: '2000-01',
}

export function getBasicFieldLabel(key: string): string {
  return BASIC_FIELD_LABELS[key as BasicFieldKey] || key
}

export function getBasicFieldPlaceholder(key: string): string {
  return BASIC_FIELD_PLACEHOLDERS[key as BasicFieldKey] || ''
}

export interface ResumeData {
  basics: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    birthday: string
    avatar?: string
    summary: string
  }
  basicsFieldOrder: string[]
  education: Education[]
  projects: Project[]
  competitions: Competition[]
  awards: Award[]
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
      birthday: '',
      summary: '',
    },
    basicsFieldOrder: [...BASIC_FIELD_KEYS],
    education: [],
    projects: [],
    competitions: [],
    awards: [],
  }
}
