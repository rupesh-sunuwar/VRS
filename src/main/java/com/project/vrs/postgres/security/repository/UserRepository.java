package com.project.vrs.postgres.security.repository;

import com.project.vrs.postgres.security.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<Users, Long> {

    Users findByEmail(String email);

    Users findByMobile(String mobileNumber);

    @Query("SELECT u FROM Users u WHERE (u.kycStatus = 'APPROVED' OR u.kycStatus = 'REJECTED' OR u.kycStatus = 'PENDING')")
    List<Users> findByKycStatus();
}
