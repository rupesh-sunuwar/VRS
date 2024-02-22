package com.project.vrs.resources.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReserveRequest implements Serializable {

    @JsonProperty("vehicle_id")
    private Long vehicleId;

    @JsonProperty("payment_id")
    private Long paymentId;

    private String destination;

    @JsonProperty("from_location")
    private String fromLocation;

    @Min(value = 1, message = "Passenger must be at least 1")
    @Max(value = 5, message = "Passenger must not exceed 5")
    @JsonProperty("no_of_passengers")
    private int noOfPassengers;

    @JsonProperty("user_id")
    private Long userId;
}
