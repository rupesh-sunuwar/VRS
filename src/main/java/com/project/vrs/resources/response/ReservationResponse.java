package com.project.vrs.resources.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.vrs.enums.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse implements Serializable {

    @JsonProperty("vehicle_id")
    private Long vehicleId;

    @JsonProperty("vehicle_no")
    private String vehicleNo;

    @JsonProperty("booking_no")
    private String bookingNo;

    private String destination;

    private String from;

    @JsonProperty("no_of_passengers")
    private int noOfPassengers;

    @JsonProperty("initiated_by")
    private String initiatedBy;

    @JsonProperty("payment_id")
    private Long paymentId;

    @JsonProperty("reservation_status")
    private ReservationStatus reservationStatus;

    @JsonProperty("request_amount")
    private Double requestAmount;

    @JsonProperty("from_date")
    private LocalDateTime fromDate;

    @JsonProperty("to_date")
    private LocalDateTime toDate;
}
