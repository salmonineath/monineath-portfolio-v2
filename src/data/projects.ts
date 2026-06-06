import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 1,
    title: 'Example Project',
    subtitle: 'REST API Service',
    description:
      'A production-style REST API with JWT authentication, role-based access control, request validation and rate limiting. Fully documented endpoints with automated tests and database migrations.',
    category: 'backend',
    imagePosition: 'left',
    stack: ['Node.js', 'Express', 'MySQL', 'JWT'],
  },
  {
    id: 2,
    title: 'Example Project',
    subtitle: 'Data Pipeline',
    description:
      'A background job system that ingests, transforms and stores data on a schedule. Queue-based processing with retries, dead-letter handling and a small dashboard to monitor job health.',
    category: 'backend',
    imagePosition: 'right',
    stack: ['Spring Boot', 'MongoDB', 'Cron'],
  },
  {
    id: 3,
    title: 'Example Project',
    subtitle: 'Full-Stack App',
    description:
      'An end-to-end web application — React front-end backed by an Express API and SQL database. Auth, CRUD, file uploads and deployment, built and shipped as one coherent system.',
    category: 'fullstack',
    imagePosition: 'left',
    stack: ['React', 'Express', 'SQL'],
  },
]
