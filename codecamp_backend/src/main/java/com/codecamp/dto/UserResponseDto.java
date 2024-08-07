package com.codecamp.dto;

import com.codecamp.entities.User;

public class UserResponseDto {
    private User user;

    public UserResponseDto() {}

    public UserResponseDto(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
