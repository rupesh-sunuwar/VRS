export interface Payment {
  paymentNo: string;
  paymentStatus: PaymentStatus;
  amount: string;
  vehicleId: number;
  bookingNo:string;
}


export enum PaymentStatus {
  // Define your payment status enum values here
  PENDING = 'PENDING',
  SUCCESSFUL = 'SUCCESSFUL',
  AMBIGIOUS = 'AMBIGIOUS'
}
