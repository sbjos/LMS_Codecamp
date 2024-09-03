package com.codecamp.utils;

import com.codecamp.exceptions.AssignmentNotFoundException;
import com.codecamp.exceptions.EmailAlreadyExistException;
import com.codecamp.exceptions.UserNotFoundException;
import com.codecamp.exceptions.UsernameAlreadyExistException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameAlreadyExistException.class)
    public ErrorResponse handleUsernameAlreadyExist(UsernameAlreadyExistException e) {
        ErrorResponse err = ErrorResponse.create(e, HttpStatusCode.valueOf(409), e.getMessage());
        return err;
    }

    @ExceptionHandler(EmailAlreadyExistException.class)
    public ErrorResponse handleEmailAlreadyExist(EmailAlreadyExistException e) {
        return ErrorResponse.create(e, HttpStatusCode.valueOf(409), e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResponse handleIllegalArgumentException(IllegalArgumentException e) {
        return ErrorResponse.create(e, HttpStatusCode.valueOf(403), e.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ErrorResponse handleUserNotFoundException(UserNotFoundException e) {
        return ErrorResponse.create(e, HttpStatusCode.valueOf(404), e.getMessage());
    }

    @ExceptionHandler(AssignmentNotFoundException.class)
    public ErrorResponse handleAssignmentNotFoundException(AssignmentNotFoundException e) {
        return ErrorResponse.create(e, HttpStatusCode.valueOf(404), e.getMessage());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ErrorResponse handleDataIntegrityViolation(DataIntegrityViolationException e) {
        return ErrorResponse.create(e, HttpStatusCode.valueOf(400), e.getMessage());
    }
}

