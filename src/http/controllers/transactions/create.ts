import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { CreateTransactionUseCase } from '@/use-cases/transactions/create-transaction'
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTransactionBodySchema = z.object({
    title: z.string(),
    amount: z.coerce.number(),
    type: z.enum(['deposit', 'withdraw']),
  })

  const { title, amount, type } = createTransactionBodySchema.parse(
    request.body,
  )

  let sessionId = request.cookies.sessionId

  if (!sessionId) {
    sessionId = randomUUID()

    reply.cookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  }

  const transactionsRepository = new PrismaTransactionsRepository()
  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionsRepository,
  )

  await createTransactionUseCase.execute({
    title,
    amount: type === 'deposit' ? amount : amount * -1,
    sessionId,
  })

  return reply.status(201).send()
}
