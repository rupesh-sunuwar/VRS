package com.project.vrs;

import com.project.vrs.constant.DefaultUserConstant;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(DefaultUserConstant.class)
public class VrsApplication {

    public static void main(String[] args) {
        SpringApplication.run(VrsApplication.class, args);
    }

}
