import { Currencies, EstimatedFee, BigDecimal, GraphQlResponse } from '../types'

export type EstimatedNetworkFeeFieldsInterface = EstimatedFee

export type EstimatedNetworkFeeFields = Partial<
  keyof EstimatedNetworkFeeFieldsInterface
>

export type EstimatedNetworkFeeResponse = GraphQlResponse & {
  data: {
    estimatedNetworkFee: EstimatedFee
  }
}

export interface EstimatedNetworkFeeVariables {
  root: {
    cryptocurrency?: keyof typeof Currencies
    amount: BigDecimal
  }
}
