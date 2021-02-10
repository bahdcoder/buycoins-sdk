import { Currencies, Address, GraphQlResponse } from '../types'

export type CreateAddressFieldsInterface = Address

export type CreateAddressFields = Partial<keyof CreateAddressFieldsInterface>

export type CreateAddressResponse = GraphQlResponse & {
  data: {
    createAddress: Address
  }
}

export interface CreateAddressVariables {
  root: {
    cryptocurrency?: keyof typeof Currencies
  }
}
