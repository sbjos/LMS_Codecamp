package com.codecamp.controllers;

import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.User;
import com.codecamp.services.AdminUserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.bytecode.enhance.internal.tracker.SortedFieldTracker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminUserController {

    private final Logger log = LogManager.getLogger(AssignmentController.class);

    @Autowired
    private AdminUserService adminUserService;

    @GetMapping("/api/admin/user")
    public ResponseEntity<UserResponseDto> getAllUsers(@RequestParam(defaultValue = "ID") SortedFieldTracker field,
                                                       @RequestParam(defaultValue = "DESC") Sort.Direction direction,
                                                       @PathVariable String username) {
        return new ResponseEntity<>(adminUserService.getUserByUsername(username), HttpStatus.OK);
    }


    @GetMapping("/api/admin/user/{username}")
    public ResponseEntity<UserResponseDto> getUserByUsername(@PathVariable String username) {
        return new ResponseEntity<>(adminUserService.getUserByUsername(username), HttpStatus.OK);
    }

    @PutMapping("/api/admin/user/{username}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable String username, @RequestBody User update) {
        UserResponseDto updatedUser;

        try {
            updatedUser = adminUserService.updateUser(username, update);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @PutMapping("/api/admin/user/{username}")
    public ResponseEntity<UserResponseDto> updateUserSettings(@PathVariable String username, @RequestBody User update) {
        UserResponseDto updatedUser;

        try {
            updatedUser = adminUserService.updateUserSettings(username, update);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}
