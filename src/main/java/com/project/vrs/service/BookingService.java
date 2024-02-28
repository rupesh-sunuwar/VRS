package com.project.vrs.service;

import com.project.vrs.resources.request.ReserveRequest;
import com.project.vrs.resources.response.ReservationResponse;

import java.util.List;

public interface BookingService {

    ReservationResponse reserveVehicles(ReserveRequest request);

    List<ReservationResponse> getReservationList(String email);
}
