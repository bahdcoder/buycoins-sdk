import { request } from 'https'

import cancelWithdrawal from '../cancel-withdrawal/cancel-withdrawal'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<cancelWithdrawal>', () => {
  it('cancels a withdrawal', async () => {
    const TEST_PAYMENT_ID = 'TEST_PAYMENT_ID'
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await cancelWithdrawal().payment(TEST_PAYMENT_ID).post()

    expect(getQuery()).toBe(
      `mutation{cancelWithdrawal(payment:\\\"TEST_PAYMENT_ID\\\"){id,amount,createdAt,reference,fee,status,totalAmount,type}}`
    )
  })
})
