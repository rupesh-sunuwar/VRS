package com.project.vrs.mongo.settings.service;

import com.project.vrs.enums.ConfigurationKey;
import com.project.vrs.resources.request.ConfigurationDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Data
@RequiredArgsConstructor
@Service
public class DisplayMessage {
    private final VrsConfigurationService vrsConfigurationService;

    public String retrieveResponseMessage(ConfigurationKey key, String messageType) {
        ConfigurationDto configResponse = vrsConfigurationService.findByConfigurationKey(key);

        if (configResponse != null && configResponse.getPredefinedMessage() != null) {
            String message = configResponse.getPredefinedMessage().get(messageType).toString();
            return message != null ? message : "Error retrieving error message from configuration";
        } else {
            return "Error retrieving error message from configuration";
        }
    }
}
