package com.project.vrs.service.impl;

import com.project.vrs.exception.PaymentException;
import com.project.vrs.exception.UserException;
import com.project.vrs.model.Payment;
import com.project.vrs.model.Reservation;
import com.project.vrs.model.Vehicle;
import com.project.vrs.repository.PaymentRepo;
import com.project.vrs.repository.ReservationRepo;
import com.project.vrs.repository.VehicleRepo;
import com.project.vrs.resources.request.ReserveRequest;
import com.project.vrs.resources.response.ReservationResponse;
import com.project.vrs.security.entity.Users;
import com.project.vrs.security.repository.UserRepository;
import com.project.vrs.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final VehicleRepo vehicleRepo;
    private final ReservationRepo reservationRepo;
    private final UserRepository userRepository;
    private final PaymentRepo paymentRepo;

    @Override
    public ReservationResponse reserveVehicles(ReserveRequest request) {


        Reservation reservation = new Reservation();

        reservation.setVehicleId(request.getVehicleId());

        Users user = userRepository.findById(request.getUserId()).orElseThrow(
                () -> new UserException("User with ID " + request.getUserId() + " not found")
        );
        reservation.setUser(user);
        Payment payment = paymentRepo.findById(request.getPaymentId()).orElseThrow(() ->
                new PaymentException("Payment with ID " + request.getPaymentId() + " not found"));

        Vehicle vehicle = vehicleRepo.findById(request.getVehicleId()).orElseThrow(() ->
                new PaymentException("Vehicle with ID " + request.getPaymentId() + " not found"));
        reservation.setVehicleId(vehicle.getId());
        reservation.setPayment(payment);
        reservation.setNoOfPassengers(request.getNoOfPassengers());
        reservation.setFromLocation(request.getFromLocation());
        reservation.setDestination(request.getDestination());

        reservationRepo.save(reservation);

        return reservationResponse(reservation);

    }

    public ReservationResponse reservationResponse(Reservation reservation) {
        ReservationResponse reservationResponse = new ReservationResponse();
        reservationResponse.setPaymentId(reservation.getPayment().getId());
        reservationResponse.setDestination(reservation.getDestination());
        reservationResponse.setVehicleId(reservation.getVehicleId());
        reservationResponse.setNoOfPassengers(reservation.getNoOfPassengers());
        reservationResponse.setFrom(reservation.getFromLocation());
        return reservationResponse;
    }


    @Override
    public List<Vehicle> getAvailableVehicles() {
        return vehicleRepo.findAllByIsAvailable(true);
    }

    @Override
    public void addVehicles(Vehicle vehicle) {
        vehicleRepo.save(vehicle);
    }
}
