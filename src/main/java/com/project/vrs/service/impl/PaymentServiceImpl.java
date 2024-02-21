package com.project.vrs.service.impl;

import com.project.vrs.model.Payment;
import com.project.vrs.repository.PaymentRepo;
import com.project.vrs.resources.response.PaymentResponse;
import com.project.vrs.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepo paymentRepo;

    @Override
    public PaymentResponse makePayment(Payment payment) {
        paymentRepo.save(payment);
        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setAmount(payment.getAmount());
        paymentResponse.setPaymentId(payment.getId());
        return paymentResponse;
    }
}
