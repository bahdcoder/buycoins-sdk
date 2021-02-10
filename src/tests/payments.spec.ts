import { request } from 'https'
import payments from '../payments/payments'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<payments>', () => {
  it('gets payments', async () => {
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await payments().get()

    expect(getQuery()).toBe(
      `query{getPayments{pageInfo{endCursor,hasNextPage,hasPreviousPage,startCursor},edges{cursor,node{id,amount,createdAt,fee,reference,status,totalAmount,type}},nodes{id,amount,createdAt,fee,reference,status,totalAmount,type}}}`
    )
  })

  it('gets payments before <x>', async () => {
    const [getQuery, write] = useWriteMock()

    const TEST_BEFORE = 'TEST_BEFORE'

    mockRequest.mockImplementation(requestMock(write))

    await payments().before(TEST_BEFORE).first(2).get()

    expect(getQuery()).toBe(
      `query{getPayments(before:\\\"TEST_BEFORE\\\"){pageInfo{endCursor,hasNextPage,hasPreviousPage,startCursor},edges{cursor,node{id,amount,createdAt,fee,reference,status,totalAmount,type}},nodes{id,amount,createdAt,fee,reference,status,totalAmount,type}}}`
    )
  })

  it('gets payments after <x>', async () => {
    const [getQuery, write] = useWriteMock()

    const TEST_AFTER = 'TEST_AFTER'

    mockRequest.mockImplementation(requestMock(write))

    await payments().after(TEST_AFTER).last(3).get()

    expect(getQuery()).toBe(
      `query{getPayments(after:\\\"TEST_AFTER\\\"){pageInfo{endCursor,hasNextPage,hasPreviousPage,startCursor},edges{cursor,node{id,amount,createdAt,fee,reference,status,totalAmount,type}},nodes{id,amount,createdAt,fee,reference,status,totalAmount,type}}}`
    )
  })
})
