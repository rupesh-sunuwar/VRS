package com.project.vrs.security.services;

import com.project.vrs.exception.UserException;
import com.project.vrs.security.entity.Users;

public interface UserService {

    Users findUserById(Long userId) throws UserException;

    Users findUserProfileByJwt(String jwt) throws UserException;
}
