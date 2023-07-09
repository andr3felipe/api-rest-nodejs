import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { CreateTransactionUseCase } from '@/use-cases/create-transaction'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTransactionBodySchema = z.object({
    title: z.string(),
    amount: z.coerce.number(),
    type: z.enum(['credit', 'debit']),
  })

  const { title, amount, type } = createTransactionBodySchema.parse(
    request.body,
  )

  const transactionsRepository = new PrismaTransactionsRepository()
  const createTransactionUseCase = new CreateTransactionUseCase(
    transactionsRepository,
  )

  await createTransactionUseCase.execute({
    title,
    amount: type === 'credit' ? amount : amount * -1,
  })

  return reply.status(201).send()
}
