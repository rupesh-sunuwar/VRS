package com.project.vrs.service;

import com.project.vrs.resources.request.ReserveRequest;
import com.project.vrs.resources.response.ReservationResponse;

public interface BookingService {

    ReservationResponse reserveVehicles(ReserveRequest request);
}
