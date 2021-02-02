import { Currencies, EstimatedFee, BigDecimal } from '../types'

export type EstimatedNetworkFeeFieldsInterface = EstimatedFee

export type EstimatedNetworkFeeFields = Partial<
  keyof EstimatedNetworkFeeFieldsInterface
>

export interface EstimatedNetworkFeeVariables {
  cryptocurrency?: keyof typeof Currencies
  amount: BigDecimal
}
