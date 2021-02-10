import Query from '../base/query'
import request from '../api/request'
import { applyMixins } from '../helpers/apply-mixins'
import {
  BalancesVariables,
  BalancesFields,
  BalancesResponse,
} from './balances.interface'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'

interface Balances extends FilterableByCryptocurrencyInterface {}

class Balances extends Query<BalancesFields, BalancesVariables> {
  public static fields: BalancesFields[] = [
    'id',
    'confirmedBalance',
    'cryptocurrency',
  ]

  constructor(key?: string, secret?: string) {
    super(key, secret)

    super.fields(Balances.fields)
  }

  /**
   *
   * Make the API call to get Balances with defined options
   *
   * @returns Balances
   */
  public async get() {
    return request<BalancesFields, BalancesVariables, BalancesResponse>()
      .fields(this.baseOptions.fields)
      .query('getBalances')
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(Balances, [FilterableByCryptocurrency])

const balances = (key?: string, secret?: string) => new Balances(key, secret)

export default balances
