import {
  Currencies,
  BigDecimal,
  UnixTimestamp,
  ID,
  PriceStatus,
  Side,
} from '../types'

export interface PricesFieldsInterface {
  id: ID
  maxSell: BigDecimal
  minSell: BigDecimal
  minBuy: BigDecimal
  maxBuy: BigDecimal
  status: PriceStatus
  sellPricePerCoin: BigDecimal
  minCoinAmount: BigDecimal
  cryptocurrency: keyof typeof Currencies
  buyPricePerCoin: BigDecimal
  expiresAt: UnixTimestamp
}

export type PricesFields = Partial<keyof PricesFieldsInterface>

export interface PricesVariables {
  cryptocurrency?: keyof typeof Currencies
  side?: keyof typeof Side
}
