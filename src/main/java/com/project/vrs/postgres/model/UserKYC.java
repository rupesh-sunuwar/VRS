package com.project.vrs.postgres.model;

import com.project.vrs.postgres.security.entity.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class UserKYC {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String gender;
    private String birthDate;
    private String parentName;
    private String grandParentName;
    private String spouseName;
    private String occupation;
    private String panNo;
    private String landLineNumber;
    private String zoneP;
    private String districtP;
    private String municipalityP;
    private String zoneC;
    private String districtC;
    private String municipalityC;
    private String documentType;
    private String citizenNumber;
    private String issuedAddress;
    private String dateOfIssue;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String citizenFront;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String citizenBack;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;
}
