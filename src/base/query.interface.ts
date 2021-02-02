export interface QueryOptions<FieldInterface, VariablesMapInterface> {
  fields: FieldInterface[]
  variables: VariablesMapInterface
  credentials: {
    key: string | undefined
    secret: string | undefined
  }
}
