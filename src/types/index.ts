export interface NavItem {
  label: string
  href: string
}

export interface Skill {
  name: string
  icon: string
}

export interface SkillCategory {
  title: string
  description: string
  skills: Skill[]
}

export interface Service {
  title: string
  /** HTTP-style method badge, e.g. 'POST' */
  method: 'GET' | 'POST' | 'PUT' | 'DEPLOY'
  /** API-endpoint style path, e.g. '/api/v1/backend' */
  endpoint: string
  description: string
}

export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  category: 'backend' | 'fullstack' | 'frontend'
  imagePosition: 'left' | 'right'
  /** Tech stack chips shown under the description */
  stack?: string[]
}
