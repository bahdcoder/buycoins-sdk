import Query from '../base/query'
import request from '../api/request'
import { Currencies, ID } from '../types'
import { applyMixins } from '../helpers/apply-mixins'
import { SellVariables, SellFields, SellResponse } from './sell.interface'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'

interface Sell extends FilterableByCryptocurrencyInterface {}

class Sell extends Query<SellFields, SellVariables> {
  public static fields: SellFields[] = [
    'id',
    'side',
    'price',
    'status',
    'createdAt',
    'cryptocurrency',
    'totalCoinAmount',
    'filledCoinAmount',
  ]

  public static variables: SellVariables = {
    root: {
      cryptocurrency: Currencies.bitcoin,
    },
  }

  constructor(key?: string, secret?: string) {
    super(key, secret)

    super.fields(Sell.fields)
  }

  /**
   * Define the ID of the price
   *
   * @param amount
   */
  public price(id: ID) {
    this.baseOptions.variables.root.price = id

    return this
  }

  /**
   * Define the amount of coins to Sell
   *
   * @param amount
   */
  public amount(amount: string) {
    this.baseOptions.variables.root.coin_amount = amount

    return this
  }
  /**
   *
   * Make the API call to create a new crypto address
   *
   * @returns Sell
   */
  public async post() {
    return request<SellFields, SellVariables, SellResponse>()
      .fields(this.baseOptions.fields)
      .query('sell')
      .mutation()
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(Sell, [FilterableByCryptocurrency])

const sell = (key?: string, secret?: string) => new Sell(key, secret)

export default sell
