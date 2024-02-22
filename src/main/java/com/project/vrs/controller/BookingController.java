package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.model.Vehicle;
import com.project.vrs.resources.request.ReserveRequest;
import com.project.vrs.resources.response.ReservationResponse;
import com.project.vrs.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @GetMapping(Routes.AVAILABLE_VEHICLES)
    public List<Vehicle> getAvailableVehicles() {
        return bookingService.getAvailableVehicles();
    }

    @PostMapping(Routes.RESERVE)
    public ReservationResponse reserveVehicle(@Valid @RequestBody ReserveRequest request) {
        return bookingService.reserveVehicles(request);
    }

    @PostMapping(Routes.ADD_VEHICLE)
    public void addVehicle(@RequestBody Vehicle vehicle){
        bookingService.addVehicles(vehicle);
    }
}
