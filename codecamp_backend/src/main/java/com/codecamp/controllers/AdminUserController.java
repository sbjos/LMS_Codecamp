package com.codecamp.controllers;

import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.User;
import com.codecamp.services.AdminUserService;
import org.hibernate.bytecode.enhance.internal.tracker.SortedFieldTracker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminUserController {

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
        return new ResponseEntity<>(adminUserService.updateUser(username, update), HttpStatus.OK);
    }

    @PutMapping("/api/admin/user/settings/{username}")
    public ResponseEntity<UserResponseDto> updateUserSettings(@PathVariable String username, @RequestBody User update) {
        UserResponseDto updatedUser;
        return new ResponseEntity<>(adminUserService.updateUserSettings(username, update), HttpStatus.OK);
    }
}
