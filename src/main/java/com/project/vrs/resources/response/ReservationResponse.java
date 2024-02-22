package com.project.vrs.resources.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse implements Serializable {

    @JsonProperty("vehicle_id")
    private Long vehicleId;

    private String destination;

    private String from;

    @JsonProperty("no_of_passengers")
    private int noOfPassengers;

    @JsonProperty("initiated_by")
    private String initiatedBy;

    @JsonProperty("payment_id")
    private Long paymentId;
}
