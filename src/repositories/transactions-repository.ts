import { Prisma, Transaction } from '@prisma/client'

export interface findByIdProps {
  id: number
  sessionId: string
}

export interface TransactionsRepository {
  create(data: Prisma.TransactionCreateInput): Promise<Transaction>
  list(sessionId: string): Promise<Transaction[]>
  findById({ id, sessionId }: findByIdProps): Promise<Transaction | null>
  summary(sessionId: string): Promise<{ amount: Prisma.Decimal | null }>
}
