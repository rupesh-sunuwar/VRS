package com.project.vrs.resources.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConfigurationDto implements Serializable {

    private Map<String, String> configuration;

    @JsonProperty("predefined_message")
    private Map<String, String> predefinedMessage;
}
