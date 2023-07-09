import { prisma } from '@/lib/prisma/prisma'
import { Prisma } from '@prisma/client'
import {
  TransactionsRepository,
  findByIdProps,
} from '../transactions-repository'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
    })

    return transaction
  }

  async list(sessionId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        session_id: sessionId,
      },
    })

    return transactions
  }

  async findById({ id, sessionId }: findByIdProps) {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        session_id: sessionId,
      },
    })

    if (!transaction) {
      return null
    }

    return transaction
  }

  async summary(sessionId: string) {
    const { _sum: summary } = await prisma.transaction.aggregate({
      where: {
        session_id: sessionId,
      },
      _sum: {
        amount: true,
      },
    })

    return summary
  }
}
