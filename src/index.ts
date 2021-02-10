// queries
import prices from './prices/prices'
import payments from './payments/payments'
import balances from './balances/balances'
import marketBook from './market-book/market-book'
import bankAccounts from './bank-accounts/bank-accounts'
import estimatedNetworkFee from './estimated-network-fee/estimated-network-fee'

// mutations
import buy from './buy/buy'
import createAddress from './create-address/create-address'
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
   * Cancel an existing payment withdrawal
   */
  cancelWithdrawal(): ReturnType<typeof cancelWithdrawal> {
    return cancelWithdrawal(this.key, this.secret)
  }

  /**
   * Create a crypto adddre
   */
  createAddress(): ReturnType<typeof createAddress> {
    return createAddress(this.key, this.secret)
  }
}

export const buycoins = () => new Buycoins()
