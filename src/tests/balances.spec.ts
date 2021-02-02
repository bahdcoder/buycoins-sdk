import { request } from 'https'
import balances from '../balances/balances'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<getBalances>', () => {
  it('gets all balances', async () => {
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await balances().get()

    expect(getQuery()).toBe(
      'query{getBalances{id,confirmedBalance,cryptocurrency}}'
    )
  })

  it('gets only balances for bitcoin', async () => {
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await balances().bitcoin().get()

    expect(getQuery()).toBe(
      'query{getBalances(cryptocurrency:bitcoin){id,confirmedBalance,cryptocurrency}}'
    )
  })
})
