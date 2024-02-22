package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.model.Vehicle;
import com.project.vrs.model.VehicleInfo;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping(Routes.AVAILABLE_VEHICLES)
    public List<Vehicle> getAvailableVehicles() {
        return vehicleService.getAvailableVehicles();
    }

    @PostMapping(Routes.ADD_VEHICLE)
    public void addVehicle(@RequestBody Vehicle vehicle) {
        vehicleService.addVehicles(vehicle);
    }

    @GetMapping(Routes.VEHICLE_QUALITY)
    public Optional<VehicleInfo> getVehicleQualityInfo(@PathVariable("vehicle_id") Long vehicleId) {
        return vehicleService.vehiclequalityinfo(vehicleId);
    }

    @PostMapping(Routes.ADD_VEHICLE_QUALITY)
    public GenericResponse addVehicleQualityInfo(@RequestBody VehicleInfo vehicleInfo){
        return vehicleService.addVehicleQualityInfo(vehicleInfo);
    }
}
