export interface VehicleInfoResponse {
  vehicle_id: number;
  is_maintenance_required: boolean;
  is_clean: boolean;
  vehicle_usage_time_in_months: number;
  tired_condition: TyreCondition;
}

export enum TyreCondition {
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR"
}
