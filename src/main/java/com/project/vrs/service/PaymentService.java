package com.project.vrs.service;

import com.project.vrs.postgres.model.Payment;
import com.project.vrs.resources.response.PaymentResponse;

public interface PaymentService{
     PaymentResponse makePayment(Payment payment);
}
