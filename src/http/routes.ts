import { FastifyInstance } from 'fastify'
import { authenticate, register } from './controllers'

export async function routes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
