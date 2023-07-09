import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface CreateTransactionUseCaseRequest {
  title: string
  amount: number
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
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = await this.transactionRepository.create({
      title,
      amount,
    })

    return {
      transaction,
    }
  }
}
