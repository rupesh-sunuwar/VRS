package com.project.vrs.resources.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

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

    @JsonProperty("user_email")
    private String userEmail;

    @Min(value = 1, message = "Request Amount must be at least 1")
    @JsonProperty("request_amount")
    private Double requestAmount;

    @JsonProperty("from_date")
    private LocalDateTime fromDate;

    @JsonProperty("to_date")
    private LocalDateTime toDate;
}
