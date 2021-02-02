import { request } from 'https'
import createAddress from '../create-address/create-address'

import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<.createAddress()>', () => {
  it('creates an ethereum address', async () => {
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await createAddress().ethereum().post()

    expect(getQuery()).toBe('mutation{createAddress(cryptocurrency:ethereum){id,address,createdAt,cryptocurrency}}')
  })
})
