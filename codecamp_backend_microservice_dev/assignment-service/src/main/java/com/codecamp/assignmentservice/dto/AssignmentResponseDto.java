package com.codecamp.assignmentservice.dto;

import com.codecamp.assignmentservice.entities.Assignment;
import com.hcc.securities.AssignmentEnum;
import com.hcc.securities.AssignmentStatus;

public class AssignmentResponseDto {

    private Assignment assignment;

    private final AssignmentEnum[] AssignmentEnum = com.hcc.securities.AssignmentEnum.values();

    private final AssignmentStatus[] assignmentStatus = AssignmentStatus.values();

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

    public com.hcc.securities.AssignmentEnum[] getAssignmentEnum() {
        return AssignmentEnum;
    }

    public AssignmentStatus[] getAssignmentStatusEnum() {
        return assignmentStatus;
    }
}