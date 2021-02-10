import { request } from 'https'

import sell from '../sell/sell'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<sell>', () => {
  it('sells bitcoin by default', async () => {
    const TEST_AMOUNT = '0.002'
    const TEST_PRICE_ID = 'TEST_PRICE_ID'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await sell().amount(TEST_AMOUNT).price(TEST_PRICE_ID).post()

    expect(getQuery()).toBe(
      `mutation{sell(coin_amount:\\\"0.002\\\",price:\\\"TEST_PRICE_ID\\\"){id,side,price,status,createdAt,cryptocurrency,totalCoinAmount,filledCoinAmount}}`
    )
  })

  it('sells litecoin when specified', async () => {
    const TEST_AMOUNT = '0.002'
    const TEST_PRICE_ID = 'TEST_PRICE_ID'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await sell().amount(TEST_AMOUNT).price(TEST_PRICE_ID).litecoin().post()

    expect(getQuery()).toBe(
      `mutation{sell(coin_amount:\\\"0.002\\\",price:\\\"TEST_PRICE_ID\\\",cryptocurrency:litecoin){id,side,price,status,createdAt,cryptocurrency,totalCoinAmount,filledCoinAmount}}`
    )
  })
})
