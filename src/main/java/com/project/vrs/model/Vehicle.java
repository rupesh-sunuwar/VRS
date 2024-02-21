package com.project.vrs.model;


import com.project.vrs.enums.VehicleType;
import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Vehicle  extends AbstractEntity {

    private String manufacturedBy;

    private String model;

    private String vehicleNo;

    private String manufacturedYear;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

    private boolean isAvailable;
}
