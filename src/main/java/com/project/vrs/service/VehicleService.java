package com.project.vrs.service;

import com.project.vrs.model.Vehicle;
import com.project.vrs.model.VehicleInfo;
import com.project.vrs.resources.request.VehicleAddRequest;
import com.project.vrs.resources.request.VehicleInfoRequest;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.resources.response.VehicleResponse;

import java.util.List;
import java.util.Optional;

public interface VehicleService {

    List<VehicleResponse> getAvailableVehicles();

    GenericResponse addVehicles(VehicleAddRequest vehicle);

    Optional<VehicleInfo> vehiclequalityinfo(Long vehicleId);

    GenericResponse addVehicleQualityInfo(VehicleInfoRequest vehicleInfo);

    List<VehicleResponse> findAllByUsers_Email(String email);
}
