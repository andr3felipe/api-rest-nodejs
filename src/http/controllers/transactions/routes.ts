import { FastifyInstance } from 'fastify'
import { create } from './create'
import { list } from './list'
import { get } from './get'
import { summary } from './summary'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/transactions', create)
  app.get('/transactions/:id', get)
  app.get('/transactions/summary', summary)
  app.get('/transactions', list)
}
