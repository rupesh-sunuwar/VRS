// model.ts

export interface ReservationResponse {
  vehicle_id: number;
  destination: string;
  from: string;
  no_of_passengers: number;
  initiated_by: string;
  payment_id: number;
  reservation_status: ReservationStatus;
}


export enum ReservationStatus {
  // Define your reservation status enums here
}
