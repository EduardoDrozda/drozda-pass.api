import { FastifyInstance } from 'fastify'
import { register } from './controllers'

export async function routes(app: FastifyInstance) {
  app.post('/users', register)
}
