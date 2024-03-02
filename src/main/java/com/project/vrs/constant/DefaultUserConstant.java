package com.project.vrs.constant;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
@ConfigurationProperties("spring.default-user")
@Data
@Primary
@NoArgsConstructor
public class DefaultUserConstant {
    private String firstName="super";

    private String middleName="";

    private String lastName="admin";

    private String password="superadmin";

    private String email="superadmin@gmail.com";

    private String mobileNumber="9843275165";
}

