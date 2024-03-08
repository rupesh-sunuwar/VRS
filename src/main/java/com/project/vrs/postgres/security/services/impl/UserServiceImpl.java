package com.project.vrs.postgres.security.services.impl;

import com.project.vrs.enums.KycStatus;
import com.project.vrs.exception.UserException;
import com.project.vrs.postgres.model.UserKYC;
import com.project.vrs.postgres.repository.UserKYCRepository;
import com.project.vrs.postgres.security.config.JwtProvider;
import com.project.vrs.postgres.security.entity.Users;
import com.project.vrs.postgres.security.repository.UserRepository;
import com.project.vrs.postgres.security.services.UserService;
import com.project.vrs.resources.request.UserKycRequest;
import com.project.vrs.resources.response.UserKycResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class  UserServiceImpl implements UserService {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final UserKYCRepository userKycRepository;

    @Override
    public Users findUserById(Long userId) throws UserException {
        Optional<Users> user = userRepository.findById(userId);

        if (user.isPresent()) {
            return user.get();
        }

        throw new UserException("User not found with id - " + userId);
    }

    @Override
    public Users findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);

        Users user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UserException("User not found with email - " + email);
        }

        return user;
    }

    @Override
    public Users findByEmail(String userId) throws UserException {
        return userRepository.findByEmail(userId);
    }

    @Override
    public List<UserKycResponse> findAllUnverifiedUsers() {
        return userRepository.findByKycStatus()
                .stream().map(this::apply).collect(Collectors.toList());
    }

    private UserKycResponse apply(Users user) {
        UserKycResponse userKycResponse = new UserKycResponse();
        userKycResponse.setId(user.getId());
        userKycResponse.setUsername(user.getFirstName() + " " + user.getLastName());
        userKycResponse.setEmail(user.getEmail());
        userKycResponse.setKycStatus(user.getKycStatus());
        return userKycResponse;
    }

    @Override
    public Users updateKycStatus(Long userId, String kycStatus) throws UserException {
        Users user = findUserById(userId);

        if (user == null) {
            throw new UserException("User not found with id - " + userId);
        }
        user.setKycStatus(KycStatus.valueOf(kycStatus));
        return userRepository.save(user);
    }

    @Override
    public UserKYC submitKycForm(Users user, UserKycRequest userKycRequest, MultipartFile citizenFront, MultipartFile citizenBack) throws UserException {

    UserKYC userKYC = converter(userKycRequest, user.getId());

    String frontCitizenImageName = StringUtils.cleanPath(Objects.requireNonNull(citizenFront.getOriginalFilename()));
    String backCitizenImageName = StringUtils.cleanPath(Objects.requireNonNull(citizenBack.getOriginalFilename()));

        if (frontCitizenImageName.contains("..") || backCitizenImageName.contains("..")) {
        log.error("Invalid file name");
        throw new UserException("Invalid file name");
    }

        try {
        userKYC.setCitizenFront(Base64.getEncoder().encodeToString(citizenFront.getBytes()));
        userKYC.setCitizenBack(Base64.getEncoder().encodeToString(citizenBack.getBytes()));
    } catch (IOException e) {
        log.error("Error while converting image to base64");
        throw new UserException(e.getMessage());
    }
        return userKycRepository.save(userKYC);
}

    @Override
    public UserKYC getUserKYC(Long userId) throws UserException {
        return userKycRepository.findById(userId)
                .orElseThrow(() -> new UserException("User KYC not found"));
    }

    private UserKYC converter(UserKycRequest userKycRequest, Long userId) throws UserException {
        UserKYC userKYC = userKycRepository.findById(userId)
                .orElseThrow(() -> new UserException("User KYC not found"));

        userKYC.setName(userKycRequest.getName());
        userKYC.setGender(userKycRequest.getGender());
        userKYC.setBirthDate(cleanDate(userKycRequest.getBirthDate()));
        userKYC.setParentName(userKycRequest.getParentName());
        userKYC.setGrandParentName(userKycRequest.getGrandParentName());
        userKYC.setSpouseName(userKycRequest.getSpouseName());
        userKYC.setOccupation(userKycRequest.getOccupation());
        userKYC.setPanNo(userKycRequest.getPanNo());
        userKYC.setLandLineNumber(userKycRequest.getLandLineNumber());
        userKYC.setZoneP(userKycRequest.getZoneP());
        userKYC.setDistrictP(userKycRequest.getDistrictP());
        userKYC.setMunicipalityP(userKycRequest.getMunicipalityP());
        userKYC.setZoneC(userKycRequest.getZoneC());
        userKYC.setDistrictC(userKycRequest.getDistrictC());
        userKYC.setMunicipalityC(userKycRequest.getMunicipalityC());
        userKYC.setDocumentType(userKycRequest.getDocumentType());
        userKYC.setCitizenNumber(userKycRequest.getCitizenNumber());
        userKYC.setIssuedAddress(userKycRequest.getIssuedAddress());
        userKYC.setDateOfIssue(cleanDate(userKycRequest.getDateOfIssue()));

        return userKYC;
    }

    private static String cleanDate(String garbageDate) {
        SimpleDateFormat inputDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        SimpleDateFormat outputDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            Date date = inputDateFormat.parse(garbageDate);
            return outputDateFormat.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }
}

