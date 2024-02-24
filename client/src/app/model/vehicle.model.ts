export class Vehicle {
  constructor(
    public vehicle_id: number,
    public manufactured_by: string,
    public vehicle_no: string,
    public vehicle_type: string,
    public is_available: boolean,
    public vehicle_info_id:number,
    public user_email: string,
  ) {
  }
}

