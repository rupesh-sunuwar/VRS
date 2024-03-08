package com.project.vrs.postgres.security.entity;

import com.project.vrs.enums.KycStatus;
import com.project.vrs.enums.Role;
import com.project.vrs.enums.UserStatus;
import com.project.vrs.enums.UserType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode()
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;

    private String lastName;

    private String password;

    private String email;

    private String mobile;

    private boolean isDriver;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Enumerated(EnumType.STRING)
    private KycStatus kycStatus;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime createdAt;

    public String fullName() {
        return this.firstName + " " + this.lastName;
    }
}
