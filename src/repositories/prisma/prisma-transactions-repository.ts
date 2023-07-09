import { prisma } from '@/lib/prisma/prisma'
import { Prisma } from '@prisma/client'
import { TransactionsRepository } from '../transactions-repository'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: Prisma.TransactionCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
    })

    return transaction
  }

  async list() {
    const transactions = await prisma.transaction.findMany()

    return transactions
  }

  async findById(id: number) {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id,
      },
    })

    if (!transaction) {
      return null
    }

    return transaction
  }

  async summary() {
    const { _sum: summary } = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
    })

    return summary
  }
}
