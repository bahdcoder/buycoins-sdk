import Query from '../base/query'
import request from '../api/request'
import { applyMixins } from '../helpers/apply-mixins'
import {
  EstimatedNetworkFeeVariables,
  EstimatedNetworkFeeFields,
  EstimatedNetworkFeeResponse,
} from './estimated-network-fee.interface'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'

interface EstimatedNetworkFee extends FilterableByCryptocurrencyInterface {}

class EstimatedNetworkFee extends Query<
  EstimatedNetworkFeeFields,
  EstimatedNetworkFeeVariables
> {
  public static fields: EstimatedNetworkFeeFields[] = ['estimatedFee', 'total']

  constructor(private key?: string, private secret?: string) {
    super(key, secret)

    super.fields(EstimatedNetworkFee.fields)
  }

  /**
   * Define the amount for estimating network fee
   *
   * @param amount
   */
  public amount(amount: string) {
    this.baseOptions.variables.root.amount = amount

    return this
  }

  /**
   *
   * Make the API call to get EstimatedNetworkFee with defined options
   *
   * @returns EstimatedNetworkFee
   */
  public async get() {
    return request<
      EstimatedNetworkFeeFields,
      EstimatedNetworkFeeVariables,
      EstimatedNetworkFeeResponse
    >(this.key, this.secret)
      .fields(this.baseOptions.fields)
      .query('getEstimatedNetworkFee')
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(EstimatedNetworkFee, [FilterableByCryptocurrency])

const estimatedNetworkFee = (key?: string, secret?: string) =>
  new EstimatedNetworkFee(key, secret)

export default estimatedNetworkFee
