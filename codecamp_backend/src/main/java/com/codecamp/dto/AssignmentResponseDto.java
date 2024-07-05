package com.codecamp.dto;

import com.codecamp.enums.AssignmentStatusEnum;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AssignmentResponseDto {
    private Long id;

    private int number;

    private String status;

    private String githubUrl;

    private String branch;

    private String reviewVideoUrl;

    private UserResponseDto user;

    private UserResponseDto codeReviewer;

    @Getter
    private final com.codecamp.enums.AssignmentEnum[] AssignmentEnum = com.codecamp.enums.AssignmentEnum.values();

    @Getter
    private final AssignmentStatusEnum[] assignmentStatusEnum = AssignmentStatusEnum.values();

}