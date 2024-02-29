package com.project.vrs.service.impl;

import com.project.vrs.enums.PaymentStatus;
import com.project.vrs.model.Payment;
import com.project.vrs.model.Reservation;
import com.project.vrs.repository.PaymentRepo;
import com.project.vrs.repository.ReservationRepo;
import com.project.vrs.resources.response.PaymentResponse;
import com.project.vrs.service.BookingService;
import com.project.vrs.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepo paymentRepo;
    private final BookingService bookingService;
    private final ReservationRepo reservationRepo;
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    @Override
    public PaymentResponse makePayment(Payment payment) {
        payment.setPaymentNo(generateRandomString(5));
        payment.setPaymentStatus(PaymentStatus.SUCCESSFUL);
        Payment success=paymentRepo.save(payment);
        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setAmount(payment.getAmount());
        paymentResponse.setPaymentId(payment.getId());
        if(payment.getPaymentStatus()==PaymentStatus.SUCCESSFUL){
          Reservation reservation=  bookingService.completeBooking(payment.getVehicleId());
          reservation.setPayment(success);
          reservationRepo.save(reservation);
        }
        return paymentResponse;
    }

    public static String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = RANDOM.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }
}
