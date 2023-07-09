import { FastifyInstance } from 'fastify'
import { create } from './create'
import { list } from './list'
import { get } from './get'
import { summary } from './summary'
import { checkSessionIdExists } from '@/http/middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/transaction', create)
  app.get('/transactions', { preHandler: [checkSessionIdExists] }, list)
  app.get('/summary', { preHandler: [checkSessionIdExists] }, summary)
  app.get('/transaction/:id', { preHandler: [checkSessionIdExists] }, get)
}
