package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.minio.config.VRSMinioSetting;
import com.project.vrs.minio.service.MinioService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class FileController {

    MinioService minioService;
    VRSMinioSetting vrsMinioSetting;

    @GetMapping(Routes.GET_IMAGE)
    public ResponseEntity<InputStreamResource> viewTempFile(@PathVariable("object_name") final String objectName) {
        InputStream file = minioService.getInputStream(vrsMinioSetting.getBucket(), objectName);
        if (file != null) {
            try {
                HttpHeaders headers = new HttpHeaders();
                return ResponseEntity.ok().headers(headers).body(new InputStreamResource(file));
            } catch (Exception e) {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
