import type { Service } from '../types'

export const services: Service[] = [
  {
    title: 'API Development',
    method: 'POST',
    endpoint: '/api/v1/services',
    description:
      'Design and build RESTful APIs with clean contracts, proper status codes, validation and documentation — services other developers actually enjoy integrating with.',
  },
  {
    title: 'Database Design',
    method: 'GET',
    endpoint: '/api/v1/databases',
    description:
      'Schema modeling, indexing strategy and query optimization for SQL and NoSQL stores. Data that stays consistent, queries that stay fast as tables grow.',
  },
  {
    title: 'System Integration',
    method: 'PUT',
    endpoint: '/api/v1/systems',
    description:
      'Connect services, third-party APIs and legacy systems into one reliable pipeline — auth, webhooks, queues and the error handling between them.',
  },
]
