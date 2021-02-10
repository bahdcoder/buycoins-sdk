import BaseHttps from 'https'
import QueryString from 'querystring'
import { QueryType, GraphQlRequestOptions } from './request.interface'

import { buildQuery } from './build-query'
import { BUYCOINS_API_HOSTNAME, BUYCOINS_API_PATH } from './constants'

class Https<
  FieldsInterface,
  VariablesInterface,
  ResponseInterface = {
    data: {
      [key: string]: FieldsInterface | FieldsInterface[]
    }
  }
> {
  private options: GraphQlRequestOptions<
    FieldsInterface,
    VariablesInterface
  > = {
    type: QueryType.query,
    name: '',
    fields: [],
    variables: {} as any,
  }

  constructor(
    private key = process.env.BUYCOINS_PUBLIC_KEY,
    private secret = process.env.BUYCOINS_SECRET_KEY
  ) {}

  private getParsedData(data: string) {
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }

  /**
   *
   * Make the API call. Returns a promise that resolves with the response.
   *
   * @returns Promise<>
   */
  public post(): Promise<ResponseInterface> {
    const payload = QueryString.stringify({
      query: buildQuery(
        this.options.name,
        this.options.fields,
        this.options.variables,
        this.options.type === QueryType.mutation
      ),
    })

    return new Promise((resolve, reject) => {
      const request = BaseHttps.request(
        {
          method: 'POST',
          hostname: BUYCOINS_API_HOSTNAME,
          path: BUYCOINS_API_PATH,
          port: 443,
          headers: {
            authorization: `Basic ${Buffer.from(
              `${this.key}:${this.secret}`
            ).toString('base64')}`,
            'Content-Length': Buffer.byteLength(payload),
          },
        },
        (response) => {
          let data = ''

          response.setEncoding('utf8')

          response.on('data', (chunk) => {
            data += chunk.toString()
          })

          response.on('error', (error) => {
            return reject(error)
          })

          response.on('end', () => {
            const parsed = this.getParsedData(data)

            if (response.statusCode === 200) {
              return resolve(parsed)
            }

            return reject(parsed)
          })
        }
      )

      request.on('error', (error) => {
        reject(error)
      })

      request.write(payload)

      request.end()
    })
  }

  /**
   * Define the graphql variables for this request.
   *
   * @param variables VariablesInterface
   *
   * @returns Https
   */
  public variables(variables: VariablesInterface) {
    this.options.variables = variables

    return this
  }

  /**
   * Define the fields for this api request
   *
   * @param fields FieldsInterface
   *
   * @returns Https
   */
  public fields(fields: FieldsInterface[]) {
    this.options.fields = fields

    return this
  }

  /**
   * Define this query type as a mutation
   *
   * @returns Https
   */
  public mutation() {
    this.options.type = QueryType.mutation

    return this
  }

  /**
   * Define the name of the query or mutation
   *
   * @returns Https
   */
  public query(name: string) {
    this.options.name = name

    return this
  }
}

const request = <FieldsInterface, VariablesInterface, ResponseInterface>(
  key?: string,
  secret?: string
) =>
  new Https<FieldsInterface, VariablesInterface, ResponseInterface>(key, secret)

export default request
