import { TransactionsRepository } from '@/repositories/transactions-repository'

export class SummaryTransactionsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(sessionId: string) {
    const summary = await this.transactionsRepository.summary(sessionId)

    return {
      summary,
    }
  }
}
