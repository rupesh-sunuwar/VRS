package com.project.vrs.service;

import com.project.vrs.annotation.Notification;
import com.project.vrs.enums.ReservationStatus;
import com.project.vrs.postgres.model.Reservation;
import com.project.vrs.resources.request.ReserveRequest;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.resources.response.ReservationResponse;

import java.util.List;

public interface BookingService {

    ReservationResponse reserveVehicles(ReserveRequest request);

    List<ReservationResponse> getReservationList(String email);

    List<ReservationResponse> getReservationRequest(String email);

    GenericResponse changeReservationStatus(String vehicleId, ReservationStatus reservationStatus);

    Reservation completeBooking(String vehicleID);

    List<ReservationResponse> getAllReservationList();
}
