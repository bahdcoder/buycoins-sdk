import { Currencies, Account, GraphQlResponse } from '../types'

export type BalancesFieldsInterface = Account

export type BalancesFields = Partial<keyof BalancesFieldsInterface>

export type BalancesResponse = GraphQlResponse & {
  data: {
    getBalances: Partial<Account>[]
  }
}

export interface BalancesVariables {
  cryptocurrency?: keyof typeof Currencies
}
