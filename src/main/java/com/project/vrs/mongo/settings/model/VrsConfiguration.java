package com.project.vrs.mongo.settings.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.vrs.enums.ConfigurationKey;
import com.project.vrs.enums.ConfigurationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("vrs_notification_config")
public class VrsConfiguration {

    @Id
    private Long id;

    private ConfigurationKey key;

    @JsonProperty("configuration")
    private Map<String, String> configuration;

    @JsonProperty("configuration_status")
    private ConfigurationStatus configurationStatus;

    @JsonProperty("predefined_message")
    private Map<String, String> predefinedMessage;
}
