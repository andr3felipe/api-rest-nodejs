import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface CreateTransactionUseCaseRequest {
  title: string
  amount: number
  sessionId: string
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private transactionRepository: TransactionsRepository) {}

  async execute({
    title,
    amount,
    sessionId,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = await this.transactionRepository.create({
      title,
      amount,
      session_id: sessionId,
    })

    return {
      transaction,
    }
  }
}
