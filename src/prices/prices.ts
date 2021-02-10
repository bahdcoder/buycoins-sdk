import Query from '../base/query'
import request from '../api/request'
import { applyMixins } from '../helpers/apply-mixins'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'
import {
  PricesFields,
  PricesVariables,
  PricesResponse,
} from './prices.interface'
import {
  FilterableBySide,
  FilterableBySideInterface,
} from '../helpers/filterable-by-side'

interface Prices
  extends FilterableByCryptocurrencyInterface,
    FilterableBySideInterface {}

class Prices extends Query<PricesFields, PricesVariables> {
  public static fields: PricesFields[] = [
    'id',
    'status',
    'maxBuy',
    'minSell',
    'maxSell',
    'expiresAt',
    'minCoinAmount',
    'cryptocurrency',
    'buyPricePerCoin',
    'sellPricePerCoin',
  ]

  constructor(private key?: string, private secret?: string) {
    super(key, secret)

    super.fields(Prices.fields)
  }

  /**
   *
   * Make the API call to get prices with defined options
   *
   * @returns Prices
   */
  public async get() {
    return request<PricesFields, PricesVariables, PricesResponse>(
      this.key,
      this.secret
    )
      .fields(this.baseOptions.fields)
      .query('getPrices')
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(Prices, [FilterableByCryptocurrency, FilterableBySide])

const prices = (key?: string, secret?: string) => new Prices(key, secret)

export default prices
