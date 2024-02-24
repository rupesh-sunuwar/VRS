package com.project.vrs.resources.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.vrs.enums.TyreCondition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleInfoRequest {

    @JsonProperty("vehicle_id")
    private Long vehicleId;
    @JsonProperty("is_maintenance_required")
    private boolean isMaintenanceRequired;
    @JsonProperty("is_clean")
    private boolean isClean;
    @JsonProperty("vehicle_usage_time_in_months")
    private int vehicleUsageTimeInMonths;
    @JsonProperty("tired_condition")
    private TyreCondition tireCondition;
}
