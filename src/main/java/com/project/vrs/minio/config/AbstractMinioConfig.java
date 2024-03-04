package com.project.vrs.minio.config;

import io.minio.MinioClient;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AbstractMinioConfig {

    protected MinioClient buildMinioClient(AbstractMinioSettings abstractMinioSettings) {

        log.info("Minio VrsConfiguration: {}", abstractMinioSettings.toString());

        MinioClient minioClient = MinioClient
                .builder()
                .credentials(abstractMinioSettings.getAccessKey(), abstractMinioSettings.getSecretKey())
                .endpoint(abstractMinioSettings.getUrl()).build();
        minioClient.setTimeout(
                abstractMinioSettings.getConnectTimeout().toMillis(),
                abstractMinioSettings.getWriteTimeout().toMillis(),
                abstractMinioSettings.getReadTimeout().toMillis()
        );
        return minioClient;
    }
}
