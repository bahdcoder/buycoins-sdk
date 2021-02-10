import { request } from 'https'

import buy from '../buy/buy'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<buy>', () => {
  it('buys bitcoin by default', async () => {
    const TEST_AMOUNT = '0.002'
    const TEST_PRICE_ID = 'TEST_PRICE_ID'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await buy().amount(TEST_AMOUNT).price(TEST_PRICE_ID).post()

    expect(getQuery()).toBe(
      `mutation{buy(coin_amount:\\\"0.002\\\",price:\\\"TEST_PRICE_ID\\\"){id,side,price,status,createdAt,cryptocurrency,totalCoinAmount,filledCoinAmount}}`
    )
  })

  it('buys litecoin when specified', async () => {
    const TEST_AMOUNT = '0.002'
    const TEST_PRICE_ID = 'TEST_PRICE_ID'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await buy().amount(TEST_AMOUNT).price(TEST_PRICE_ID).litecoin().post()

    expect(getQuery()).toBe(
      `mutation{buy(coin_amount:\\\"0.002\\\",price:\\\"TEST_PRICE_ID\\\",cryptocurrency:litecoin){id,side,price,status,createdAt,cryptocurrency,totalCoinAmount,filledCoinAmount}}`
    )
  })
})
