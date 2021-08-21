export interface DepositRequest {
  id: number;
  accountId: string;
  hin: string;
  currencyId: string;
  address: string;
  code: string;
  amount: number;
  publicKey: string;
  depositTxHash: string;
  holdingsTxHash: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}
