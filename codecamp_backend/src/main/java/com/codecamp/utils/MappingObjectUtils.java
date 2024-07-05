package com.codecamp.utils;

import com.codecamp.dto.AssignmentResponseDto;
import com.codecamp.dto.UserResponseDto;
import com.codecamp.entities.Assignment;
import com.codecamp.entities.User;
import org.springframework.beans.factory.annotation.Autowired;

public class MappingObjectUtils {

    @Autowired
    private AssignmentResponseDto assignmentResponseDto;

    @Autowired
    private UserResponseDto userResponseDto;

    public static AssignmentResponseDto assignmentDtoMapping(Assignment assignment) {
        return AssignmentResponseDto.builder()
                .id(assignment.getId())
                .number(assignment.getNumber())
                .githubUrl(assignment.getGithubUrl())
                .branch(assignment.getBranch())
                .reviewVideoUrl(assignment.getReviewVideoUrl())
                .user(userDtoMapping(assignment.getUser()))
                .codeReviewer(userDtoMapping(assignment.getCodeReviewer()))
                .build();
    }

    public static UserResponseDto userDtoMapping(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .cohortStartDate(user.getCohortStartDate())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .authorities(user.getAuthorities())
                .build();
    }

    // TODO: is that necessary?
//    public static UserResponseDto userDetailsDtoMapping(UserDetails user) {
//        return UserResponseDto.builder()
//                .withId(user.getId())
//                .withCohortStartDate(user.getCohortStartDate())
//                .withFirstName(user.getFirstName())
//                .withLastName(user.getLastName())
//                .withAuthorities(user.getAuthorities())
//                .build();
//    }
}
