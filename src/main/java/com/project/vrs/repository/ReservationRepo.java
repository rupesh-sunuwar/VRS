package com.project.vrs.repository;

import com.project.vrs.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepo extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUser_Email(String email);
}
