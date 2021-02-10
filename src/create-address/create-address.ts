import Query from '../base/query'
import request from '../api/request'
import { Currencies } from '../types'
import { applyMixins } from '../helpers/apply-mixins'
import {
  CreateAddressVariables,
  CreateAddressFields,
  CreateAddressResponse,
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

  public static variables: CreateAddressVariables = {
    root: {
      cryptocurrency: Currencies.bitcoin,
    },
  }

  constructor(private key?: string, private secret?: string) {
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
      CreateAddressResponse
    >(this.key, this.secret)
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
