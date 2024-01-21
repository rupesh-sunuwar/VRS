package com.project.vrs.model;

import com.project.vrs.enums.PaymentStatus;
import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Payment  extends AbstractEntity {

    private String paymentNo;

    private PaymentStatus  paymentStatus;

    private double amount;

}
