import { request } from 'https'
import limitOrder from '../post-limit-order/post-limit-order'

import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<limitOrder>', () => {
  it('posts a dynamic sell limit order', async () => {
    const TEST_AMOUNT = '0.002'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await limitOrder().amount(TEST_AMOUNT).sell().dynamic('0.3422').post()

    expect(getQuery()).toBe(
      `mutation{postLimitOrder(coinAmount:\\\"0.002\\\",orderSide:sell,dynamicExchangeRate:\\\"0.3422\\\",priceType:dynamic){id,side,side,status,priceType,createdAt,coinAmount,staticPrice,pricePerCoin,cryptocurrency,dynamicExchangeRate}}`
    )
  })

  it('posts a static buy limt litecoin order', async () => {
    const TEST_AMOUNT = '0.002'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await limitOrder()
      .amount(TEST_AMOUNT)
      .static('0.23343')
      .buy()
      .litecoin()
      .post()

    expect(getQuery()).toBe(
      `mutation{postLimitOrder(coinAmount:\\\"0.002\\\",staticPrice:\\\"0.23343\\\",priceType:static,orderSide:buy,cryptocurrency:litecoin){id,side,side,status,priceType,createdAt,coinAmount,staticPrice,pricePerCoin,cryptocurrency,dynamicExchangeRate}}`
    )
  })
})
