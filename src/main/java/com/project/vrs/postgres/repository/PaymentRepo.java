package com.project.vrs.postgres.repository;

import com.project.vrs.postgres.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepo extends JpaRepository<Payment, Long> {
}
