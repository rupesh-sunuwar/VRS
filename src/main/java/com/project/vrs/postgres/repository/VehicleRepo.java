package com.project.vrs.postgres.repository;

import com.project.vrs.postgres.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepo extends JpaRepository<Vehicle, Long> {


    List<Vehicle> findAllByIsAvailable(boolean isAvailable);

    Optional<Vehicle> findVehicleByVehicleNo(String vehicleNo);

    List<Vehicle> findAllByUsers_Email(String email);
}
