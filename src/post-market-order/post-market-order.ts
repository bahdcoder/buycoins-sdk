import Query from '../base/query'
import request from '../api/request'
import { Currencies, Side } from '../types'
import { applyMixins } from '../helpers/apply-mixins'
import {
  PostMarketOrderVariables,
  PostMarketOrderFields,
  PostMarketOrderResponse,
} from './post-market-order.interface'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'

interface PostMarketOrder extends FilterableByCryptocurrencyInterface {}

class PostMarketOrder extends Query<
  PostMarketOrderFields,
  PostMarketOrderVariables
> {
  public static fields: PostMarketOrderFields[] = [
    'id',
    'side',
    'side',
    'status',
    'priceType',
    'createdAt',
    'coinAmount',
    'staticPrice',
    'pricePerCoin',
    'cryptocurrency',
    'dynamicExchangeRate',
  ]

  public static variables: PostMarketOrderVariables = {
    root: {
      cryptocurrency: Currencies.bitcoin,
    },
  }

  constructor(key?: string, secret?: string) {
    super(key, secret)

    super.fields(PostMarketOrder.fields)
  }

  /**
   * Post a buy market order
   *
   */
  public buy() {
    this.baseOptions.variables.root.orderSide = Side.buy

    return this
  }

  /**
   * Post a sell market order
   *
   */
  public sell() {
    this.baseOptions.variables.root.orderSide = Side.sell

    return this
  }

  /**
   * Define the amount of coins to PostMarketOrder
   *
   * @param amount
   */
  public amount(amount: string) {
    this.baseOptions.variables.root.coinAmount = amount

    return this
  }
  /**
   *
   * Make the API call to create a new crypto address
   *
   * @returns PostMarketOrder
   */
  public async post() {
    return request<
      PostMarketOrderFields,
      PostMarketOrderVariables,
      PostMarketOrderResponse
    >()
      .fields(this.baseOptions.fields)
      .query('postMarketOrder')
      .mutation()
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(PostMarketOrder, [FilterableByCryptocurrency])

const postMarketOrder = (key?: string, secret?: string) =>
  new PostMarketOrder(key, secret)

export default postMarketOrder
