import prices from './prices/prices'
import balances from './balances/balances'
import bankAccounts from './bank-accounts/bank-accounts'

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
}

export const buycoins = () => new Buycoins()
