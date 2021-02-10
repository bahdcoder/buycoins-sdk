import {
  Currencies,
  BigDecimal,
  GraphQlResponse,
  PostOrder,
  Side,
  PriceType,
} from '../types'

export type PostLimitOrderFieldsInterface = PostOrder

export type PostLimitOrderFields = Partial<keyof PostLimitOrderFieldsInterface>

export type PostLimitOrderResponse = {
  data: {
    postLimitOrder: PostOrder
  }
} & GraphQlResponse

export interface PostLimitOrderVariables {
  root: {
    orderSide?: Side
    staticPrice?: BigDecimal
    dynamicExchangeRate?: BigDecimal
    priceType?: keyof typeof PriceType
    cryptocurrency?: keyof typeof Currencies
    coinAmount?: BigDecimal
  }
}
