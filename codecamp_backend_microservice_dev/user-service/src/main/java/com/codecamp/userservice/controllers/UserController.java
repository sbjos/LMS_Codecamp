package com.codecamp.userservice.controllers;

import com.codecamp.userservice.entities.User;
import com.codecamp.userservice.repositories.UserRepository;
import com.codecamp.userservice.services.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailServiceImpl userDetailService;

    @PostMapping("/api/user")
    public void createUser(@RequestBody User user) {
        user.setEncodedPassword(user.getPassword());

        userRepository.save(user);
    }

    @GetMapping("/api/user/{username}")
    public UserDetails getUser(@PathVariable("username") String username) {
        return userDetailService.loadUserByUsername(username);
    }
}
