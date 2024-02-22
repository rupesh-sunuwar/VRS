package com.project.vrs.service.impl;

import com.project.vrs.exception.VehicleException;
import com.project.vrs.model.Vehicle;
import com.project.vrs.model.VehicleInfo;
import com.project.vrs.repository.VehicleInfoRepo;
import com.project.vrs.repository.VehicleRepo;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.service.VehicleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepo vehicleRepo;
    private final VehicleInfoRepo vehicleInfoRepo;

    @Override
    public List<Vehicle> getAvailableVehicles() {

        return vehicleRepo.findAllByIsAvailable(true);
    }

    @Override
    public void addVehicles(Vehicle vehicle) {

        vehicleRepo.save(vehicle);
    }

    @Override
    public Optional<VehicleInfo> vehiclequalityinfo(Long vehicleId) {
        return vehicleInfoRepo.findByVehicle_Id(vehicleId);
    }

    @Override
    public GenericResponse addVehicleQualityInfo(VehicleInfo vehicleInfo) {

        Vehicle vehicle = vehicleRepo.findById(vehicleInfo.getId()).orElseThrow(() ->
                new VehicleException("Vehicle Doesnt Exist"));
        vehicleInfo.setVehicle(vehicle);
        vehicleInfoRepo.save(vehicleInfo);
        return new GenericResponse(1, "Successfully Added");
    }
}
