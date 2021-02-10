import Query from '../base/query'
import request from '../api/request'
import { BigDecimal, Currencies, PriceType, Side } from '../types'
import { applyMixins } from '../helpers/apply-mixins'
import {
  PostLimitOrderVariables,
  PostLimitOrderFields,
  PostLimitOrderResponse,
} from './post-limit-order.interface'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'

interface PostLimitOrder extends FilterableByCryptocurrencyInterface {}

class PostLimitOrder extends Query<
  PostLimitOrderFields,
  PostLimitOrderVariables
> {
  public static fields: PostLimitOrderFields[] = [
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

  public static variables: PostLimitOrderVariables = {
    root: {
      cryptocurrency: Currencies.bitcoin,
    },
  }

  constructor(private key?: string, private secret?: string) {
    super(key, secret)

    super.fields(PostLimitOrder.fields)
  }

  /**
   * Set dynamic pricing for this order
   *
   */
  public dynamic(rate: BigDecimal) {
    this.baseOptions.variables.root.dynamicExchangeRate = rate
    this.baseOptions.variables.root.priceType = PriceType.dynamic

    return this
  }

  /**
   * Set static pricing for this order
   *
   */
  public static(price: BigDecimal) {
    this.baseOptions.variables.root.staticPrice = price
    this.baseOptions.variables.root.priceType = PriceType.static

    return this
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
   * Define the amount of coins to PostLimitOrder
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
   * @returns PostLimitOrder
   */
  public async post() {
    return request<
      PostLimitOrderFields,
      PostLimitOrderVariables,
      PostLimitOrderResponse
    >(this.key, this.secret)
      .fields(this.baseOptions.fields)
      .query('postLimitOrder')
      .mutation()
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(PostLimitOrder, [FilterableByCryptocurrency])

const postLimitOrder = (key?: string, secret?: string) =>
  new PostLimitOrder(key, secret)

export default postLimitOrder
