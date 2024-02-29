export interface Payment {
  paymentNo: string;
  paymentStatus: PaymentStatus;
  amount: number;
  vehicleId: number;
}


export enum PaymentStatus {
  // Define your payment status enum values here
  PENDING = 'PENDING',
  SUCCESSFUL = 'SUCCESSFUL',
  AMBIGIOUS = 'AMBIGIOUS'
}
