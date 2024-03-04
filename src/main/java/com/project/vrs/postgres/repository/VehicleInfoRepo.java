package com.project.vrs.postgres.repository;

import com.project.vrs.postgres.model.VehicleInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleInfoRepo extends JpaRepository<VehicleInfo, Long> {

}
