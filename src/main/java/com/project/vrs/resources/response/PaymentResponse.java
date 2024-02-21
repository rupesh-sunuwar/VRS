package com.project.vrs.resources.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse implements Serializable {

    private double amount;
    @JsonProperty("payment_id")
    private Long paymentId;
}
