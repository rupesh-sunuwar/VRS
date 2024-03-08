package com.project.vrs.postgres.repository;

import com.project.vrs.postgres.model.UserKYC;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserKYCRepository extends JpaRepository<UserKYC, Long> {
}
