package com.project.vrs.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.vrs.resources.request.VehicleAddRequest;
import com.project.vrs.resources.request.VehicleInfoRequest;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.resources.response.VehicleInfoResponse;
import com.project.vrs.resources.response.VehicleResponse;

import java.util.List;

public interface VehicleService {

    List<VehicleResponse> getAvailableVehicles();

    GenericResponse addVehicles(VehicleAddRequest vehicle);

    VehicleInfoResponse vehiclequalityinfo(Long vehicleId);

    GenericResponse addVehicleQualityInfo(VehicleInfoRequest vehicleInfo);

    List<VehicleResponse> findAllByUsers_Email(String email);
}
