package com.codecamp.userservice.dto;

import com.codecamp.userservice.services.UserDetailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

public class UserResponseDto {

    @Autowired
    private UserDetailServiceImpl userDetailService;

    public UserResponseDto() {}

    public UserDetailServiceImpl getUserDetailService() {
        return userDetailService;
    }


    // TODO: Review this method for relevancy
    public void setUser(UserDetailServiceImpl userDetailService) {
        this.userDetailService = userDetailService;
    }
}
