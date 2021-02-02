import { request } from 'https'
import prices from '../prices/prices'
import { useWriteMock, requestMock } from './helpers'

const mockRequest = (request as unknown) as jest.Mock

jest.mock('https')

describe('<getPrices>', () => {
  it('all prices can be fetched', async () => {
    const [getQuery, write] = useWriteMock()
    mockRequest.mockImplementation(requestMock(write))

    await prices().get()

    expect(write).toHaveBeenCalledTimes(1)
    expect(getQuery()).toEqual(
      'query{getPrices{id,status,maxBuy,minSell,maxSell,expiresAt,minCoinAmount,cryptocurrency,buyPricePerCoin,sellPricePerCoin}}'
    )
  })

  it('.bitcoin() scopes prices only to bitcoin price', async () => {
    const [getQuery, write] = useWriteMock()
    mockRequest.mockImplementation(requestMock(write))

    await prices().bitcoin().sell().fields(['cryptocurrency']).get()

    expect(write).toHaveBeenCalledTimes(1)
    expect(getQuery()).toEqual(
      'query{getPrices(cryptocurrency:bitcoin,side:sell){cryptocurrency}}'
    )
  })

  it('.buy() scopes prices to only buy prices', async () => {
    const [getQuery, write] = useWriteMock()
    mockRequest.mockImplementation(requestMock(write))

    await prices().buy().get()

    expect(write).toHaveBeenCalledTimes(1)
    expect(getQuery()).toEqual(
      'query{getPrices(side:buy){id,status,maxBuy,minSell,maxSell,expiresAt,minCoinAmount,cryptocurrency,buyPricePerCoin,sellPricePerCoin}}'
    )
  })

  it('.ethereum() scopes prices only to ethereum price', async () => {
    const [getQuery, write] = useWriteMock()
    mockRequest.mockImplementation(requestMock(write))

    await prices().ethereum().sell().fields(['cryptocurrency']).get()

    expect(write).toHaveBeenCalledTimes(1)
    expect(getQuery()).toEqual(
      'query{getPrices(cryptocurrency:ethereum,side:sell){cryptocurrency}}'
    )
  })

  it('.litecoin() scopes prices only to ethereum price', async () => {
    const [getQuery, write] = useWriteMock()
    mockRequest.mockImplementation(requestMock(write))

    await prices().litecoin().sell().fields(['cryptocurrency']).get()

    expect(write).toHaveBeenCalledTimes(1)
    expect(getQuery()).toEqual(
      'query{getPrices(cryptocurrency:litecoin,side:sell){cryptocurrency}}'
    )
  })

  it('.usdCoin() scopes prices only to ethereum price', async () => {
    const [getQuery, write] = useWriteMock()
    mockRequest.mockImplementation(requestMock(write))

    await prices().usdCoin().sell().fields(['cryptocurrency']).get()

    expect(write).toHaveBeenCalledTimes(1)
    expect(getQuery()).toEqual(
      'query{getPrices(cryptocurrency:usd_coin,side:sell){cryptocurrency}}'
    )
  })

  it('.nairaToken() scopes prices only to ethereum price', async () => {
    const [getQuery, write] = useWriteMock()
    mockRequest.mockImplementation(requestMock(write))

    await prices().nairaToken().sell().fields(['cryptocurrency']).get()

    expect(write).toHaveBeenCalledTimes(1)
    expect(getQuery()).toEqual(
      'query{getPrices(cryptocurrency:naira_token,side:sell){cryptocurrency}}'
    )
  })

  it('.usdTether() scopes prices only to ethereum price', async () => {
    const [getQuery, write] = useWriteMock()
    mockRequest.mockImplementation(requestMock(write))

    await prices().usdTether().sell().fields(['cryptocurrency']).get()

    expect(write).toHaveBeenCalledTimes(1)
    expect(getQuery()).toEqual(
      'query{getPrices(cryptocurrency:usd_tether,side:sell){cryptocurrency}}'
    )
  })

  it('prices promise rejects when there is an error from buycoins', async () => {
    const BUYCOINS_ERROR = 'BUYCOINS_ERROR'

    const [, write] = useWriteMock()
    mockRequest.mockImplementation(requestMock(write, BUYCOINS_ERROR))

    await expect(
      prices().usdTether().sell().fields(['cryptocurrency']).get()
    ).rejects.toBe(BUYCOINS_ERROR)
  })

  it('prices promise rejects when buycoins returns a status code other than 200', async () => {
    const [, write] = useWriteMock()
    mockRequest.mockImplementation(requestMock(write, undefined, 400))

    await expect(
      prices().usdTether().sell().fields(['cryptocurrency']).get()
    ).rejects.toEqual(['response'])
  })

  it('prices promise rejects if bad payload is returned from buycoins', async () => {
    const [, write] = useWriteMock()
    mockRequest.mockImplementation(
      requestMock(write, undefined, 400, '{ errors }')
    )

    await expect(
      prices().usdTether().sell().fields(['cryptocurrency']).get()
    ).rejects.toBe('{ errors }')
  })
})
