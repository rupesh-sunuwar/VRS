package com.project.vrs.controller;

import com.project.vrs.constant.Routes;
import com.project.vrs.exception.UserException;
import com.project.vrs.postgres.model.UserKYC;
import com.project.vrs.postgres.security.entity.Users;
import com.project.vrs.postgres.security.services.UserService;
import com.project.vrs.resources.request.UserKycRequest;
import com.project.vrs.resources.response.UserKycResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping(Routes.PROFILE)
    public ResponseEntity<Users> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws UserException {

        Users user = userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @PostMapping(Routes.KYC_STATUS)
    public Users updateKycStatus(@PathVariable("userId") Long userId,
                                    @PathVariable("kycStatus") String kycStatus) throws UserException {

        return userService.updateKycStatus(userId, kycStatus);
    }

    @GetMapping(Routes.UNVERIFIED_USER)
    public ResponseEntity<List<UserKycResponse>> getAllUnverifiedUsersHandler() {

        List<UserKycResponse> user = userService.findAllUnverifiedUsers();
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }


    @PostMapping(value = Routes.SUBMIT_KYC, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public UserKYC submitKycForm(
            @RequestHeader("Authorization") String jwt,
            @RequestPart("userKycRequest") UserKycRequest userKycRequest,
            @RequestPart("citizenFront") MultipartFile citizenFront,
            @RequestPart("citizenBack") MultipartFile citizenBack) throws UserException {

        Users user = userService.findUserProfileByJwt(jwt);
        return userService.submitKycForm(user, userKycRequest, citizenFront, citizenBack);
    }

    @GetMapping(Routes.KYC_HANDLER)
    public UserKYC getUserKycHandler(@PathVariable Long userId) throws UserException {
        return userService.getUserKYC(userId);
    }
}
