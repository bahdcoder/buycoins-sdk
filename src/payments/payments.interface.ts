export type PaymentNodeType = Partial<
  [
    'id',
    'amount',
    'createdAt',
    'fee',
    'reference',
    'status',
    'totalAmount',
    'type'
  ]
>

export type PaymentsFields =
  | {
      pageInfo: Partial<
        ['endCursor', 'hasNextPage', 'hasPreviousPage', 'startCursor']
      >
    }
  | {
      edges: [
        'cursor',
        {
          node: PaymentNodeType
        }
      ]
    }
  | {
      nodes: PaymentNodeType
    }

export interface PaymentsVariables {
  root: {
    before?: String
    after?: String
    first?: number
    last?: number
  }
}
