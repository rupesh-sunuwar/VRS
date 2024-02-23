export class Vehicle {
  constructor(
    public id: number,
    public manufacturedBy: string,
    public vehicleNo: string,
    public vehicleType: string,
    public isAvailable: boolean,
    public user_email: string,
  ) {
  }
}

