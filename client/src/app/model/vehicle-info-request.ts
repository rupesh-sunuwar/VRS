import {TyreCondition} from "./enums/tyre-condition";

export class VehicleInfoRequest {
  constructor(
    public vehicle_id: number,
    public is_maintenance_required: boolean,
    public is_clean: boolean,
    public vehicle_usage_time_in_months: number,
    public tired_condition: TyreCondition,
  ) {
  }
}
