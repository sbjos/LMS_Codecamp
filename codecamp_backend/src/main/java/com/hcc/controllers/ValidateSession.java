package com.hcc.controllers;

import com.hcc.entities.User;
import com.hcc.services.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ValidateSession {

    @Autowired
    private UserDetailServiceImpl userDetailService;

    /**
     * Mapping for token validation to prevent a user to access a page without proper authentication.
     * @param user
     * @return HTTPStatus response with UserDetails.
     */
    @GetMapping(value = "/api/auth/validate")
    public ResponseEntity<?> validate(@AuthenticationPrincipal User user) {
        UserDetails userDetails = userDetailService.loadUserByUsername(user.getUsername());
        return new ResponseEntity<>(userDetails, HttpStatus.OK);
    }
}
