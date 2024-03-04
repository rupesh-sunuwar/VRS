package com.project.vrs.mongo.settings;

import com.project.vrs.constant.DefaultUserConstant;
import com.project.vrs.enums.ConfigurationKey;
import com.project.vrs.enums.ConfigurationStatus;
import com.project.vrs.enums.Role;
import com.project.vrs.enums.UserStatus;
import com.project.vrs.mongo.settings.model.VrsConfiguration;
import com.project.vrs.mongo.settings.repo.ConfigurationRepository;
import com.project.vrs.postgres.security.entity.Users;
import com.project.vrs.postgres.security.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;


@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    private final ConfigurationRepository configurationRepo;
    private final PasswordEncoder encoder;
    @Qualifier("defaultUserConstant")
    private final DefaultUserConstant userConstant;

    public static Long generateUniqueId() {
        UUID uuid = UUID.randomUUID();
        long mostSignificantBits = uuid.getMostSignificantBits();
        long leastSignificantBits = uuid.getLeastSignificantBits();
        return Math.abs(mostSignificantBits + leastSignificantBits);
    }

    @Override
    public void run(String... args) {
        log.info("Loading data...");

        loadUserData();
        loadConfigurations();
    }

    private void loadConfigurations() {

        List<VrsConfiguration> existingKeys = configurationRepo.findAll();

        for (ConfigurationKey key : ConfigurationKey.values()) {
            boolean uniqueIdFound = false;
            Long generatedId = null;

            while (!uniqueIdFound) {
                generatedId = generateUniqueId();
                Long finalGeneratedId = generatedId;
                boolean idExists = existingKeys.stream().anyMatch(config -> config.getId().equals(finalGeneratedId));
                if (!idExists) {
                    uniqueIdFound = true;
                }
            }

            VrsConfiguration cmsConfig = new VrsConfiguration();
            cmsConfig.setId(generatedId);
            cmsConfig.setKey(key);
            cmsConfig.setConfigurationStatus(ConfigurationStatus.ACTIVE);
            cmsConfig.setConfiguration(key.getValue());
            cmsConfig.setPredefinedMessage(key.getValue());
            configurationRepo.save(cmsConfig);
        }

        log.info("configuration added successfully");

    }

    private void loadUserData() {
        if (userRepository.findByEmail(userConstant.getEmail()) == null) {
            createDefaultUser();
        }
    }

    private void createDefaultUser() {
        log.info("Default user created successfully.");
        Users user = new Users();
        user.setFirstName(userConstant.getFirstName());
        user.setLastName(userConstant.getLastName());
        user.setPassword(encoder.encode(userConstant.getPassword()));
        user.setEmail(userConstant.getEmail());
        user.setMobile(userConstant.getMobileNumber());
        user.setUserStatus(UserStatus.ACTIVE);
        user.setRole(Role.ADMIN);
        userRepository.save(user);
    }
}



