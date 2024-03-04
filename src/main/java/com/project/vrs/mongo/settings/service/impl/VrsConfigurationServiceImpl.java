package com.project.vrs.mongo.settings.service.impl;

import com.project.vrs.enums.ConfigurationKey;
import com.project.vrs.mongo.settings.model.VrsConfiguration;
import com.project.vrs.mongo.settings.repo.ConfigurationRepository;
import com.project.vrs.mongo.settings.service.VrsConfigurationService;
import com.project.vrs.resources.request.ConfigurationDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class VrsConfigurationServiceImpl implements VrsConfigurationService {

    private final ConfigurationRepository configurationRepository;

    @Override
    public ConfigurationDto findByConfigurationKey(ConfigurationKey configurationKey) {
        return apply(configurationRepository.findByKey(configurationKey));
    }

    public ConfigurationDto apply(VrsConfiguration vrsConfiguration) {
        return new ConfigurationDto(vrsConfiguration.getConfiguration(),
                vrsConfiguration.getPredefinedMessage());
    }


}
