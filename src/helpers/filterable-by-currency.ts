import Query from '../base/query'
import { Currencies } from '../types'

export interface FilterableByCryptocurrencyInterface {
  bitcoin(): this
  usdCoin(): this
  ethereum(): this
  litecoin(): this
  usdTether(): this
  nairaToken(): this
}

export class FilterableByCryptocurrency extends Query<
  {},
  {
    root: {
      cryptocurrency: keyof typeof Currencies
    }
  }
> {
  /**
   * Get the price of bitcoin only
   *
   * @returns Balances
   */
  public bitcoin() {
    this.baseOptions.variables.root.cryptocurrency = Currencies.bitcoin

    return this
  }

  /**
   * Get the price of usdtether only
   *
   * @returns Balances
   */
  public usdTether() {
    this.baseOptions.variables.root.cryptocurrency = Currencies.usd_tether

    return this
  }

  /**
   * Get the price of naira token only
   *
   * @returns Balances
   */
  public nairaToken() {
    this.baseOptions.variables.root.cryptocurrency = Currencies.naira_token

    return this
  }

  /**
   * Get the price of ethereum only
   *
   * @returns Balances
   */
  public ethereum() {
    this.baseOptions.variables.root.cryptocurrency = Currencies.ethereum

    return this
  }

  /**
   * Get the price of litecoin only
   *
   * @returns Balances
   */
  public litecoin() {
    this.baseOptions.variables.root.cryptocurrency = Currencies.litecoin

    return this
  }

  /**
   * Get the price of usd coin only
   *
   * @returns Balances
   */
  public usdCoin() {
    this.baseOptions.variables.root.cryptocurrency = Currencies.usd_coin

    return this
  }
}
