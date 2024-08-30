package com.codecamp.controllers;

import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.User;
import com.codecamp.exceptions.EmailAlreadyExistException;
import com.codecamp.exceptions.UserNotFoundException;
import com.codecamp.exceptions.UsernameAlreadyExistException;
import com.codecamp.services.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
public class UserController {
    private final Logger log = LogManager.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/api/user")
    public ResponseEntity<UserResponseDto> getUser(@AuthenticationPrincipal User user) {
        UserResponseDto userResponse;

        try {
            userResponse = userService.getUserById(user.getId());

        } catch (UserNotFoundException e) {
            log.warn(e.getMessage(), new UserNotFoundException());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        } catch (Exception e) {
            log.warn(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @PutMapping("/api/user")
    public ResponseEntity<UserResponseDto> updateUser(@RequestBody User update,
                                                      @AuthenticationPrincipal User user) {
        UserResponseDto userResponse;

        try {
            userResponse = userService.updateUserById(user.getId(), update);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        } catch (Exception e) {
            log.warn(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    @PostMapping("/api/create/user")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
<<<<<<< HEAD
        try {
            userService.createUser(newUser);

        } catch (UsernameAlreadyExistException e) {
            log.warn(e, new UsernameAlreadyExistException());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);

        } catch (EmailAlreadyExistException e) {
            log.warn(e, new EmailAlreadyExistException());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);

        } catch (IllegalArgumentException e) {
            log.warn(e, new IllegalArgumentException());
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        } catch (Exception e) {
            log.warn(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

=======
        userService.createUser(newUser);
>>>>>>> lab
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
