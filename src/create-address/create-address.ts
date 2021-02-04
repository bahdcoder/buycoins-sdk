import Query from '../base/query'
import request from '../api/request'
import { applyMixins } from '../helpers/apply-mixins'
import {
  CreateAddressVariables,
  CreateAddressFields,
} from './create-address.interface'
import {
  FilterableByCryptocurrency,
  FilterableByCryptocurrencyInterface,
} from '../helpers/filterable-by-currency'

interface CreateAddress extends FilterableByCryptocurrencyInterface {}

class CreateAddress extends Query<CreateAddressFields, CreateAddressVariables> {
  public static fields: CreateAddressFields[] = [
    'id',
    'address',
    'createdAt',
    'cryptocurrency',
  ]

  constructor(key?: string, secret?: string) {
    super(key, secret)

    super.fields(CreateAddress.fields)
  }

  /**
   *
   * Make the API call to create a new crypto address
   *
   * @returns CreateAddress
   */
  public async post() {
    return request<
      CreateAddressFields,
      CreateAddressVariables,
      {
        data: {
          createAddress: CreateAddressFields
        }
      }
    >()
      .fields(this.baseOptions.fields)
      .query('createAddress')
      .mutation()
      .variables(this.baseOptions.variables)
      .post()
  }
}

applyMixins(CreateAddress, [FilterableByCryptocurrency])

const createAddress = (key?: string, secret?: string) =>
  new CreateAddress(key, secret)

export default createAddress
