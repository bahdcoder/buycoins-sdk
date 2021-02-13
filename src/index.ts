// queries
import prices from './prices/prices'
import payments from './payments/payments'
import balances from './balances/balances'
import marketBook from './market-book/market-book'
import bankAccounts from './bank-accounts/bank-accounts'
import estimatedNetworkFee from './estimated-network-fee/estimated-network-fee'

// mutations
import buy from './buy/buy'
import sell from './sell/sell'
import send from './send/send'
import sendOffchain from './send-offchain/send-offchain'
import createAddress from './create-address/create-address'
import limitOrder from './post-limit-order/post-limit-order'
import marketOrder from './post-market-order/post-market-order'
import cancelWithdrawal from './cancel-withdrawal/cancel-withdrawal'

class Buycoins {
  private key: string | undefined = process.env.BUYCOINS_PUBLIC_KEY
  private secret: string | undefined = process.env.BUYCOINS_SECRET_KEY

  constructor(key?: string, secret?: string) {
    this.key = key
    this.secret = secret
  }

  /**
   * Retrieve buy/sell price(s) for supported cryptocurrencies
   */
  prices(): ReturnType<typeof prices> {
    return prices(this.key, this.secret)
  }

  /**
   * Retrieve bank accounts
   */
  bankAccounts(): ReturnType<typeof bankAccounts> {
    return bankAccounts(this.key, this.secret)
  }

  /**
   * Retrieve supported cryptocurrencies account balance(s)
   */
  balances(): ReturnType<typeof balances> {
    return balances(this.key, this.secret)
  }

  /**
   * Retrieve the estimated network fee for currencies or a single currency
   */
  estimatedNetworkFee(): ReturnType<typeof estimatedNetworkFee> {
    return estimatedNetworkFee(this.key, this.secret)
  }

  /**
   * Retrieve payments
   */
  payments(): ReturnType<typeof payments> {
    return payments(this.key, this.secret)
  }

  /**
   * Retrieve the market book
   */
  marketBook(): ReturnType<typeof marketBook> {
    return marketBook(this.key, this.secret)
  }

  /**
   * Buy an amount of crypto
   */
  buy(): ReturnType<typeof buy> {
    return buy(this.key, this.secret)
  }

  /**
   * Sell an amount of crypto
   */
  sell(): ReturnType<typeof sell> {
    return sell(this.key, this.secret)
  }

  /**
   * Send an amount of supported crypto to an external address
   */
  send(): ReturnType<typeof send> {
    return send(this.key, this.secret)
  }

  /**
   * Send supported cryptocurrencies to internal BuyCoins users
   */
  sendOffchain(): ReturnType<typeof sendOffchain> {
    return sendOffchain(this.key, this.secret)
  }

  /**
   * Cancel an existing payment withdrawal
   */
  cancelWithdrawal(): ReturnType<typeof cancelWithdrawal> {
    return cancelWithdrawal(this.key, this.secret)
  }

  /**
   * Post a market order
   */
  marketOrder(): ReturnType<typeof marketOrder> {
    return marketOrder(this.key, this.secret)
  }

  /**
   * Post a limit order
   */
  limitOrder(): ReturnType<typeof limitOrder> {
    return limitOrder(this.key, this.secret)
  }

  /**
   * Create a crypto address to receive coins
   */
  createAddress(): ReturnType<typeof createAddress> {
    return createAddress(this.key, this.secret)
  }
}

export const buycoins = (key?: string, secret?: string) => new Buycoins(key, secret)
