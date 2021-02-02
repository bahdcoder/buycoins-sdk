class QueryBuilder {
  constructor(
    private name: string,
    private fields: any[],
    private variables: any,
    private mutation?: boolean
  ) {}

  getVariables() {
    const variablesList = Object.keys(this.variables).map((key) => ({
      key,
      value: this.variables[key],
    }))

    if (variablesList.length === 0) {
      return ''
    }

    return `(${variablesList.map((variable, index) => {
      return `${variable.key}:${variable.value}${
        index === variablesList.length - 1 ? '' : ''
      }`
    })})`
  }

  build() {
    const queryType = this.mutation ? 'mutation' : 'query'

    return `
        ${queryType} { ${this.name}${this.getVariables()} {
            ${this.fields.map((field) => `${field}`)}
        } }
    `
  }
}

export const buildQuery = (
  name: string,
  fields: any[],
  variables: any,
  mutation?: boolean
) => new QueryBuilder(name, fields, variables, mutation).build()
