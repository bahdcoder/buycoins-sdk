import {
  Currencies,
  BigDecimal,
  GraphQlResponse,
  OnchainTransferRequest,
  Transaction,
  Address,
} from '../types'

export type SendFields =
  | Partial<keyof Omit<OnchainTransferRequest, 'transaction'>>
  | {
      transaction:
        (Partial<keyof Omit<Transaction, 'address' | 'onchainTransferRequest'>>
        | Partial<{
          onchainTransferRequest: SendFields[]
          address: (Partial<keyof Address>)[]
        }>)[]
    }

export type SendResponse = {
  data: {
    send: OnchainTransferRequest
  }
} & GraphQlResponse

export interface SendVariables {
  root: {
    address?: string
    cryptocurrency?: keyof typeof Currencies
    amount?: BigDecimal
  }
}
