package com.project.vrs.resources.response;

import com.project.vrs.enums.KycStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserKycResponse {
    private Long id;
    private String username;
    private String email;
    private KycStatus kycStatus;
}
