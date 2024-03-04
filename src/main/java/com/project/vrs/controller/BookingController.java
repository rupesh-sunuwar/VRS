package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.enums.ReservationStatus;
import com.project.vrs.resources.request.ReserveRequest;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.resources.response.ReservationResponse;
import com.project.vrs.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping(Routes.RESERVE)
    public ReservationResponse reserveVehicle(@Valid @RequestBody ReserveRequest request) {
        return bookingService.reserveVehicles(request);
    }

    @GetMapping(Routes.RESERVATION_LIST)
    public List<ReservationResponse> getReservationList(@PathVariable String email){

        return bookingService.getReservationList(email);
    }

    @GetMapping(Routes.All_RESERVATION_LIST)
    public List<ReservationResponse> getAllReservationList(){
        return bookingService.getAllReservationList();
    }

    @GetMapping(Routes.RESERVATION_REQUEST)
    public List<ReservationResponse> getReservationRequest(@PathVariable String email){
        return bookingService.getReservationRequest(email);
    }

    @PostMapping(Routes.RESERVE_ACTON)
    public GenericResponse changeReservationStatus(@RequestParam String vehicleId ,
                                              @RequestParam ReservationStatus reservationStatus) {
        return bookingService.changeReservationStatus(vehicleId,reservationStatus);
    }
}
