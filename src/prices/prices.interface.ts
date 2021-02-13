import {
  ID,
  Side,
  Price,
  Currencies,
  BigDecimal,
  PriceStatus,
  UnixTimestamp,
  GraphQlResponse,
} from '../types'

export interface PricesFieldsInterface {
  id: ID
  maxSell: BigDecimal
  minSell: BigDecimal
  minBuy: BigDecimal
  maxBuy: BigDecimal
  status: keyof typeof PriceStatus
  sellPricePerCoin: BigDecimal
  minCoinAmount: BigDecimal
  cryptocurrency: keyof typeof Currencies
  buyPricePerCoin: BigDecimal
  expiresAt: UnixTimestamp
}

export type PricesFields = Partial<keyof PricesFieldsInterface>

export type PricesResponse = GraphQlResponse & {
  data: {
    getPrices: Price[]
  }
}

export interface PricesVariables {
  cryptocurrency?: keyof typeof Currencies
  side?: keyof typeof Side
}
