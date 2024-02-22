export class ReserveRequest {
  constructor(
    public vehicle_id: number,
    public payment_id: number,
    public destination: string,
    public from_location: string,
    public no_of_passengers: number,
    public user_id: number
  ) {}
}

