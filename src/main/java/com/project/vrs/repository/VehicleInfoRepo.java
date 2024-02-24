package com.project.vrs.repository;

import com.project.vrs.model.VehicleInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleInfoRepo extends JpaRepository<VehicleInfo, Long> {

}
