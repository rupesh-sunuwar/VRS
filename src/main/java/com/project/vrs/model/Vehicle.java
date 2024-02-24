package com.project.vrs.model;


import com.project.vrs.enums.VehicleType;
import com.project.vrs.security.entity.Users;
import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.*;
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

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    VehicleInfo vehicleInfo;
}
