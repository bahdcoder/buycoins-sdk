import { BigDecimal, Currencies, ID, Side } from '../types'

export interface MarketBookFieldsInterface {
  id: ID
  dynamicPriceExpiry: Number
  orders: {}
}

export type MarketBookFields =
  | 'id'
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
