package com.project.vrs.settings;

import com.project.vrs.constant.DefaultUserConstant;
import com.project.vrs.enums.Role;
import com.project.vrs.enums.UserStatus;
import com.project.vrs.security.entity.Users;
import com.project.vrs.security.repository.UserRepository;
import com.project.vrs.settings.repo.ConfigurationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    private final ConfigurationRepository configurationRepo;
    private final PasswordEncoder encoder;
    @Qualifier("defaultUserConstant")
    private final DefaultUserConstant userConstant;

    @Override
    public void run(String... args) {
        log.info("Loading data...");

        loadUserData();
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

    private void loadConfigurations(){

    }
}



