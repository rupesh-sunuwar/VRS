package com.project.vrs.resources.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserKycRequest {
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
}
