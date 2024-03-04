// model.ts

export interface ReservationResponse {
  vehicle_id: number;
  vehicle_no: string;
  booking_no:string;
  destination: string;
  from: string;
  no_of_passengers: number;
  initiated_by: string;
  payment_id: number;
  reservation_status: ReservationStatus;
  request_amount:number;
}


export enum ReservationStatus {
  PENDING="PENDING",
  CONFIRMED="CONFIRMED",
  CANCELLED="CANCELLED",
  COMPLETED="COMPLETED",
  IN_PROGRESS="IN_PROGRESS"
}
