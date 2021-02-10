import { request } from 'https'
import bankAccounts from '../bank-accounts/bank-accounts'

import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<getBankAccounts>', () => {
  it('gets all bank accounts', async () => {
    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await bankAccounts().get()

    expect(getQuery()).toBe(
      'query{getBankAccounts{id,accountName,accountNumber,accountReference,accountType,bankName}}'
    )
  })

  it('gets only one bank account filtered by account number', async () => {
    const TEST_ACCOUNT_NUMBER = 'TEST_ACCOUNT_NUMBER'

    const [getQuery, write] = useWriteMock()

    mockRequest.mockImplementation(requestMock(write))

    await bankAccounts()
      .accountNumber(TEST_ACCOUNT_NUMBER)
      .fields(['accountName', 'accountNumber'])
      .get()

    expect(getQuery()).toBe(
      `query{getBankAccounts(accountNumber:\\\"TEST_ACCOUNT_NUMBER\\\"){accountName,accountNumber}}`
    )
  })
})
