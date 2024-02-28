package com.project.vrs.minio.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface MinioService {

    String  uploadFile(MultipartFile multipartFile, Map<String, String> userMetadata, String bucket);

    InputStream getInputStream(String bucketName,String objectName);

    List<String> listBuckets();

    void migrateObject(String bucketName, String tempBucket, String objectName);

    void putObjectFromInputStream(InputStream inputStream, Map<String, String> userMetadata, String fileName, String bucketName, String fileContentType);
}
