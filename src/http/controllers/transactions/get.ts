import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { GetTransactionUseCase } from '@/use-cases/get-transaction'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getTransactionBodySchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = getTransactionBodySchema.parse(request.params)

  const sessionIdCookie = request.cookies.sessionId

  const sessionId = sessionIdCookie!

  const transactionRepository = new PrismaTransactionsRepository()
  const getTransactionUseCase = new GetTransactionUseCase(transactionRepository)

  // eslint-disable-next-line prettier/prettier
  const transaction = await getTransactionUseCase.execute({ id, sessionId })

  return reply.status(200).send(transaction)
}
