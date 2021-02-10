import Query from '../base/query'
import request from '../api/request'
import { Currencies, Status } from '../types'
import { applyMixins } from '../helpers/apply-mixins'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'
import {
  FilterableBySide,
  FilterableBySideInterface,
} from '../helpers/filterable-by-side'
import {
  FilterableByStatus,
  FilterableByStatusInterface,
} from '../helpers/filterable-by-status'

import {
  OrdersFields,
  OrdersVariables,
  OrdersResponse,
} from './orders.interface'

interface Orders
  extends FilterableByCryptocurrencyInterface,
    FilterableBySideInterface,
    FilterableByStatusInterface {}

class Orders extends Query<OrdersFields, OrdersVariables> {
  public static variables: OrdersVariables = {
    root: {
      cryptocurrency: Currencies.bitcoin,
      status: Status.open,
      orders: {},
    },
  }

  public static fields: OrdersFields[] = [
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

    super.fields(Orders.fields)
    super.variables(Orders.variables)
  }

  /**
   *
   * Make the API call to get prices with defined options
   *
   * @returns Prices
   */
  public async get() {
    return request<OrdersFields, OrdersVariables, OrdersResponse>(
      this.key,
      this.secret
    )
      .fields(this.baseOptions.fields)
      .query('getOrders')
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(Orders, [
  FilterableByCryptocurrency,
  FilterableBySide,
  FilterableByStatus,
])

const orders = (key?: string, secret?: string) => new Orders(key, secret)

export default orders
