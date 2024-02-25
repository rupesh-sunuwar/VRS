package com.project.vrs.minio.config;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@EqualsAndHashCode(callSuper = true)
@Component("cmsMinioSettings")
@ConfigurationProperties("esewa.minio")
@Data
public class VRSMinioSetting extends AbstractMinioSettings {

    /**
     * The maximum size of the picture
     */

    private long imageSize = 20971520;

    /**
     * Maximum size of other files
     */

    private long fileSize = 20971520;

    // Temporary bucket name for the application. The bucket must already be present on Minio.
    private String tempBucket = "tempbucket";
}
