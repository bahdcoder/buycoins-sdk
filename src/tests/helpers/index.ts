import { parse } from 'querystring'
import { IncomingMessage } from 'http'

export type MockResponseEventCallback = (payload: string) => void

export type MockResponseCallback = (response: IncomingMessage) => void

export const useWriteMock = () => {
  let query: string = ''

  const write = jest.fn((q) => {
    query = JSON.stringify((parse(q).query as string).replace(/\n|\r/g, ''))
      .replace(/\n|\r/g, '')
      .replace(/ /g, '')
      .substring(1)
      .slice(0, -1)
  })

  const getQuery = () => query

  return [getQuery, write] as [() => string, jest.Mock<void, [q: string]>]
}

export const requestMock = (
  write: jest.Mock<void, [q: string]>,
  rejectsWith?: string,
  statusCode = 200,
  data: string = JSON.stringify(['response'])
) => (_: any, callback: MockResponseCallback) => {
  setTimeout(() => {
    callback(({
      setEncoding: jest.fn(),
      on: jest.fn((event, cb: MockResponseEventCallback) => {
        if (event === 'end') {
          cb(event)

          return
        }

        if (event === 'data') {
          cb(data)

          return
        }

        if (event === 'error') {
          if (rejectsWith) {
            cb(rejectsWith)
          }
        }
      }),
      statusCode,
    } as unknown) as IncomingMessage)
  }, 1)

  return {
    write,
    on: jest.fn((event, cb: MockResponseEventCallback) => {
      if (event === 'error' && rejectsWith) {
        cb(rejectsWith)
      }
    }),
    end: jest.fn(),
  }
}
