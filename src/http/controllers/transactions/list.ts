import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { ListTransactionsUseCase } from '@/use-cases/list-transactions'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  const transactionRepository = new PrismaTransactionsRepository()
  const listTransactionsUseCase = new ListTransactionsUseCase(
    transactionRepository,
  )

  const transactions = await listTransactionsUseCase.execute()

  return reply.status(200).send(transactions)
}
