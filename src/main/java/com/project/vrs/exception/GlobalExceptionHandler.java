package com.project.vrs.exception;

import com.project.vrs.resources.ErrorMessage;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;

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

    @ExceptionHandler(PaymentException.class)
    public ResponseEntity<ErrorMessage>
    paymentException(PaymentException ex) {
        ErrorMessage message = new ErrorMessage(
                0,
                ex.getMessage()
        );
        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage>
    handleSecurityException(Exception ex) {

        ErrorMessage message = new ErrorMessage(
                0,
                ex.getMessage()
        );
        if (ex instanceof BadCredentialsException) {
            message.setStatusCode(0);
            message.setMessage("Bad Credentials");

        }
        if (ex instanceof AccessDeniedException) {
            message.setStatusCode(0);
            message.setMessage("AccessDenied Exception");
        }
        if (ex instanceof SignatureException) {
            message.setStatusCode(0);
            message.setMessage("Signature Exception");
        }
        if (ex instanceof ExpiredJwtException) {
            message.setStatusCode(0);
            message.setMessage("Expired Jwt Token");
        }
        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> handleValidationExceptions(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        Map<String, String> errors = new HashMap<>();
        result.getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        String firstErrorMessage = errors.isEmpty() ? "" : errors.entrySet().iterator().next().getValue();
        ErrorMessage errorMessage = new ErrorMessage(0, firstErrorMessage);
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
}
