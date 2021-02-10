import Query from '../base/query'
import { Side } from '../types'

export interface FilterableBySideInterface {
  buy(): this
  sell(): this
}

export class FilterableBySide extends Query<
  {},
  {
    side: keyof typeof Side
  }
> {
  buy() {
    this.baseOptions.variables.side = Side.buy

    return this
  }

  sell() {
    this.baseOptions.variables.side = Side.sell

    return this
  }
}
