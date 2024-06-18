package com.hcc.dto;

import com.hcc.entities.Assignment;
import com.hcc.enums.AssignmentEnum;
import com.hcc.enums.AssignmentStatusEnum;

import java.util.Objects;

public class AssignmentResponseDto {

    private Assignment assignment;

    private final AssignmentEnum[] AssignmentEnum = com.hcc.enums.AssignmentEnum.values();

    private final AssignmentStatusEnum[] assignmentStatusEnums = AssignmentStatusEnum.values();

    public AssignmentResponseDto() {}

    public AssignmentResponseDto(Assignment assignment) {
        this.assignment = assignment;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public com.hcc.enums.AssignmentEnum[] getAssignmentEnum() {
        return AssignmentEnum;
    }

    public AssignmentStatusEnum[] getAssignmentStatusEnums() {
        return assignmentStatusEnums;
    }
}