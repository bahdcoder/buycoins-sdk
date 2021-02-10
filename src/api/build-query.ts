const isObject = (item: any) =>
  typeof item === 'object' && !Array.isArray(item) && item !== null

class QueryBuilder {
  constructor(
    private name: string,
    private fields: any[],
    private variables: any,
    private mutation?: boolean
  ) {}

  private enumVariables = ['cryptocurrency', 'side', 'status', 'orderStatus']

  private integerVariables = ['first', 'last']

  private getVariableValue(variable: { key: string; value: string }) {
    if (
      this.enumVariables.includes(variable.key) ||
      this.integerVariables.includes(variable.key)
    ) {
      return `${variable.key}:${variable.value}`
    }

    return `${variable.key}:"${variable.value}"`
  }

  getVariables(variablesMap = this.variables.root) {
    const variablesList = Object.keys(variablesMap).map((key) => ({
      key,
      value: variablesMap[key],
    }))

    if (variablesList.length === 0) {
      return ''
    }

    return `(${variablesList
      .filter((variable) => typeof variable.value === 'string')
      .map((variable, index) => {
        return `${this.getVariableValue(variable)}${
          index === variablesList.length - 1 ? '' : ''
        }`
      })})`
  }

  buildField(field: any) {
    if (typeof field === 'string') {
      return field
    }

    let queries = ``

    const compileObjectQuery = (field: any) => {
      Object.keys(field).forEach((key, fieldIndex) => {
        queries = `${queries} ${key}${
          this.variables.root[key] && isObject(this.variables.root[key])
            ? this.getVariables(this.variables.root[key])
            : ''
        } {`

        field[key].forEach((nestedKey: any, nestedKeyIndex: number) => {
          if (isObject(nestedKey)) {
            compileObjectQuery(nestedKey)
          } else {
            queries = `${queries} ${nestedKey}${
              nestedKeyIndex === field[key].length - 1 ? ' }' : ','
            }`
          }
        })

        queries = `${queries}${
          fieldIndex === Object.keys(field).length - 1 ? ' }' : ''
        }`
      })
    }

    compileObjectQuery(field)

    return queries.slice(0, -1)
  }

  build() {
    const queryType = this.mutation ? 'mutation' : 'query'

    return `
        ${queryType} { ${this.name}${this.getVariables()} {
            ${this.fields.map(
              (field) => `
            ${this.buildField(field)}  
          `
            )}
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
