package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.model.Payment;
import com.project.vrs.resources.response.PaymentResponse;
import com.project.vrs.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping(Routes.MAKE_PAYMENT)
    public PaymentResponse makePayment(@RequestBody Payment payment) {
        return paymentService.makePayment(payment);
    }
}
