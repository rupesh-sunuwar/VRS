package com.project.vrs.postgres.security.config;


import com.project.vrs.constant.JwtConstant;
import com.project.vrs.postgres.security.entity.Users;
import com.project.vrs.postgres.security.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtProvider {

    private final UserRepository userRepository;

    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        Users user = userRepository.findByEmail(auth.getName());
        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 846000000))
                .claim("email", auth.getName()) // Assuming email is the username
                .claim("fullName", user.fullName())
                .claim("role", user.getRole())
                .claim("status", user.getUserStatus())
                .claim("id",user.getId())
                .signWith(key).compact();
    }

    public String getEmailFromToken(String jwt) {
        jwt = jwt.replace("Bearer ", "");
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        return String.valueOf(claims.get("email"));
    }
}
