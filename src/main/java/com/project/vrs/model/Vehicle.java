package com.project.vrs.model;


import com.project.vrs.enums.VehicleType;
import com.project.vrs.security.entity.Users;
import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Vehicle extends AbstractEntity {

    private String manufacturedBy;

    private String vehicleNo;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

    private Boolean isAvailable;

    @ManyToOne
    private Users users;
}
