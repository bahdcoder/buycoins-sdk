export enum Currencies {
  usd_tether = 'usd_tether',
  naira_token = 'naira_token',
  bitcoin = 'bitcoin',
  ethereum = 'ethereum',
  litecoin = 'litecoin',
  usd_coin = 'usd_coin',
}

export type ID = string

export type BigDecimal = string

export type BigDecimalApprox = string

export type UnixTimestamp = number

export type PriceStatus = 'active' | 'expired'

export enum Side {
  buy = 'buy',
  sell = 'sell',
}

export interface Account {
  id: ID
  confirmedBalance: BigDecimalApprox
  cryptocurrency: keyof typeof Currencies
}

export enum BankAccountType {
  deposit = 'deposit',
  withdrawal = 'withdrawal',
}

export interface EstimatedFee {
  estimatedFee: BigDecimalApprox
  total: BigDecimal
}

export interface Address {
  id: ID
  address: string
  createdAt: UnixTimestamp
  cryptocurrency: keyof typeof Currencies
}

export interface BankAccount {
  id: ID
  bankName: string
  accountName: string
  accountNumber: string
  accountReference: string
  accountType: keyof typeof BankAccountType
}

export interface GraphqlError {
  message: string
  locations: any[]
  path: any[]
}

export interface GraphQlResponse<ShapeOfData = any> {
  data: ShapeOfData
  errors: GraphqlError[]
}

export enum PriceType {
  static = 'static',
  dynamic = 'dynamic',
}

export interface PostOrder {
  id: ID
  coinAmount: BigDecimalApprox
  createdAt: UnixTimestamp
  cryptocurrency: keyof typeof Currencies
  dynamicExchangeRate: BigDecimal
  pricePerCoin: BigDecimalApprox
  priceType: keyof typeof PriceType
  side: keyof typeof Side
  staticPrice: BigDecimal
}

export interface PostOrderEdge {
  cursor: string
  node: Partial<PostOrder>
}

export interface PostOrderConnection {
  edges: Partial<PostOrderEdge>[]
}
