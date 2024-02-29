package com.project.vrs.service.impl;

import com.project.vrs.enums.ReservationStatus;
import com.project.vrs.exception.PaymentException;
import com.project.vrs.exception.UserException;
import com.project.vrs.model.Reservation;
import com.project.vrs.model.Vehicle;
import com.project.vrs.repository.PaymentRepo;
import com.project.vrs.repository.ReservationRepo;
import com.project.vrs.repository.VehicleRepo;
import com.project.vrs.resources.request.ReserveRequest;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.resources.response.ReservationResponse;
import com.project.vrs.security.entity.Users;
import com.project.vrs.security.repository.UserRepository;
import com.project.vrs.service.BookingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookingServiceImpl implements BookingService {

    private final VehicleRepo vehicleRepo;
    private final ReservationRepo reservationRepo;
    private final UserRepository userRepository;
    private final PaymentRepo paymentRepo;

    @Override
    @Transactional
    public ReservationResponse reserveVehicles(ReserveRequest request) {
        log.info("Reserving Request with user id {}", request.getUserEmail());

        Reservation reservation = new Reservation();
        Users user = userRepository.findByEmail(request.getUserEmail());
        if (user == null) {
            throw new UserException("User with Email " + request.getUserEmail() + " not found");
        }
        reservation.setUser(user);

        Vehicle vehicle = vehicleRepo.findById(request.getVehicleId()).orElseThrow(() ->
                new PaymentException("Vehicle with ID " + request.getPaymentId() + " not found"));
        vehicle.setIsAvailable(false);
        vehicleRepo.save(vehicle);

        reservation.setAmount(request.getRequestAmount());
        reservation.setReservationStatus(ReservationStatus.IN_PROGRESS);
        reservation.setVehicle(vehicle);
        reservation.setNoOfPassengers(request.getNoOfPassengers());
        reservation.setFromLocation(request.getFromLocation());
        reservation.setDestination(request.getDestination());

        reservationRepo.save(reservation);

        return reservationResponse(reservation);

    }

    @Override
    public List<ReservationResponse> getReservationList(String email) {
        return convertReservationList(reservationRepo.findAllByUser_Email(email));
    }

    @Override
    public List<ReservationResponse> getReservationRequest(String email) {
        return convertReservationList(reservationRepo.findAllByVehicle_Users_Email(email));
    }

    @Override
    public GenericResponse changeReservationStatus(Long vehicleId,ReservationStatus reservationStatus) {
        Reservation reservation = reservationRepo.findByVehicle_Id(vehicleId);
        if (reservation != null) {
            reservation.setReservationStatus(reservationStatus);
            reservationRepo.save(reservation);
            return new GenericResponse(1, "Request Accepted");
        }
        return new GenericResponse(0, "No vehicle with Id " + vehicleId);
    }

    @Override
    public Reservation completeBooking(Long vehicleId) {
        Reservation reservation = reservationRepo.findByVehicle_Id(vehicleId);
        if (reservation != null) {
            reservation.setReservationStatus(ReservationStatus.CONFIRMED);

            reservationRepo.save(reservation);
            return reservationRepo.save(reservation);
        }
        return null;
    }

    public static List<ReservationResponse> convertReservationList(List<Reservation> reservations) {
        List<ReservationResponse> responseList = new ArrayList<>();
        for (Reservation reservation : reservations) {
            ReservationResponse response = new ReservationResponse();
            response.setVehicleId(reservation.getVehicle().getId());
            response.setDestination(reservation.getDestination());
            response.setFrom(reservation.getFromLocation());
            response.setNoOfPassengers(reservation.getNoOfPassengers());
            response.setInitiatedBy(reservation.getUser().fullName());
            response.setReservationStatus(reservation.getReservationStatus());
            response.setRequestAmount(reservation.getAmount());
            responseList.add(response);
        }
        return responseList;
    }

    @Transactional
    public ReservationResponse reservationResponse(Reservation reservation) {
        ReservationResponse reservationResponse = new ReservationResponse();
        reservationResponse.setDestination(reservation.getDestination());
        reservationResponse.setVehicleId(reservation.getVehicle().getId());
        reservationResponse.setNoOfPassengers(reservation.getNoOfPassengers());
        reservationResponse.setFrom(reservation.getFromLocation());
        reservationResponse.setInitiatedBy(reservation.getUser().fullName());
        return reservationResponse;
    }
}
