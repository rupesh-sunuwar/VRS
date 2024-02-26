package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.minio.config.VRSMinioSetting;
import com.project.vrs.minio.service.MinioService;
import com.project.vrs.resources.request.VehicleAddRequest;
import com.project.vrs.resources.request.VehicleInfoRequest;
import com.project.vrs.resources.response.GenericResponse;
import com.project.vrs.resources.response.VehicleInfoResponse;
import com.project.vrs.resources.response.VehicleResponse;
import com.project.vrs.service.VehicleService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class VehicleController {

    VehicleService vehicleService;
    MinioService minioService;
    VRSMinioSetting vrsMinioSetting;

    @GetMapping(Routes.AVAILABLE_VEHICLES)
    public List<VehicleResponse> getAvailableVehicles() {
        return vehicleService.getAvailableVehicles();
    }

    @PostMapping(Routes.ADD_VEHICLE)
    public GenericResponse addVehicle(@RequestPart(value = "file", required = false) MultipartFile filePart,
                                      @RequestPart VehicleAddRequest vehicle) {
        if (filePart != null && !filePart.isEmpty()) {
            Map<String, String> metaData = new HashMap<>();
            metaData.put("username", vehicle.getUserEmail());
            minioService.uploadFile(filePart, metaData, vrsMinioSetting.getBucket());
        }

        return vehicleService.addVehicles(vehicle);
    }

    @GetMapping(Routes.VEHICLE_QUALITY)
    public VehicleInfoResponse getVehicleQualityInfo(@PathVariable("vehicle_id") Long vehicleId) {
        return vehicleService.vehiclequalityinfo(vehicleId);
    }

    @PostMapping(Routes.ADD_VEHICLE_QUALITY)
    public GenericResponse addVehicleQualityInfo(@Valid @RequestBody VehicleInfoRequest vehicleInfo) {
        return vehicleService.addVehicleQualityInfo(vehicleInfo);
    }

    @GetMapping(Routes.USER_VEHICLES)
    public List<VehicleResponse> findAllByUsers_Email(@PathVariable("email") String userEmail) {
        return vehicleService.findAllByUsers_Email(userEmail);
    }
}
