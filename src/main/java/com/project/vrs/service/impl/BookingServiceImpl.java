package com.project.vrs.service.impl;

import com.project.vrs.annotation.Notification;
import com.project.vrs.enums.ReservationStatus;
import com.project.vrs.exception.PaymentException;
import com.project.vrs.exception.UserException;
import com.project.vrs.postgres.model.Reservation;
import com.project.vrs.postgres.model.Vehicle;
import com.project.vrs.postgres.repository.ReservationRepo;
import com.project.vrs.postgres.repository.VehicleRepo;
import com.project.vrs.postgres.security.entity.Users;
import com.project.vrs.postgres.security.repository.UserRepository;
import com.project.vrs.resources.request.ReserveRequest;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.resources.response.ReservationResponse;
import com.project.vrs.service.BookingService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class BookingServiceImpl implements BookingService {

    private final VehicleRepo vehicleRepo;
    private final ReservationRepo reservationRepo;
    private final UserRepository userRepository;

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();


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
        reservation.setBookingNo(generateRandomString(5));
        reservation.setReservationStatus(ReservationStatus.IN_PROGRESS);
        reservation.setVehicle(vehicle);
        reservation.setNoOfPassengers(request.getNoOfPassengers());
        reservation.setFromLocation(request.getFromLocation());
        reservation.setDestination(request.getDestination());

        saveReservation(reservation);

        return reservationResponse(reservation);

    }

    @Override
    public List<ReservationResponse> getReservationList(String email) {
        log.info("Getting all reservation list of  with user id {}", email);
        return convertReservationList(reservationRepo.findAllByUser_Email(email));
    }

    @Override
    public List<ReservationResponse> getReservationRequest(String email) {
        log.info("Getting all reservation list of  with user id {}", email);
        return convertReservationList(reservationRepo.findAllByVehicle_Users_Email(email));
    }

    @Override
    public GenericResponse changeReservationStatus(String bookingNo, ReservationStatus reservationStatus) {
        log.info("Changing reservation status to {}", reservationStatus);
        Reservation reservation = reservationRepo.findByBookingNo(bookingNo);
        if (reservation != null) {
            reservation.setReservationStatus(reservationStatus);
            saveReservation(reservation);
            return new GenericResponse(1, "Request Accepted");
        }
        return new GenericResponse(0, "No bookingId with Id " + bookingNo);
    }

    @Override
    public Reservation completeBooking(String bookingNo) {
        log.info("Complete  booking of bookingNo  with vehicleId {}", bookingNo);
        Reservation reservation = reservationRepo.findByBookingNo(bookingNo);
        if (reservation != null) {
            reservation.setReservationStatus(ReservationStatus.COMPLETED);
            return reservationRepo.save(reservation);
        }
        return null;
    }

    @Override
    public List<ReservationResponse> getAllReservationList() {
        return convertReservationList(reservationRepo.findAll());
    }

    @Override
    @Notification
    public Reservation saveReservation(Reservation reservation) {
        return reservationRepo.save(reservation);
    }

    public static List<ReservationResponse> convertReservationList(List<Reservation> reservations) {
        List<ReservationResponse> responseList = new ArrayList<>();
        for (Reservation reservation : reservations) {
            ReservationResponse response = new ReservationResponse();
            response.setVehicleNo(reservation.getVehicle().getVehicleNo());
            response.setVehicleId(reservation.getVehicle().getId());
            if (reservation.getPayment() != null) {
                response.setPaymentId(reservation.getPayment().getId());
            }
            response.setDestination(reservation.getDestination());
            response.setBookingNo(reservation.getBookingNo());
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
        reservationResponse.setBookingNo(reservation.getBookingNo());
        reservationResponse.setVehicleNo(reservation.getVehicle().getVehicleNo());
        reservationResponse.setNoOfPassengers(reservation.getNoOfPassengers());
        reservationResponse.setFrom(reservation.getFromLocation());
        reservationResponse.setInitiatedBy(reservation.getUser().fullName());
        return reservationResponse;
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
