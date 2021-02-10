import { Currencies, BigDecimal, ID, Order, GraphQlResponse } from '../types'

export type BuyFieldsInterface = Order

export type BuyFields = Partial<keyof BuyFieldsInterface>

export type BuyResponse = {
  data: {
    buy: Partial<Order>
  }
} & GraphQlResponse

export interface BuyVariables {
  root: {
    price?: ID
    cryptocurrency?: keyof typeof Currencies
    coin_amount?: BigDecimal
  }
}
