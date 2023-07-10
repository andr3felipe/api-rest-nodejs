import { expect, describe, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a transaction', async () => {
    await request(app.server)
      .post('/transaction')
      .send({
        title: 'New Transaction',
        amount: 1000,
        type: 'deposit',
      })
      .expect(201)
  })

  it('Should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transaction')
      .send({
        title: 'New Transaction',
        amount: 3000,
        type: 'deposit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: '3000',
      }),
    ])
  })

  it('Should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transaction')
      .send({
        title: 'New Transaction',
        amount: 3000,
        type: 'deposit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionResponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transaction/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New Transaction',
        amount: '3000',
      }),
    )
  })

  it('Should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transaction')
      .send({
        title: 'Deposit Transaction',
        amount: 5000,
        type: 'deposit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server).post('/transaction').set('Cookie', cookies).send({
      title: 'Withdraw Transaction',
      amount: 3000,
      type: 'withdraw',
    })

    const summaryTransactionsResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryTransactionsResponse.body).toEqual(
      expect.objectContaining({
        summary: {
          amount: '2000',
        },
      }),
    )
  })
})
