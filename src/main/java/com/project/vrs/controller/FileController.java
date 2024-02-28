package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.exception.VehicleException;
import com.project.vrs.minio.config.VRSMinioSetting;
import com.project.vrs.minio.service.MinioService;
import com.project.vrs.model.Vehicle;
import com.project.vrs.repository.VehicleRepo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;

import static com.project.vrs.minio.service.MinioServiceImpl.extractWordAfterSlash;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class FileController {

    MinioService minioService;
    VRSMinioSetting vrsMinioSetting;
    VehicleRepo vehicleRepo;

    @GetMapping(Routes.GET_IMAGE)
    public ResponseEntity<InputStreamResource> viewTempFile(@PathVariable("vehicle_id") final String vehicleId) {

        Vehicle vehicle = vehicleRepo.findVehicleByVehicleNo(vehicleId)
                .orElseThrow(() -> new VehicleException("Vehicle Doesnt Exist"));
        InputStream file = minioService.getInputStream(vrsMinioSetting.getBucket(),vehicle.getVehiclePhotoName() );
        if (file != null) {
            try {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.valueOf(vehicle.getContentType()));
                return ResponseEntity.ok().headers(headers).body(new InputStreamResource(file));
            } catch (Exception e) {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
