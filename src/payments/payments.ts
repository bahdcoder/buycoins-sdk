import Query from '../base/query'
import request from '../api/request'
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
  FilterableByCursor,
  FilterableByCursorInterface,
} from '../helpers/filterable-by-cursor'

import {
  PaymentsFields,
  PaymentsVariables,
  PaymentsResponse,
} from './payments.interface'

interface Payments
  extends FilterableByCryptocurrencyInterface,
    FilterableBySideInterface,
    FilterableByStatusInterface,
    FilterableByCursorInterface {}

class Payments extends Query<PaymentsFields, PaymentsVariables> {
  public static variables: PaymentsVariables = {
    root: {},
  }

  public static fields: PaymentsFields[] = [
    {
      pageInfo: ['endCursor', 'hasNextPage', 'hasPreviousPage', 'startCursor'],
    },
    {
      edges: [
        'cursor',
        {
          node: [
            'id',
            'amount',
            'createdAt',
            'fee',
            'reference',
            'status',
            'totalAmount',
            'type',
          ],
        },
      ],
    },
    {
      nodes: [
        'id',
        'amount',
        'createdAt',
        'fee',
        'reference',
        'status',
        'totalAmount',
        'type',
      ],
    },
  ]

  constructor(private key?: string, private secret?: string) {
    super(key, secret)

    super.fields(Payments.fields)
    super.variables(Payments.variables)
  }

  /**
   *
   * Make the API call to get prices with defined options
   *
   * @returns Prices
   */
  public async get() {
    return request<PaymentsFields, PaymentsVariables, PaymentsResponse>(
      this.key,
      this.secret
    )
      .fields(this.baseOptions.fields)
      .query('getPayments')
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(Payments, [
  FilterableByCursor,
  FilterableByCryptocurrency,
  FilterableBySide,
  FilterableByStatus,
])

const payments = (key?: string, secret?: string) => new Payments(key, secret)

export default payments
