import Query from '../base/query'
import { Status } from '../types'

export interface FilterableByStatusInterface {
  open(): this
  completed(): this
}

export class FilterableByStatus extends Query<
  {},
  {
    status: keyof typeof Status
  }
> {
  open() {
    this.baseOptions.variables.status = Status.open

    return this
  }

  completed() {
    this.baseOptions.variables.status = Status.completed

    return this
  }
}
