import {
  Currencies,
  BigDecimal,
  GraphQlResponse,
} from '../types'

export type SendOffchainFields = 'initiated'

export type SendOffchainResponse = {
  data: {
    sendOffchain: {
      initiated: boolean
    }
  }
} & GraphQlResponse

export interface SendOffchainVariables {
  root: {
    recipient?: string
    cryptocurrency?: keyof typeof Currencies
    amount?: BigDecimal
  }
}
