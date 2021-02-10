import { ID } from '../types'
import Query from '../base/query'
import request from '../api/request'
import { applyMixins } from '../helpers/apply-mixins'
import {
  CancelWithdrawalVariables,
  CancelWithdrawalFields,
  CancelWithdrawalResponse,
} from './cancel-withdrawal.interface'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'

interface CancelWithdrawal extends FilterableByCryptocurrencyInterface {}

class CancelWithdrawal extends Query<
  CancelWithdrawalFields,
  CancelWithdrawalVariables
> {
  public static fields: CancelWithdrawalFields[] = [
    'id',
    'amount',
    'createdAt',
    'reference',
    'fee',
    'status',
    'totalAmount',
    'type',
  ]

  public static variables: CancelWithdrawalVariables = {
    root: {},
  }

  constructor(key?: string, secret?: string) {
    super(key, secret)

    super.fields(CancelWithdrawal.fields)
  }

  /**
   * Provide payment ID of withdrawal to cancel.s
   *
   * @param amount
   */
  public payment(id: ID) {
    this.baseOptions.variables.root.payment = id

    return this
  }

  /**
   *
   * Make the API call to create a new crypto address
   *
   * @returns CancelWithdrawal
   */
  public async post() {
    return request<
      CancelWithdrawalFields,
      CancelWithdrawalVariables,
      CancelWithdrawalResponse
    >()
      .fields(this.baseOptions.fields)
      .query('cancelWithdrawal')
      .mutation()
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(CancelWithdrawal, [FilterableByCryptocurrency])

const cancelWithdrawal = (key?: string, secret?: string) =>
  new CancelWithdrawal(key, secret)

export default cancelWithdrawal
