export enum Currencies {
  usd_tether = 'usd_tether',
  naira_token = 'naira_token',
  bitcoin = 'bitcoin',
  ethereum = 'ethereum',
  litecoin = 'litecoin',
  usd_coin = 'usd_coin',
}

export type ID = string

export type Int = number

export type BigDecimal = string

export type BigDecimalApprox = string

export type Cursor = string

export type UnixTimestamp = number

export enum Status {
  open = 'open',
  completed = 'completed',
}

export enum PriceStatus {
  expired = 'expired',
  active = 'active',
}

export enum Side {
  buy = 'buy',
  sell = 'sell',
}

export interface Account {
  id: ID
  confirmedBalance: BigDecimalApprox
  cryptocurrency: keyof typeof Currencies
}

export enum PaymentStatus {
  success = 'success',
  pending = 'pending',
  failed = 'failed',
  retried = 'retried',
  initiated = 'initiated',
  ready_for_processing = 'ready_for_processing',
  canceled = 'canceled',
  flagged = 'flagged',
  returned = 'returned',
}

export interface Payment {
  amount: BigDecimalApprox
  createdAt: Int
  fee: BigDecimalApprox
  id: ID
  reference: String
  status: keyof typeof PaymentStatus
  totalAmount: BigDecimalApprox
  type: PaymentTypes
}

export type PaymentTypes = keyof typeof BankAccountType

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

export interface Price {
  buyPricePerCoin: BigDecimal
  cryptocurrency: keyof typeof Currencies
  expiresAt: UnixTimestamp
  id: ID
  maxBuy: BigDecimal
  maxSell: BigDecimal
  minBuy: BigDecimal
  minCoinAmount: BigDecimalApprox
  minSell: BigDecimal
  sellPricePerCoin: BigDecimal
  status: keyof typeof PriceStatus
}

export interface Order {
  id: ID
  createdAt: UnixTimestamp
  cryptocurrency: keyof typeof Currencies
  filledCoinAmount: BigDecimalApprox
  price: Price
  side: keyof typeof Side
  status: keyof typeof Status
  totalCoinAmount: BigDecimalApprox
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

export interface GraphQlResponse {
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

export enum OnchainTransferRequestStatus {
  unconfirmed = 'unconfirmed',
  confirmed = 'confirmed',
  flagged = 'flagged',
  failed = 'failed',
  expired = 'expired',
  processed = 'processed',
  ready_for_processing = 'ready_for_processing',
  processing = 'processing',
}

export enum TransactionDirection {
  incoming = 'incoming',
  outgoing = 'outgoing',
}

export interface Transaction {
  id: ID
  txhash: string
  address: Address
  amount: BigDecimalApprox
  confirmed: Boolean
  createdAt: UnixTimestamp
  cryptocurrency: keyof typeof Currencies
  direction: keyof typeof TransactionDirection
  onchainTransferRequest: OnchainTransferRequest
}

export interface OnchainTransferRequest {
  address: String
  amount: BigDecimalApprox
  createdAt: UnixTimestamp
  cryptocurrency: keyof typeof Currencies
  fee: BigDecimalApprox
  id: ID
  status: keyof typeof OnchainTransferRequestStatus
  transaction: Transaction
}
