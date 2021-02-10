import { request } from 'https'

import sendOffchain from '../send-offchain/send-offchain'

import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<sendOffchain>', () => {
  it('sends ethereum offchain', async () => {
    const TEST_AMOUNT = '0.00235'
    const TEST_RECIPIENT = 'TEST_RECIPIENT'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await sendOffchain().amount(TEST_AMOUNT).nairaToken().recipient(TEST_RECIPIENT).post()

    expect(getQuery()).toBe(
      `mutation{sendOffchain(amount:\\\"0.00235\\\",cryptocurrency:naira_token,recipient:\\\"TEST_RECIPIENT\\\"){initiated}}`
    )
  })

  it('sends litecoin and returns specified fields offchain', async () => {
    const TEST_AMOUNT = '0.00235'
    const TEST_RECIPIENT = 'TEST_RECIPIENT'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await sendOffchain()
      .amount(TEST_AMOUNT)
      .litecoin()
      .recipient(TEST_RECIPIENT)
      .fields([
        'initiated'
      ])
      .post()

    expect(getQuery()).toBe(
      `mutation{sendOffchain(amount:\\\"0.00235\\\",cryptocurrency:litecoin,recipient:\\\"TEST_RECIPIENT\\\"){initiated}}`
    )
  })
})
