import { Currencies, BigDecimal, ID, Order, GraphQlResponse } from '../types'

export type SellFieldsInterface = Order

export type SellFields = Partial<keyof SellFieldsInterface>

export type SellResponse = {
  data: {
    Sell: Partial<Order>
  }
} & GraphQlResponse

export interface SellVariables {
  root: {
    price?: ID
    cryptocurrency?: keyof typeof Currencies
    coin_amount?: BigDecimal
  }
}
