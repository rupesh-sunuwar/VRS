package com.project.vrs.resources.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.vrs.enums.VehicleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleAddRequest implements Serializable {

    @JsonProperty("manufactured_by")
    private String manufacturedBy;

    @JsonProperty("vehicle_no")
    private String vehicleNo;

    @JsonProperty("vehicle_type")
    private VehicleType vehicleType;

    @JsonProperty("is_available")
    private Boolean isAvailable;

    @JsonProperty("user_email")
    private String userEmail;

    @JsonProperty("vehicle_photo_name")
    private String vehiclePhotoName;

    @JsonProperty("content_type")
    private String contentType;
}
