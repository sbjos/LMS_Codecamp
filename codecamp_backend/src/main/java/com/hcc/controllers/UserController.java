package com.hcc.controllers;

import com.hcc.entities.User;
import com.hcc.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/api/user")
    public void createUser(@RequestBody User user) {
        user.setEncodedPassword(user.getPassword());

        userRepository.save(user);
    }

    @GetMapping("/api/user/{usename}")
    public User getUser(@PathVariable("username") String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
