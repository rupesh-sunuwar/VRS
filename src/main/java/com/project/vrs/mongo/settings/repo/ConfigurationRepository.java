package com.project.vrs.mongo.settings.repo;

import com.project.vrs.mongo.settings.model.VrsConfiguration;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.project.vrs.enums.ConfigurationKey;

public interface ConfigurationRepository extends MongoRepository<VrsConfiguration, Long> {

    VrsConfiguration findByKey(ConfigurationKey configurationKey);
}
