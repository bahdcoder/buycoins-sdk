import { QueryOptions } from './query.interface'

class Query<FieldInterface = any, VariablesMapInterface = {}> {
  protected baseOptions: QueryOptions<FieldInterface, VariablesMapInterface> = {
    fields: [],
    variables: {} as any,
    credentials: {
      key: '',
      secret: '',
    },
  }

  constructor(key?: string, secret?: string) {
    this.baseOptions.credentials = {
      key,
      secret,
    }
  }

  public fields(fields: FieldInterface[]) {
    this.baseOptions.fields = fields

    return this
  }
}

export default Query
