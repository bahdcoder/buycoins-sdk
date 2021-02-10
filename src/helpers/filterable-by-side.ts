import Query from '../base/query'
import { Side } from '../types'

export interface FilterableBySideInterface {
  buy(): this
  sell(): this
}

export class FilterableBySide extends Query<
  {},
  {
    root: {
      side: keyof typeof Side
    }
  }
> {
  buy() {
    this.baseOptions.variables.root.side = Side.buy

    return this
  }

  sell() {
    this.baseOptions.variables.root.side = Side.sell

    return this
  }
}
