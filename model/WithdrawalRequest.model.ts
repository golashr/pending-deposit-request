export interface WithdrawalRequest {
  id: number;
  accountId: string;
  hin: string;
  type: string;
  code: string;
  amount: number;
  address: string;
  txHash: string;
  createdAt: string;
  updatedAt: string;
  state: string;
}
