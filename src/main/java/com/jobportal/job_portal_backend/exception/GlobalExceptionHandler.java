package com.jobportal.job_portal_backend.exception;


import com.jobportal.job_portal_backend.exception.InvalidApplicationStatusException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleEmailAlreadyExists(
            EmailAlreadyExistsException exception) {

        return Map.of(
                "message", "Email already exists",
                "status", "409"
        );
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleUserNotFoundException(
            UserNotFoundException exception) {
        return Map.of(
                "message", "User not found",
                "status", "404"
        );

    }

    @ExceptionHandler(InvalidCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleInvalidCredentials(
            InvalidCredentialsException exception) {
        return Map.of(
                "message", "Invalid credentials",
                "status", "401"
        );
    }

    @ExceptionHandler(JobNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleJobNotFound(JobNotFoundException exception){

        return Map.of(
                "message","Job not found",
                "status","404"
        );

    }

    @ExceptionHandler(DuplicateApplicationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String,String> handleDuplicateApplication(DuplicateApplicationException exception){
        return Map.of(
                "message","Already applied for this job",
                "status","409"
        );
    }
    @ExceptionHandler(ApplicationNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String> handleApplicationNotFound(ApplicationNotFoundException exception){
        return Map.of(
                "message","Application not found",
                "status","404"
        );
    }


    @ExceptionHandler(InvalidApplicationStatusException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String,String> handleInvalidApplicationStatus(InvalidApplicationStatusException exception){
        return Map.of(
                "message", exception.getMessage(),
                "status","400"
        );
    }



    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleDataIntegrityViolation(
            DataIntegrityViolationException exception) {

        return Map.of(
                "message", "Application already exists for this job and applicant",
                "status", "409"
        );
    }



    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleMethodArgumentTypeMismatch(
            MethodArgumentTypeMismatchException exception) {

        return Map.of(
                "message", "Invalid value for parameter: " + exception.getName(),
                "status", "400"
        );
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationException(
            MethodArgumentNotValidException exception) {

        String message = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(FieldError::getDefaultMessage)
                .orElse("Validation failed");

        return Map.of(
                "message", message,
                "status", "400"
        );
    }
}