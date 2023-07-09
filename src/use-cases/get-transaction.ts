import { TransactionsRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'
import { ResouceNotFoundError } from './errors/resource-not-found-error'

interface GetTransactionUseCaseRequest {
  id: number
}

interface GetTransactionUseCaseResponse {
  transaction: Transaction
}

export class GetTransactionUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private transactionRepository: TransactionsRepository) {}

  async execute({
    id,
  }: GetTransactionUseCaseRequest): Promise<GetTransactionUseCaseResponse> {
    const transaction = await this.transactionRepository.findById(id)

    if (!transaction) {
      throw new ResouceNotFoundError()
    }

    return {
      transaction,
    }
  }
}
