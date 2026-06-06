import type { SkillCategory } from '../types'

export const skillCategories: SkillCategory[] = [
  {
    title: 'Back-end',
    description:
      'My core craft — designing and building REST APIs, authentication flows, background jobs and service architecture that stay fast and reliable under load.',
    skills: [
      { name: 'Node.js', icon: 'No' },
      { name: 'Express', icon: 'Ex' },
      { name: 'Java Spring Boot', icon: 'Sp' },
    ],
  },
  {
    title: 'Database',
    description:
      'Schema design, query optimization and data modeling. Comfortable across relational and document stores — indexes, transactions and migrations included.',
    skills: [
      { name: 'SQL', icon: 'SQ' },
      { name: 'MySQL', icon: 'My' },
      { name: 'MongoDB', icon: 'Mo' },
    ],
  },
  {
    title: 'Front-end',
    description:
      'Enough front-end to ship the full feature — building clean React/Vue interfaces that consume the APIs I design, end to end.',
    skills: [
      { name: 'JavaScript', icon: 'JS' },
      { name: 'React', icon: 'Re' },
      { name: 'Vue.js', icon: 'Vu' },
      { name: 'Next.js', icon: 'Ne' },
    ],
  },
]
