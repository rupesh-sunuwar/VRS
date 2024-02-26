package com.project.vrs.minio.config;

import lombok.Data;

import java.time.Duration;

@Data
public abstract class AbstractMinioSettings {
    /**
     * URL for Minio instance. Can include the HTTP scheme. Must include the port. If the port is not provided, then the port of the HTTP is taken.
     */
    private String url = "http://localhost:9000";

    /**
     * Access key (login) on Minio instance
     */
    private String accessKey = "esewa";

    /**
     * Secret key (password) on Minio instance
     */
    private String secretKey = "esewa@123#";

    /**
     * If the scheme is not provided in {@code url} property, define if the connection is done via HTTP or HTTPS.
     */
    private boolean secure = false;

    /**
     * Bucket name for the application. The bucket must already exists on Minio.
     */
    private String bucket="vrs-bucket";

    /**
     * Metric configuration prefix which are registered on Actuator.
     */
    private String metricName = "minio.storage";

    /**
     * Define the presigned expiry for the URL.
     */
    private int expiry = 180;

    /**
     * Define the connect timeout for the Minio Client.
     */
    private Duration connectTimeout = Duration.ofSeconds(10);

    /**
     * Define the write timeout for the Minio Client.
     */
    private Duration writeTimeout = Duration.ofSeconds(60);

    /**
     * Define the read timeout for the Minio Client.
     */
    private Duration readTimeout = Duration.ofSeconds(10);

    /**
     * Will create the bucket if it do not exists on the Minio instance.
     */
    private boolean createBucket = true;
}
