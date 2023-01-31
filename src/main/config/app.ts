import fastify from 'fastify'
import setupMiddleware from './middlewares'

const app = fastify()
setupMiddleware(app)
export default app
