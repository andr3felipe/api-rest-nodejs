import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { ListTransactionsUseCase } from '@/use-cases/transactions/list-transactions'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const { sessionId } = request.cookies

  const transactionRepository = new PrismaTransactionsRepository()
  const listTransactionsUseCase = new ListTransactionsUseCase(
    transactionRepository,
  )

  // eslint-disable-next-line prettier/prettier
  const transactions = await listTransactionsUseCase.execute(sessionId!)

  return reply.status(200).send(transactions)
}
