package com.project.vrs.resources.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse implements Serializable {

    private String token;

    private String message;
}
