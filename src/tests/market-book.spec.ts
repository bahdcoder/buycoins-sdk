import { request } from 'https'
import marketBook from '../market-book/market-book'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<marketBook>', () => {
  it('gets market book', async () => {
    const TEST_AMOUNT = 'TEST_AMOUNT'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await marketBook().amount(TEST_AMOUNT).get()

    expect(getQuery()).toBe(
      `query{getMarketBook(coinAmount:\\\"TEST_AMOUNT\\\"){dynamicPriceExpiry,orders{edges{cursor,node{id,coinAmount,createdAt,cryptocurrency,dynamicExchangeRate,pricePerCoin,priceType,side,staticPrice,status}}}}}`
    )
  })

  it('gets market book with custom fields and variables', async () => {
    const [getQuery, write] = useWriteMock()

    const TEST_AMOUNT = 'TEST_AMOUNT'
    const TEST_ORDER_AFTER = 'TEST_ORDER_AFTER'
    const TEST_ORDER_BEFORE = 'TEST_ORDER_BEFORE'

    mockRequest.mockImplementation(requestMock(write))

    await marketBook()
      .fields([
        'dynamicPriceExpiry',
        {
          orders: [
            {
              edges: [
                'cursor',
                { node: ['id', 'coinAmount', 'createdAt', 'cryptocurrency'] },
              ],
            },
          ],
        },
      ])
      .variables({
        root: {
          coinAmount: TEST_AMOUNT,
          cryptocurrency: 'bitcoin',
          orders: {
            after: TEST_ORDER_AFTER,
            before: TEST_ORDER_BEFORE,
          },
        },
      })
      .get()

    expect(getQuery()).toBe(
      `query{getMarketBook(coinAmount:\\\"TEST_AMOUNT\\\",cryptocurrency:bitcoin){dynamicPriceExpiry,orders(after:\\\"TEST_ORDER_AFTER\\\",before:\\\"TEST_ORDER_BEFORE\\\"){edges{cursor,node{id,coinAmount,createdAt,cryptocurrency}}}}}`
    )
  })
})
