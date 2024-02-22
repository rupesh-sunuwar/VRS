package com.project.vrs.model;


import com.project.vrs.security.entity.Users;
import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Reservation extends AbstractEntity {

    private String customer;

    @OneToOne
    private Vehicle vehicle;

    private String destination;

    private String fromLocation;

    private int noOfPassengers;

    @ManyToOne
    private Users user;

    @OneToOne
    private Payment payment;
}
