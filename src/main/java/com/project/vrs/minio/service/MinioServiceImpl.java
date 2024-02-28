package com.project.vrs.minio.service;

import com.project.vrs.exception.FtpException;
import com.project.vrs.minio.config.VRSMinioSetting;
import io.minio.*;
import io.minio.messages.Bucket;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class MinioServiceImpl implements MinioService {

    MinioClient minioClient;
    VRSMinioSetting vrsMinioSetting;

    @Override
    public String uploadFile(MultipartFile multipartFile, Map<String, String> userMetadata, String bucket) {
        log.info("Uploading file : {} to minIO", multipartFile.getOriginalFilename());

        String contentType = extractWordBeforeSlash(Objects.requireNonNull(multipartFile.getContentType()));
        String photoName = userMetadata.get("vehicleNo") + "." + extractWordAfterSlash(multipartFile.getContentType());

        if (!contentType.equals("image")) {
            throw new FtpException("Content Type Not valid.");
        }

        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(photoName)
                            .stream(multipartFile.getInputStream(), -1, vrsMinioSetting.getFileSize())
                            .contentType(String.valueOf(multipartFile.getContentType()))
                            .userMetadata(userMetadata)
                            .build()
            );
            return photoName;
        } catch (Exception ex) {
            log.error("Error while uploading file : {}, error: {}", multipartFile.getOriginalFilename(), ex.getMessage());
            throw new FtpException("Error while uploading file");
        }
    }

    @Override
    public InputStream getInputStream(String bucketName, String objectName) {
        try {
            return minioClient.getObject(
                    GetObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .build());
        } catch (Exception ex) {
            log.error("Error while fetching file details from minio, error: {}", ex.getMessage());
            throw new FtpException("Error while fetching file details from minio");
        }
    }

    @Override
    public List<String> listBuckets() {
        List<String> buckets = new ArrayList<>();
        try {
            for (Bucket bucket : minioClient.listBuckets()) {
                buckets.add(bucket.name());
            }
        } catch (Exception ex) {
            log.error("Error while listing buckets: {}", ex.getMessage());
        }
        return buckets;
    }

    @Override
    public void migrateObject(String bucketName, String tempBucket, String objectName) {
        log.info("Migrating file : {}", objectName);
        try {
            minioClient.copyObject(
                    CopyObjectArgs.builder()
                            .bucket(bucketName)
                            .object(objectName)
                            .source(
                                    CopySource.builder()
                                            .bucket(tempBucket)
                                            .object(objectName)
                                            .build())
                            .build());
        } catch (Exception ex) {
            log.error("Error while migrating , error: {}", ex.getMessage());
            throw new FtpException("Error while migrating");
        }
    }

    @Override
    public void putObjectFromInputStream(InputStream inputStream, Map<String, String> userMetadata, String fileName, String bucketName, String fileContentType) {
        try {
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucketName)
                            .object(fileName)
                            .stream(inputStream, -1, vrsMinioSetting.getImageSize())
                            .userMetadata(userMetadata)
                            .contentType(fileContentType)
                            .build()
            );
        } catch (Exception ex) {
            log.error("Error while uploading image from input stream, error: {}", ex.getMessage());
            throw new FtpException("Error while uploading image from input stream");
        }
    }

    public static String extractWordBeforeSlash(String input) {
        int slashIndex = input.indexOf('/');
        if (slashIndex != -1) { // Check if slash exists in the string
            return input.substring(0, slashIndex);
        }
        return input; // Return the whole string if no slash found
    }

    public static String extractWordAfterSlash(String input) {
        int slashIndex = input.indexOf('/');
        if (slashIndex != -1 && slashIndex + 1 < input.length()) { // Check if slash exists and if there's a character after it
            return input.substring(slashIndex + 1);
        }
        return ""; // Return an empty string if no slash found or if it's the last character
    }

    public static String extractWordAfterDot(String input) {
        int slashIndex = input.indexOf('.');
        if (slashIndex != -1 && slashIndex + 1 < input.length()) { // Check if slash exists and if there's a character after it
            return input.substring(slashIndex + 1);
        }
        return ""; // Return an empty string if no slash found or if it's the last character
    }
}
