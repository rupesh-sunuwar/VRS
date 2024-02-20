package com.project.vrs.exception;

import com.project.vrs.resources.ErrorMessage;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorMessage>
    userException(UserException ex) {
        ErrorMessage message = new ErrorMessage(
                0,
                ex.getMessage()
        );
        return new ResponseEntity<>(message, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage>
    handleSecurityException(Exception ex) {

        ErrorMessage message = new ErrorMessage(
                0,
                ex.getMessage()
        );
        if(ex instanceof BadCredentialsException){
            message.setStatusCode(0);
            message.setMessage("Bad Credentials");

        }
        if(ex instanceof AccessDeniedException){
            message.setStatusCode(0);
            message.setMessage("AccessDenied Exception");
        }
        if(ex instanceof SignatureException){
            message.setStatusCode(0);
            message.setMessage("Signature Exception");
        }
        if(ex instanceof ExpiredJwtException){
            message.setStatusCode(0);
            message.setMessage("Expired Jwt Token");
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }
}
