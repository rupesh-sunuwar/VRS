package com.project.vrs.service.impl;

import com.project.vrs.exception.UserException;
import com.project.vrs.exception.VehicleException;
import com.project.vrs.postgres.model.Vehicle;
import com.project.vrs.postgres.model.VehicleInfo;
import com.project.vrs.postgres.repository.VehicleRepo;
import com.project.vrs.resources.request.VehicleAddRequest;
import com.project.vrs.resources.request.VehicleInfoRequest;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.resources.response.VehicleInfoResponse;
import com.project.vrs.resources.response.VehicleResponse;
import com.project.vrs.postgres.security.entity.Users;
import com.project.vrs.postgres.security.repository.UserRepository;
import com.project.vrs.service.VehicleService;
import jakarta.transaction.Transactional;
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
        VehicleResponse vehicleResponse = new VehicleResponse();
        vehicleResponse.setVehicleId(vehicle.getId());
        vehicleResponse.setUserStatus(String.valueOf(vehicle.getUsers().getKycStatus()));
        vehicleResponse.setManufacturedBy(vehicle.getManufacturedBy());
        vehicleResponse.setVehicleNo(vehicle.getVehicleNo());
        vehicleResponse.setVehicleType(vehicle.getVehicleType());
        vehicleResponse.setIsAvailable(vehicle.getIsAvailable());
        vehicleResponse.setUserEmail(vehicle.getUsers().getEmail());

        if (vehicle.getVehicleInfo() != null) {
            vehicleResponse.setVehicleInfoId(vehicle.getVehicleInfo().getId());
        }

        return vehicleResponse;
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
        vehicle2.setVehiclePhotoName(vehicle.getVehiclePhotoName());
        vehicle2.setContentType(vehicle.getContentType());
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
    public VehicleInfoResponse vehiclequalityinfo(Long vehicleId) {
        Vehicle vehicle = vehicleRepo.findById(vehicleId).orElseThrow(() -> new VehicleException("Vehicle Doesnt Exist"));

        return vehicleInfoToVehicleResponse(vehicle.getVehicleInfo());
    }

    public VehicleInfoResponse vehicleInfoToVehicleResponse(VehicleInfo vehicleInfo) {
        VehicleInfoResponse response = new VehicleInfoResponse();
        response.setVehicleId(vehicleInfo.getId());
        response.setMaintenanceRequired(vehicleInfo.isMaintenanceRequired());
        response.setClean(vehicleInfo.isClean());
        response.setVehicleUsageTimeInMonths(vehicleInfo.getVehicleUsageTimeInMonths());
        response.setTireCondition(vehicleInfo.getTireCondition());
        return response;

    }

    @Override
    @Transactional
    public GenericResponse addVehicleQualityInfo(VehicleInfoRequest vehicleInfoRequest) {

        Vehicle vehicle = vehicleRepo.findById(vehicleInfoRequest.getVehicleId()).orElseThrow(() ->
                new VehicleException("Vehicle Doesnt Exist"));
        VehicleInfo vehicleInfo1 = vehicleInfoRequestToVehicleInfo(vehicleInfoRequest);
        vehicle.setVehicleInfo(vehicleInfo1);
        vehicle.setIsAvailable(vehicleInfoRequest.getIsAvailable());
        vehicleRepo.save(vehicle);
        return new GenericResponse(1, "Successfully Added");
    }

    public VehicleInfo vehicleInfoRequestToVehicleInfo(VehicleInfoRequest vehicleInfoRequest) {
        VehicleInfo vehicleInfo = new VehicleInfo();
        vehicleInfo.setMaintenanceRequired(vehicleInfoRequest.isMaintenanceRequired());
        vehicleInfo.setClean(vehicleInfoRequest.isClean());
        vehicleInfo.setVehicleUsageTimeInMonths(vehicleInfoRequest.getVehicleUsageTimeInMonths());
        vehicleInfo.setTireCondition(vehicleInfoRequest.getTireCondition());
        return vehicleInfo;
    }

    @Override
    public List<VehicleResponse> findAllByUsers_Email(String email) {
        List<Vehicle> vehicles = vehicleRepo.findAllByUsers_Email(email);
        return fromVehiclesToVehicleResponses(vehicles);
    }
}
