package com.project.vrs.repository;

import com.project.vrs.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepo extends JpaRepository<Reservation, Long> {
}
