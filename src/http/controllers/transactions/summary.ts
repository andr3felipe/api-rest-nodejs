import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { SummaryTransactionsUseCase } from '@/use-cases/summary.transactions'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function summary(request: FastifyRequest, reply: FastifyReply) {
  const transactionRepository = new PrismaTransactionsRepository()
  const summaryTransactionsUseCase = new SummaryTransactionsUseCase(
    transactionRepository,
  )

  const summary = await summaryTransactionsUseCase.execute()

  return summary
}