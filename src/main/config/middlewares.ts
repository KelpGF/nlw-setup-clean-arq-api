import { FastifyInstance } from 'fastify'
import { cors } from '@/main/middleware/cors'

export default (app: FastifyInstance): void => {
  void app.register(cors)
}
