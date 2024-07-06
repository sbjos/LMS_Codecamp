package com.codecamp.controllers;

import com.codecamp.entities.User;
import com.codecamp.services.UserDetailServiceImpl;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final Logger log = LogManager.getLogger(AssignmentController.class);

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @PostMapping("/api/user")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            userDetailService.createUser(user);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/api/user/{username}")
    public ResponseEntity<UserDetails> getUser(@PathVariable("username") String username) {
        UserDetails userDetails;
        try {
            userDetails = userDetailService.loadUserByUsername(username);

        } catch (UsernameNotFoundException e) {
            log.warn(e, new UsernameNotFoundException(String.format("user %s not found.", username)));
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
         return new ResponseEntity<>(userDetails, HttpStatus.OK);
    }
}
