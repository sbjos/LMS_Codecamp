package com.codecamp.utils;

import com.codecamp.dto.AssignmentResponseDto;
import com.codecamp.dto.AssignmentUserResponseDto;
import com.codecamp.entities.Assignment;
import com.codecamp.entities.User;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class ObjectMapping {

    public AssignmentResponseDto assignmentMapping(Assignment assignment) {
        AssignmentResponseDto dto = new AssignmentResponseDto();

        dto.setId(assignment.getId());
        dto.setNumber(assignment.getNumber());
        dto.setStatus(assignment.getStatus());
        dto.setGithubUrl(assignment.getGithubUrl());
        dto.setBranch(assignment.getBranch());
        dto.setReviewVideoUrl(assignment.getReviewVideoUrl());
        dto.setUser(userMapping(assignment.getUser()));
        Optional.ofNullable(assignment.getCodeReviewer()).ifPresent(
                codeReviewer -> dto.setCodeReviewer(userMapping(codeReviewer)));

        return dto;
    }

    public AssignmentUserResponseDto userMapping(User user) {
        AssignmentUserResponseDto dto = new AssignmentUserResponseDto();

        dto.setId(user.getId());
        dto.setCohortStartDate(user.getCohortStartDate());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setUsername(user.getUsername());
        dto.setAuthorities(new HashSet<>(user.getAuthorities()));

        return dto;
    }

    // TODO: is that necessary?
//    public static AssignmentUserResponseDto userDetailsDtoMapping(UserDetails user) {
//        return AssignmentUserResponseDto.builder()
//                .withId(user.getId())
//                .withCohortStartDate(user.getCohortStartDate())
//                .withFirstName(user.getFirstName())
//                .withLastName(user.getLastName())
//                .withAuthorities(user.getAuthorities())
//                .build();
//    }
}
