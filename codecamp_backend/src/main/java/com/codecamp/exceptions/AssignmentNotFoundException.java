package com.codecamp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class AssignmentNotFoundException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 6887637219907779137L;

    public AssignmentNotFoundException() {}

    public AssignmentNotFoundException(String message) {
        super(message);
    }

    public AssignmentNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public AssignmentNotFoundException(Throwable cause) {
        super(cause);
    }

    public AssignmentNotFoundException(String message, Throwable cause,
                                       boolean enableSuppression,
                                       boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
