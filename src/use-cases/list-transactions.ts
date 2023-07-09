import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface ListTransactionUseCaseResponse {
  transactions: Transaction[]
}

export class ListTransactionsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private transactionRepository: TransactionsRepository) {}

  async execute(sessionId: string): Promise<ListTransactionUseCaseResponse> {
    const transactions = await this.transactionRepository.list(sessionId)

    return {
      transactions,
    }
  }
}
