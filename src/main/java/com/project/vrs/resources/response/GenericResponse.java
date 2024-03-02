package com.project.vrs.resources.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GenericResponse implements Serializable {

    @JsonProperty("status_code")
    private int statusCode;
    private String message;
}
