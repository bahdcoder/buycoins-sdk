import { Currencies, Side, Status } from '../types'
import { MarketBookFields } from '../market-book/market-book.interface'

export type OrdersFields = MarketBookFields

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
