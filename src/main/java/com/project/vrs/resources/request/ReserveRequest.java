package com.project.vrs.resources.request;


import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty("no_of_passengers")
    private int noOfPassengers;

    @JsonProperty("user_id")
    private Long userId;
}
