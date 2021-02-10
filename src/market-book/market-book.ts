import { BigDecimal } from '../types'
import Query from '../base/query'
import request from '../api/request'
import { applyMixins } from '../helpers/apply-mixins'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'
import {
  MarketBookFields,
  MarketBookVariables,
  MarketBookResponse,
} from './market-book.interface'

interface MarketBook extends FilterableByCryptocurrencyInterface {}

class MarketBook extends Query<MarketBookFields, MarketBookVariables> {
  public static variables: MarketBookVariables = {
    root: {
      orders: {},
    },
  }

  public static fields: MarketBookFields[] = [
    'id',
    'dynamicPriceExpiry',
    {
      orders: [
        {
          edges: [
            'cursor',
            {
              node: [
                'id',
                'coinAmount',
                'createdAt',
                'cryptocurrency',
                'dynamicExchangeRate',
                'pricePerCoin',
                'priceType',
                'side',
                'staticPrice',
                'status',
              ],
            },
          ],
        },
      ],
    },
  ]

  constructor(private key?: string, private secret?: string) {
    super(key, secret)

    super.fields(MarketBook.fields)
    super.variables(MarketBook.variables)
  }

  /**
   * Define the amount for
   *
   * @param amount
   */
  public amount(amount: BigDecimal) {
    this.baseOptions.variables.root.coinAmount = amount

    return this
  }

  /**
   *
   * Make the API call to get prices with defined options
   *
   * @returns Prices
   */
  public async get() {
    return request<MarketBookFields, MarketBookVariables, MarketBookResponse>(
      this.key,
      this.secret
    )
      .fields(this.baseOptions.fields)
      .query('getMarketBook')
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(MarketBook, [FilterableByCryptocurrency])

const marketBook = (key?: string, secret?: string) =>
  new MarketBook(key, secret)

export default marketBook
