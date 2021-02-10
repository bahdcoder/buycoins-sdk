import Query from '../base/query'
import request from '../api/request'
import { Currencies } from '../types'
import { applyMixins } from '../helpers/apply-mixins'
import {
  SendOffchainVariables,
  SendOffchainFields,
  SendOffchainResponse,
} from './send-offchain.interface'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'

interface SendOffchain extends FilterableByCryptocurrencyInterface {}

class SendOffchain extends Query<SendOffchainFields, SendOffchainVariables> {
  public static fields: SendOffchainFields[] = ['initiated']

  public static variables: SendOffchainVariables = {
    root: {
      cryptocurrency: Currencies.bitcoin,
    },
  }

  constructor(key?: string, secret?: string) {
    super(key, secret)

    super.fields(SendOffchain.fields)
  }

  /**
   * Define the amount of coins to SendOffchain
   *
   * @param amount
   */
  public amount(amount: string) {
    this.baseOptions.variables.root.amount = amount

    return this
  }

  /**
   * Define the username of the buycoins user recieving this crypto
   *
   * @param amount
   */
  public recipient(recipient: string) {
    this.baseOptions.variables.root.recipient = recipient

    return this
  }

  /**
   *
   * Make the API call to create a new crypto address
   *
   * @returns SendOffchain
   */
  public async post() {
    return request<
      SendOffchainFields,
      SendOffchainVariables,
      SendOffchainResponse
    >()
      .fields(this.baseOptions.fields)
      .query('sendOffchain')
      .mutation()
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(SendOffchain, [FilterableByCryptocurrency])

const sendOffchain = (key?: string, secret?: string) =>
  new SendOffchain(key, secret)

export default sendOffchain
