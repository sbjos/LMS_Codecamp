package com.codecamp.controllers;

import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.User;
import com.codecamp.services.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final Logger log = LogManager.getLogger(AssignmentController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/api/user")
    public ResponseEntity<UserResponseDto> getUserById(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(userService.getUserById(user.getId()), HttpStatus.OK);
    }

    @PutMapping("/api/user")
    public ResponseEntity<UserResponseDto> updateUser(@RequestBody User update,
                                                      @AuthenticationPrincipal User user) {
        UserResponseDto updatedUser;

        try {
            updatedUser = userService.updateUser(user.getId(),update);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PostMapping("/api/user")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        try {
            userService.createUser(newUser);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
