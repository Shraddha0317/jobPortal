package com.jobportal.job_portal_backend.exception;

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String user_with_email_already_exists) {
    }
}
