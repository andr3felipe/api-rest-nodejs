import { Prisma, Transaction } from '@prisma/client'

export interface TransactionsRepository {
  create(data: Prisma.TransactionCreateInput): Promise<Transaction>
  list(): Promise<Transaction[]>
  findById(id: number): Promise<Transaction | null>
  summary(): Promise<{ amount: Prisma.Decimal | null }>
}
