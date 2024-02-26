package com.project.vrs.minio.config;


import com.project.vrs.constant.BeanNames;
import io.minio.MinioClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;


@Configuration
@Slf4j
public class MinioConfig extends AbstractMinioConfig {

    @Bean(BeanNames.VRS_MINIO_CLIENT)
    @Primary
    public MinioClient getCMSMinioClient(VRSMinioSetting minioSetting) {
        return buildMinioClient(minioSetting);
    }
}
