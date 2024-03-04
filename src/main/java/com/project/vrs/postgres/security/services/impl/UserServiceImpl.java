package com.project.vrs.postgres.security.services.impl;

import com.project.vrs.exception.UserException;
import com.project.vrs.postgres.security.config.JwtProvider;
import com.project.vrs.postgres.security.entity.Users;
import com.project.vrs.postgres.security.services.UserService;
import com.project.vrs.postgres.security.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class  UserServiceImpl implements UserService {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

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
}