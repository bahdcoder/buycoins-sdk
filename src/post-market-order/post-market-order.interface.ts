import {
  Currencies,
  BigDecimal,
  GraphQlResponse,
  PostOrder,
  Side,
} from '../types'

export type PostMarketOrderFieldsInterface = PostOrder

export type PostMarketOrderFields = Partial<
  keyof PostMarketOrderFieldsInterface
>

export type PostMarketOrderResponse = {
  data: {
    postMarketOrder: Partial<PostOrder>
  }
} & GraphQlResponse

export interface PostMarketOrderVariables {
  root: {
    orderSide?: Side
    cryptocurrency?: keyof typeof Currencies
    coinAmount?: BigDecimal
  }
}
