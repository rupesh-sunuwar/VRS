package com.project.vrs.repository;

import com.project.vrs.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepo extends JpaRepository<Vehicle, Long> {


    List<Vehicle> findAllByIsAvailable(boolean isAvailable);
}
