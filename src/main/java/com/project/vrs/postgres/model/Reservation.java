package com.project.vrs.postgres.model;


import com.project.vrs.enums.ReservationStatus;
import com.project.vrs.postgres.security.entity.Users;
import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Reservation extends AbstractEntity {

    private String customer;

    private String bookingNo;

    @ManyToOne
    private Vehicle vehicle;

    private String destination;

    private String fromLocation;

    private LocalDateTime fromDate;

    private LocalDateTime toDate;

    private int noOfPassengers;

    @Enumerated(EnumType.STRING)
    private ReservationStatus reservationStatus;

    @ManyToOne
    private Users user;

    @OneToOne
    private Payment payment;

    private Double amount;
}
