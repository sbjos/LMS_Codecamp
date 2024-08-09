package com.codecamp.utils;

import com.codecamp.dto.AssignmentResponseDto;
import com.codecamp.dto.AssignmentUserResponseDto;
import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.Assignment;
import com.codecamp.entities.User;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;

@Component
public class ObjectMapping {

    /**
     * Converts Assignment objects to a DTO
     * @param assignment assignment object
     * @return a DTO object
     */
    public static AssignmentResponseDto assignmentMapping(Assignment assignment) {
        AssignmentResponseDto dto = new AssignmentResponseDto();

        dto.setId(assignment.getId());
        dto.setNumber(assignment.getNumber());
        dto.setStatus(assignment.getStatus());
        dto.setName(assignment.getName());
        dto.setDescription(assignment.getDescription());
        dto.setGithubUrl(assignment.getGithubUrl());
        dto.setBranch(assignment.getBranch());
        dto.setReviewVideoUrl(assignment.getReviewVideoUrl());
        dto.setUser(userMapping(assignment.getUser()));
        Optional.ofNullable(assignment.getCodeReviewer()).ifPresent(
                codeReviewer -> dto.setCodeReviewer(userMapping(codeReviewer)));

        return dto;
    }

    /**
     * Converts user objects to a DTO for AssignmentResponseDto.
     * @param user object
     * @return a DTO object
     */
    public static AssignmentUserResponseDto userMapping(User user) {
        AssignmentUserResponseDto dto = new AssignmentUserResponseDto();

        dto.setId(user.getId());
        dto.setCohortStartDate(user.getCohortStartDate());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setUsername(user.getUsername());
        dto.setAuthorities(new HashSet<>(user.getAuthorities()));

        return dto;
    }

    /**
     * Converts a user object to a DTO
     * @param user user object
     * @return a DTO object
     */
    public static UserResponseDto userResponseMapping(User user) {
        UserResponseDto dto = new UserResponseDto();

        dto.setId(user.getId());
        dto.setCohortStartDate(user.getCohortStartDate());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setUsername(user.getUsername());
        dto.setAuthorities(new HashSet<>(user.getAuthorities()));
        dto.setAddress(user.getAddress());
        dto.setAddress2(user.getAddress2());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setZipcode(user.getZipcode());
        dto.setAccountNonExpired(user.isAccountNonExpired());
        dto.setAccountNonLocked(user.isAccountNonLocked());
        dto.setCredentialsNonExpired(user.isCredentialsNonExpired());
        dto.setEnabled(user.isEnabled());

        return dto;
    }
}
