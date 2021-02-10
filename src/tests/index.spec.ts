import { request } from 'https'

import { buycoins } from '../index'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

const TEST_RESPONSE = 'TEST_RESPONSE'

jest.mock('https')

describe('@buycoins/sdk', () => {
  it('exposes the prices() api', async () => {
    const [, write] = useWriteMock()

    mockRequest.mockImplementation(
      requestMock(write, undefined, 200, TEST_RESPONSE)
    )

    await expect(buycoins().prices().bitcoin().sell().get()).resolves.toEqual(
      TEST_RESPONSE
    )
  })

  it('exposes the bankAccounts() api', async () => {
    const [, write] = useWriteMock()

    mockRequest.mockImplementation(
      requestMock(write, undefined, 200, TEST_RESPONSE)
    )

    await expect(buycoins().bankAccounts().get()).resolves.toEqual(
      TEST_RESPONSE
    )
  })

  it('exposes the balances() api', async () => {
    const [, write] = useWriteMock()

    mockRequest.mockImplementation(
      requestMock(write, undefined, 200, TEST_RESPONSE)
    )

    await expect(buycoins().balances().litecoin().get()).resolves.toEqual(
      TEST_RESPONSE
    )
  })

  it('exposes the estimatedNetworkFee() api', async () => {
    const [, write] = useWriteMock()

    mockRequest.mockImplementation(
      requestMock(write, undefined, 200, TEST_RESPONSE)
    )

    await expect(
      buycoins().estimatedNetworkFee().litecoin().get()
    ).resolves.toEqual(TEST_RESPONSE)
  })
})
