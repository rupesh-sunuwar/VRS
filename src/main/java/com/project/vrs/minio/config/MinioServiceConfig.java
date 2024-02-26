package com.project.vrs.minio.config;

import com.project.vrs.constant.BeanNames;
import com.project.vrs.minio.service.MinioService;
import com.project.vrs.minio.service.MinioServiceImpl;
import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MinioServiceConfig {


    @Bean(name = BeanNames.VRS_MINIO_SERVICE)
    public MinioService getVRSMinioService(
            @Qualifier(BeanNames.VRS_MINIO_CLIENT) MinioClient minioClient,
            VRSMinioSetting vrsMinioSetting) {
        return new MinioServiceImpl(minioClient,
                vrsMinioSetting);
    }
}
