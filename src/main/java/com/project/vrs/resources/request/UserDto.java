package com.project.vrs.resources.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.vrs.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto implements Serializable {

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    private String password;

    private String email;

    private String mobile;

    @JsonProperty("is_driver")
    private boolean isDriver;

    private Role role;
}
