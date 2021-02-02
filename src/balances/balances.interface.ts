import { Currencies, Account } from '../types'

export type BalancesFieldsInterface = Account

export type BalancesFields = Partial<keyof BalancesFieldsInterface>

export interface BalancesVariables {
  cryptocurrency?: keyof typeof Currencies
}
