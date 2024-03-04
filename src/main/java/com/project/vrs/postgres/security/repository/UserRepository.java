package com.project.vrs.postgres.security.repository;

import com.project.vrs.postgres.security.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {

    Users findByEmail(String email);

    Users findByMobile(String mobileNumber);
}
