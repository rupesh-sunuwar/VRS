package com.project.vrs.mongo.settings.service;

import com.project.vrs.enums.ConfigurationKey;
import com.project.vrs.resources.request.ConfigurationDto;

public interface VrsConfigurationService {


    ConfigurationDto findByConfigurationKey(ConfigurationKey configurationKey);
}
