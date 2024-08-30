package com.codecamp.utils;

import com.codecamp.exceptions.EmailAlreadyExistException;
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

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ErrorResponse handleDataIntegrityViolation(DataIntegrityViolationException e) {
        return ErrorResponse.create(e, HttpStatusCode.valueOf(409), e.getMessage());
    }
}

