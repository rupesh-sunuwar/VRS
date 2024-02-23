package com.project.vrs.resources.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.vrs.enums.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleResponse implements Serializable {

    @JsonProperty("manufactured_by")
    private String manufacturedBy;

    @JsonProperty("vehicle_no")
    private String vehicleNo;

    @JsonProperty("vehicle_type")
    private VehicleType vehicleType;

    private Boolean isAvailable;

    @JsonProperty("user_email")
    private String userEmail;
}
