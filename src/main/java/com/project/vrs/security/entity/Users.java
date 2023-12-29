package com.project.vrs.security.entity;

import com.project.vrs.enums.UserStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;

    private String lastName;

    private String password;

    private String email;

    private String mobile;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    private String role;

    private LocalDateTime createdAt;
}
