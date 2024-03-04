package com.project.vrs.postgres.security.services;

import com.project.vrs.exception.UserException;
import com.project.vrs.postgres.security.entity.Users;

public interface UserService {

    Users findUserById(Long userId) throws UserException;

    Users findUserProfileByJwt(String jwt) throws UserException;

    Users findByEmail(String userId) throws UserException;
}
