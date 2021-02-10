import { Currencies, GraphQlResponse, Side, Status, PostOrders } from '../types'

import { MarketBookFields } from '../market-book/market-book.interface'

export type OrdersFields = MarketBookFields

export type OrdersResponse = GraphQlResponse & {
  data: {
    getOrders: PostOrders
  }
}

export interface OrdersVariables {
  root: {
    cryptocurrency?: keyof typeof Currencies
    status?: keyof typeof Status
    side?: keyof typeof Side
    orders?: {
      before?: String
      after?: String
      first?: number
      last?: number
    }
  }
}
