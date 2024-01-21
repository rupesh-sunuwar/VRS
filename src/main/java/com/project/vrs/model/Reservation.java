package com.project.vrs.model;


import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.userdetails.User;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Reservation extends AbstractEntity {

    private String customer;

    private User user;
}
