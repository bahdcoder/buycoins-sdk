import { request } from 'https'
import estimatedNetworkFee from '../estimated-network-fee/estimated-network-fee'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<getEstimatedNetworkFee>', () => {
  it('gets estimated network fee', async () => {
    const TEST_AMOUNT = '0.002'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await estimatedNetworkFee().amount(TEST_AMOUNT).get()

    expect(getQuery()).toBe(
      `query{getEstimatedNetworkFee(amount:\\\"0.002\\\"){estimatedFee,total}}`
    )
  })

  it('gets estimated network fee for litecoin', async () => {
    const TEST_AMOUNT = '0.002'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await estimatedNetworkFee().litecoin().amount(TEST_AMOUNT).get()

    expect(getQuery()).toBe(
      `query{getEstimatedNetworkFee(cryptocurrency:litecoin,amount:\\\"0.002\\\"){estimatedFee,total}}`
    )
  })
})
