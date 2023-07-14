export interface TransactionApproveModel {
  type: string | null;
  amount: number | null;
  processStatus: number | null;
  senderAccount: string | null;
  recipientAccount: string | null;
}
