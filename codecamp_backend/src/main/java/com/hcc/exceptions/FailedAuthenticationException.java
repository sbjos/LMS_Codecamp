package com.hcc.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class FailedAuthenticationException extends RuntimeException{

    private static final long serialVersionUID = -3097463659015330603L;

    public FailedAuthenticationException() {}

    public FailedAuthenticationException(String message) {
        super(message);
    }

    public FailedAuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }

    public FailedAuthenticationException(Throwable cause) {
        super(cause);
    }

    public FailedAuthenticationException(String message, Throwable cause,
                                       boolean enableSuppression,
                                       boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
