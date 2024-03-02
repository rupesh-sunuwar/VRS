import {TyreCondition} from "./enums/tyre-condition";

export class VehicleInfoRequest {

  vehicle_id: number;
  is_maintenance_required?: boolean;
  is_clean?: boolean;
  vehicle_usage_time_in_months?: number;
  tired_condition?: TyreCondition;

  constructor(
    vehicle_id: number,
    is_maintenance_required?: boolean,
    is_clean?: boolean,
    vehicle_usage_time_in_months?: number,
    tired_condition?: TyreCondition,
  ) {
    this.vehicle_id = vehicle_id || 0;
    this.is_maintenance_required = is_maintenance_required !== undefined ? is_maintenance_required : undefined;
    this.is_clean = is_clean !== undefined ? is_clean : undefined;
    this.vehicle_usage_time_in_months = vehicle_usage_time_in_months || 0;
    this.tired_condition = tired_condition || TyreCondition.FAIR;
  }
}
