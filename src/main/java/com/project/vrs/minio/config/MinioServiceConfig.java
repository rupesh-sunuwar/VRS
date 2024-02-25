package com.project.vrs.minio.config;

import com.project.vrs.constant.BeanNames;
import com.project.vrs.minio.service.MinioService;
import com.project.vrs.minio.service.MinioServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioServiceConfig {

    @Bean(name = BeanNames.CMS_MINIO_SERVICE)
    public MinioService getCMSMinioService() {
        return new MinioServiceImpl();
    }
}
