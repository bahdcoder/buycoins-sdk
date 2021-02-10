import Query from '../base/query'
import request from '../api/request'
import { Currencies, ID } from '../types'
import { applyMixins } from '../helpers/apply-mixins'
import { BuyVariables, BuyFields, BuyResponse } from './buy.interface'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'

interface Buy extends FilterableByCryptocurrencyInterface {}

class Buy extends Query<BuyFields, BuyVariables> {
  public static fields: BuyFields[] = [
    'id',
    'side',
    'price',
    'status',
    'createdAt',
    'cryptocurrency',
    'totalCoinAmount',
    'filledCoinAmount',
  ]

  public static variables: BuyVariables = {
    root: {
      cryptocurrency: Currencies.bitcoin,
    },
  }

  constructor(private key?: string, private secret?: string) {
    super(key, secret)

    super.fields(Buy.fields)
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
   * Define the amount of coins to buy
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
   * @returns Buy
   */
  public async post() {
    return request<BuyFields, BuyVariables, BuyResponse>(this.key, this.secret)
      .fields(this.baseOptions.fields)
      .query('buy')
      .mutation()
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(Buy, [FilterableByCryptocurrency])

const buy = (key?: string, secret?: string) => new Buy(key, secret)

export default buy
