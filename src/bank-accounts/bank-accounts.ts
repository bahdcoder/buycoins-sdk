import Query from '../base/query'
import request from '../api/request'
import { BankAccount } from '../types'
import {
  BankAccountsFields,
  BankAccountsVariables,
} from './bank-accounts.interface'

class BankAccounts extends Query<BankAccountsFields, BankAccountsVariables> {
  public static fields: BankAccountsFields[] = [
    'id',
    'accountName',
    'accountNumber',
    'accountReference',
    'accountType',
    'bankName',
  ]

  constructor(key?: string, secret?: string) {
    super(key, secret)

    super.fields(BankAccounts.fields)
  }

  /**
   * Filter the bank account to get only one that matches the following
   * bank account number
   *
   * @param accountNumber
   *
   * @return BankAccounts
   */
  public accountNumber(accountNumber: BankAccount['accountNumber']) {
    this.baseOptions.variables.accountNumber = accountNumber

    return this
  }

  /**
   *
   * Make the API call to get bank account with defined options
   *
   * @returns BankAccounts
   */
  public async get() {
    return request<
      BankAccountsFields,
      BankAccountsVariables,
      {
        data: {
          getBankAccounts: BankAccountsFields[]
        }
      }
    >()
      .fields(this.baseOptions.fields)
      .query('getBankAccounts')
      .variables(this.baseOptions.variables)
      .post()
  }
}

const balances = (key?: string, secret?: string) =>
  new BankAccounts(key, secret)

export default balances
