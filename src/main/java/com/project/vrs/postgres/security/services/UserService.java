package com.project.vrs.postgres.security.services;

import com.project.vrs.annotation.Notification;
import com.project.vrs.exception.UserException;
import com.project.vrs.postgres.model.Reservation;
import com.project.vrs.postgres.model.UserKYC;
import com.project.vrs.postgres.security.entity.Users;
import com.project.vrs.resources.request.UserKycRequest;
import com.project.vrs.resources.response.UserKycResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {

    Users findUserById(Long userId) throws UserException;

    Users findUserProfileByJwt(String jwt) throws UserException;

    Users findByEmail(String userId) throws UserException;

    List<UserKycResponse> findAllUnverifiedUsers();

    Users updateKycStatus(Long userId, String kycStatus) throws UserException;

    UserKYC submitKycForm(Users user, UserKycRequest userKycRequest, MultipartFile citizenFront, MultipartFile citizenBack) throws UserException;

    UserKYC getUserKYC(Long userId) throws UserException;


    Reservation saveReservation(Reservation reservation);
}
