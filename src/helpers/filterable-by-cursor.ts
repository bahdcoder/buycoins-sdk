import Query from '../base/query'
import { Cursor } from '../types'

export interface FilterableByCursorInterface {
  before(before: Cursor): this
  after(after: Cursor): this
  first(first: number): this
  last(first: number): this
}

export class FilterableByCursor extends Query<
  {},
  {
    root: {
      before?: Cursor
      after?: Cursor
      first?: number
      last?: number
    }
  }
> {
  before(before: Cursor) {
    this.baseOptions.variables.root.before = before
    this.baseOptions.variables.root.after = undefined

    return this
  }

  after(after: Cursor) {
    this.baseOptions.variables.root.after = after
    this.baseOptions.variables.root.before = undefined

    return this
  }

  first(first: number) {
    this.baseOptions.variables.root.first = first
    this.baseOptions.variables.root.last = undefined

    return this
  }

  last(last: number) {
    this.baseOptions.variables.root.last = last
    this.baseOptions.variables.root.first = undefined

    return this
  }
}
