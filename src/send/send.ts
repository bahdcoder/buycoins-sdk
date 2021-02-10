import Query from '../base/query'
import request from '../api/request'
import { Currencies } from '../types'
import { applyMixins } from '../helpers/apply-mixins'
import { SendVariables, SendFields, SendResponse } from './send.interface'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'

interface Send extends FilterableByCryptocurrencyInterface {}

class Send extends Query<SendFields, SendVariables> {
  public static fields: SendFields[] = [
    'id',
    'fee',
    'status',
    'address',
    'amount',
    'createdAt',
    'cryptocurrency',
    {
      transaction: [
        'id',
        'confirmed',
        'amount',
        'createdAt',
        'cryptocurrency',
        'txhash',
        'direction',
        {
          address: ['id', 'address', 'cryptocurrency', 'createdAt'],
        },
      ],
    },
  ]

  public static variables: SendVariables = {
    root: {
      cryptocurrency: Currencies.bitcoin,
    },
  }

  constructor(key?: string, secret?: string) {
    super(key, secret)

    super.fields(Send.fields)
  }

  /**
   * Define the amount of coins to Send
   *
   * @param amount
   */
  public amount(amount: string) {
    this.baseOptions.variables.root.amount = amount

    return this
  }

  /**
   * Define the address to send crypto
   *
   * @param amount
   */
  public address(address: string) {
    this.baseOptions.variables.root.address = address

    return this
  }

  /**
   *
   * Make the API call to create a new crypto address
   *
   * @returns Send
   */
  public async post() {
    return request<SendFields, SendVariables, SendResponse>()
      .fields(this.baseOptions.fields)
      .query('send')
      .mutation()
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(Send, [FilterableByCryptocurrency])

const send = (key?: string, secret?: string) => new Send(key, secret)

export default send
