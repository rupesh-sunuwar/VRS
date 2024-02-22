package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.resources.request.ReserveRequest;
import com.project.vrs.resources.response.ReservationResponse;
import com.project.vrs.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping(Routes.RESERVE)
    public ReservationResponse reserveVehicle(@Valid @RequestBody ReserveRequest request) {
        return bookingService.reserveVehicles(request);
    }
}
