package com.project.vrs.service.impl;

import com.project.vrs.exception.UserException;
import com.project.vrs.exception.VehicleException;
import com.project.vrs.model.Vehicle;
import com.project.vrs.model.VehicleInfo;
import com.project.vrs.repository.VehicleInfoRepo;
import com.project.vrs.repository.VehicleRepo;
import com.project.vrs.resources.request.VehicleAddRequest;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.resources.response.VehicleResponse;
import com.project.vrs.security.entity.Users;
import com.project.vrs.security.repository.UserRepository;
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
    private final UserRepository userRepository;

    @Override
    public List<VehicleResponse> getAvailableVehicles() {
        List<Vehicle> vehicles = vehicleRepo.findAllByIsAvailable(true);
        return fromVehiclesToVehicleResponses(vehicles);
    }

    public List<VehicleResponse> fromVehiclesToVehicleResponses(List<Vehicle> vehicles) {
        return vehicles.stream()
                .map(this::convertToVehicleResponse)
                .toList();
    }

    private VehicleResponse convertToVehicleResponse(Vehicle vehicle) {

        return new VehicleResponse(vehicle.getManufacturedBy(), vehicle.getVehicleNo(),
                vehicle.getVehicleType(), vehicle.getIsAvailable(), vehicle.getUsers().getEmail());
    }

    @Override
    public GenericResponse addVehicles(VehicleAddRequest vehicle) {

        Optional<Vehicle> vehicle1 = vehicleRepo.findVehicleByVehicleNo(vehicle.getVehicleNo());
        if (vehicle1.isPresent()) {
            throw new VehicleException("Vehicle With vehicle_no " + vehicle.getVehicleNo() + " already registered.");
        }
        Users user = userRepository.findByEmail(vehicle.getUserEmail());
        if (user == null) {
            throw new UserException("User Doesnt Exist");
        }
        Vehicle vehicle2 = vehicleRequestToVehicle(vehicle);
        vehicle2.setUsers(user);
        vehicleRepo.save(vehicle2);
        return new GenericResponse(1, "Successfully Added.");
    }

    public Vehicle vehicleRequestToVehicle(VehicleAddRequest vehicle) {
        Vehicle vehicle1 = new Vehicle();
        vehicle1.setManufacturedBy(vehicle.getManufacturedBy());
        vehicle1.setVehicleNo(vehicle.getVehicleNo());
        vehicle1.setVehicleType(vehicle.getVehicleType());
        vehicle1.setIsAvailable(vehicle.getIsAvailable());
        return vehicle1;
    }

    @Override
    public Optional<VehicleInfo> vehiclequalityinfo(Long vehicleId) {
        return vehicleInfoRepo.findByVehicle_Id(vehicleId);
    }

    @Override
    public GenericResponse addVehicleQualityInfo(VehicleInfo vehicleInfo) {

        Vehicle vehicle = vehicleRepo.findById(vehicleInfo.getIdVehicle()).orElseThrow(() ->
                new VehicleException("Vehicle Doesnt Exist"));
        vehicleInfo.setVehicle(vehicle);
        vehicleInfoRepo.save(vehicleInfo);
        return new GenericResponse(1, "Successfully Added");
    }

    @Override
    public List<VehicleResponse> findAllByUsers_Email(String email) {
        List<Vehicle> vehicles = vehicleRepo.findAllByUsers_Email(email);
        return fromVehiclesToVehicleResponses(vehicles);
    }
}
