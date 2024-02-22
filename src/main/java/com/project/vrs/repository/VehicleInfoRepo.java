package com.project.vrs.repository;

import com.project.vrs.model.VehicleInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VehicleInfoRepo extends JpaRepository<VehicleInfo, Long> {

    Optional<VehicleInfo> findByVehicle_Id(Long vehicleId);
}
