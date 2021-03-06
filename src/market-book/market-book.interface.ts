import { BigDecimal, Currencies, GraphQlResponse, PostOrders } from '../types'

export type MarketBookFields =
  | 'dynamicPriceExpiry'
  | {
      orders: Partial<
        [
          {
            edges: Partial<
              [
                'cursor',
                {
                  node: Partial<
                    [
                      'id',
                      'coinAmount',
                      'createdAt',
                      'cryptocurrency',
                      'dynamicExchangeRate',
                      'pricePerCoin',
                      'priceType',
                      'side',
                      'staticPrice',
                      'status'
                    ]
                  >
                }
              ]
            >
          }
        ]
      >
    }

export type MarketBookResponse = GraphQlResponse & {
  data: {
    getMarketBook: Omit<PostOrders, 'id'>
  }
}

export interface MarketBookVariables {
  root: {
    cryptocurrency?: keyof typeof Currencies
    coinAmount?: BigDecimal
    orders?: {
      before?: String
      after?: String
      first?: number
      last?: number
    }
  }
}
