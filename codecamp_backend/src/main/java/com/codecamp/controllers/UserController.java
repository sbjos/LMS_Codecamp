package com.codecamp.controllers;

import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.User;
import com.codecamp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/api/user")
    public ResponseEntity<UserResponseDto> getUser(@AuthenticationPrincipal User user) {
        return new ResponseEntity<>(userService.getUserById(user.getId()), HttpStatus.OK);
    }

    @PutMapping("/api/user")
    public ResponseEntity<UserResponseDto> updateUser(@RequestBody User update,
                                                      @AuthenticationPrincipal User user) {
        return new ResponseEntity<>(userService.updateUserById(user.getId(), update), HttpStatus.OK);
    }

    @PostMapping("/api/create/user")
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        userService.createUser(newUser);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
