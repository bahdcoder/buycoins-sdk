import { BankAccount } from '../types'

export type BankAccountsInterface = BankAccount

export type BankAccountsFields = Partial<keyof BankAccountsInterface>

export interface BankAccountsVariables {
  accountNumber?: string
}
