import { BankAccount, GraphQlResponse } from '../types'

export type BankAccountsInterface = BankAccount

export type BankAccountsFields = Partial<keyof BankAccountsInterface>

export type BankAccountsResponse = GraphQlResponse & {
  data: {
    getBankAccounts: Partial<BankAccount>[]
  }
}

export interface BankAccountsVariables {
  root: {
    accountNumber?: string
  }
}
