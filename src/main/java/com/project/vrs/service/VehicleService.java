package com.project.vrs.service;

import com.project.vrs.model.Vehicle;
import com.project.vrs.model.VehicleInfo;
import com.project.vrs.resources.response.GenericResponse;

import java.util.List;
import java.util.Optional;

public interface VehicleService {

    List<Vehicle> getAvailableVehicles();

    void addVehicles(Vehicle vehicle);

    Optional<VehicleInfo> vehiclequalityinfo(Long vehicleId);

    GenericResponse addVehicleQualityInfo(VehicleInfo vehicleInfo);
}
