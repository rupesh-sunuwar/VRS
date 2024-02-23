package com.project.vrs.model;

import com.project.vrs.enums.TyreCondition;
import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleInfo extends AbstractEntity implements Serializable {


    @NotNull
    private Long idVehicle;
    private boolean isMaintenanceRequired;
    private boolean isClean;
    private int vehicleUsageTimeInMonths;

    @Enumerated(value = EnumType.STRING)
    private TyreCondition tireCondition;

    @OneToOne
    private Vehicle vehicle;
}
