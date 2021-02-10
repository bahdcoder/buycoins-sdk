import { request } from 'https'

import send from '../send/send'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<send>', () => {
  it('sends ethereum', async () => {
    const TEST_AMOUNT = '0.00235'
    const TEST_ADDRESS = 'TEST_ADDRESS'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await send().amount(TEST_AMOUNT).ethereum().address(TEST_ADDRESS).post()

    expect(getQuery()).toBe(
      `mutation{send(amount:\\\"0.00235\\\",cryptocurrency:ethereum,address:\\\"TEST_ADDRESS\\\"){id,fee,status,address,amount,createdAt,cryptocurrency,transaction{id,confirmed,amount,createdAt,cryptocurrency,txhash,direction,address{id,address,cryptocurrency,createdAt}}}}`
    )
  })

  it('sends litecoin and returns specified fields', async () => {
    const TEST_AMOUNT = '0.00235'
    const TEST_ADDRESS = 'TEST_ADDRESS'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await send()
      .amount(TEST_AMOUNT)
      .litecoin()
      .address(TEST_ADDRESS)
      .fields([
        'id',
        'fee',
        {
          transaction: [
            'direction',
            'id',
            {
              address: ['address', 'cryptocurrency', 'id'],
              onchainTransferRequest: ['id', 'fee', 'cryptocurrency', 'amount'],
            },
          ],
        },
      ])
      .post()

    expect(getQuery()).toBe(
      `mutation{send(amount:\\\"0.00235\\\",cryptocurrency:litecoin,address:\\\"TEST_ADDRESS\\\"){id,fee,transaction{direction,id,address{address,cryptocurrency,id}onchainTransferRequest{id,fee,cryptocurrency,amount}}}}`
    )
  })
})
