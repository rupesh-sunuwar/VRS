package com.project.vrs.security.controller;

import com.project.vrs.enums.Role;
import com.project.vrs.enums.UserStatus;
import com.project.vrs.exception.UserException;
import com.project.vrs.resources.request.LoginRequest;
import com.project.vrs.resources.request.UserDto;
import com.project.vrs.resources.response.AuthResponse;
import com.project.vrs.security.config.JwtProvider;
import com.project.vrs.security.entity.Users;
import com.project.vrs.security.repository.UserRepository;
import com.project.vrs.security.services.CustomUserServiceImpl;
import com.project.vrs.security.services.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomUserServiceImpl customUserService;
    private final UserServiceImpl userService;

    @PostMapping("api/sign_in")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {

        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse(token, "Sign-in success");

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("api/register")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody UserDto user) throws UserException {

        String email = user.getEmail();
        String password = user.getPassword();
        String firstName = user.getFirstName();
        String lastName = user.getLastName();

        Users isEmailExist = userRepository.findByEmail(email);
        if (isEmailExist != null) {
            throw new UserException("Email is already used with another account");
        }

        Users createdUser = new Users();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setUserStatus(UserStatus.ACTIVE);
        createdUser.setFirstName(firstName);
        createdUser.setLastName(lastName);
        if (user.isDriver()) {
            createdUser.setRole(Role.DRIVER);
        } else {
            createdUser.setRole(Role.CUSTOMER);
        }

        Users savedUser = userRepository.save(createdUser);


        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token, "Sign-up success");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("auth/logout/{email}")
    public ResponseEntity<AuthResponse> logoutUserHandler(@PathVariable String email) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getName().equals(email)) {
            SecurityContextHolder.clearContext();
            AuthResponse authResponse = new AuthResponse(null, "Logged out successfully for user ID:" + email);
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        } else {
            AuthResponse authResponse = new AuthResponse(null, "Not User Found With email" + email);
            return new ResponseEntity<>(authResponse, HttpStatus.OK);
        }
    }

    @GetMapping("auth/user/{userId}")
    public ResponseEntity<UserDto> findUserByEmail(@PathVariable String userId) {


        return ResponseEntity.ok(mapToUserDto(userService.findByEmail(userId)));
    }

    UserDto mapToUserDto(Users users) {
        UserDto userDto = new UserDto();
        userDto.setFullName(users.fullName());
        userDto.setEmail(users.getEmail());
        userDto.setRole(String.valueOf(users.getRole()));
        userDto.setStatus(String.valueOf(users.getUserStatus()));
        return userDto;
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username...");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password...");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
