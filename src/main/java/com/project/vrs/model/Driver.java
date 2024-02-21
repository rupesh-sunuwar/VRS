package com.project.vrs.model;

import com.project.vrs.shared.domain.AbstractEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Driver extends AbstractEntity {

    private String name;

    private String licenseNo;

    private String address;

    private String username;

    private String password;

    @OneToOne
    private Vehicle vehicle;
}
