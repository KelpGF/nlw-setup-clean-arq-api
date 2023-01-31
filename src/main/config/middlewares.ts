import { FastifyInstance } from 'fastify'
import { cors } from '@/main/middleware'

export default (app: FastifyInstance): void => {
  void app.register(cors)
}
