export class Vehicle {
  constructor(
    public id: number,
    public manufacturedBy: string,
    public model: string,
    public vehicleNo: string,
    public manufacturedYear: string,
    public vehicleType: string,
    public isAvailable: boolean
  ) {
  }
}

