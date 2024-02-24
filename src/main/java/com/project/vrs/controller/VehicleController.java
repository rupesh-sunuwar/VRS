package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.model.VehicleInfo;
import com.project.vrs.resources.request.VehicleAddRequest;
import com.project.vrs.resources.request.VehicleInfoRequest;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.resources.response.VehicleResponse;
import com.project.vrs.service.VehicleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping(Routes.AVAILABLE_VEHICLES)
    public List<VehicleResponse> getAvailableVehicles() {
        return vehicleService.getAvailableVehicles();
    }

    @PostMapping(Routes.ADD_VEHICLE)
    public GenericResponse addVehicle(@RequestBody VehicleAddRequest vehicle) {
        return vehicleService.addVehicles(vehicle);
    }

    @GetMapping(Routes.VEHICLE_QUALITY)
    public Optional<VehicleInfo> getVehicleQualityInfo(@PathVariable("vehicle_id") Long vehicleId) {
        return vehicleService.vehiclequalityinfo(vehicleId);
    }

    @PostMapping(Routes.ADD_VEHICLE_QUALITY)
    public GenericResponse addVehicleQualityInfo(@Valid @RequestBody VehicleInfoRequest vehicleInfo) {
        return vehicleService.addVehicleQualityInfo(vehicleInfo);
    }

    @GetMapping(Routes.USER_VEHICLES)
    public List<VehicleResponse> findAllByUsers_Email(@PathVariable("email") String userEmail) {
        return vehicleService.findAllByUsers_Email(userEmail);
    }
}
