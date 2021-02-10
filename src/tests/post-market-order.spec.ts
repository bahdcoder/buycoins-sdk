import { request } from 'https'
import postMarketOrder from '../post-market-order/post-market-order'

import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<postMarketOrder>', () => {
  it('posts a sell market order', async () => {
    const TEST_AMOUNT = '0.002'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await postMarketOrder().amount(TEST_AMOUNT).sell().post()

    expect(getQuery()).toBe(
      `mutation{postMarketOrder(coinAmount:\\\"0.002\\\",orderSide:sell){id,side,side,status,priceType,createdAt,coinAmount,staticPrice,pricePerCoin,cryptocurrency,dynamicExchangeRate}}`
    )
  })

  it('posts a sell market litecoin order', async () => {
    const TEST_AMOUNT = '0.002'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await postMarketOrder().amount(TEST_AMOUNT).sell().litecoin().post()

    expect(getQuery()).toBe(
      `mutation{postMarketOrder(coinAmount:\\\"0.002\\\",orderSide:sell,cryptocurrency:litecoin){id,side,side,status,priceType,createdAt,coinAmount,staticPrice,pricePerCoin,cryptocurrency,dynamicExchangeRate}}`
    )
  })
})
