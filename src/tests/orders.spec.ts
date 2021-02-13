import { request } from 'https'
import orders from '../orders/orders'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<orders>', () => {
  it('gets orders', async () => {
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await orders().get()

    expect(getQuery()).toBe(
      `query{getOrders(cryptocurrency:bitcoin,status:open){dynamicPriceExpiry,orders{edges{cursor,node{id,coinAmount,createdAt,cryptocurrency,dynamicExchangeRate,pricePerCoin,priceType,side,staticPrice,status}}}}}`
    )
  })

  it('gets open sell orders', async () => {
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await orders().open().sell().get()

    expect(getQuery()).toBe(
      `query{getOrders(cryptocurrency:bitcoin,status:open,side:sell){dynamicPriceExpiry,orders{edges{cursor,node{id,coinAmount,createdAt,cryptocurrency,dynamicExchangeRate,pricePerCoin,priceType,side,staticPrice,status}}}}}`
    )
  })

  it('get completed sell orders by currency', async () => {
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await orders().ethereum().completed().sell().get()

    expect(getQuery()).toBe(
      `query{getOrders(cryptocurrency:ethereum,status:open,side:sell){dynamicPriceExpiry,orders{edges{cursor,node{id,coinAmount,createdAt,cryptocurrency,dynamicExchangeRate,pricePerCoin,priceType,side,staticPrice,status}}}}}`
    )
  })
})
