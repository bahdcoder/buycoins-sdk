export enum QueryType {
  mutation = 'mutation',
  query = 'query',
}

export interface GraphQlRequestOptions<FieldsInterface, VariablesInterface> {
  type: keyof typeof QueryType
  name: string
  fields: FieldsInterface[]
  variables: VariablesInterface
}
