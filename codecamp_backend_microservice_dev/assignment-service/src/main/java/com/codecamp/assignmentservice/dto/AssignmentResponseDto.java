package com.codecamp.assignmentservice.dto;

import com.codecamp.assignmentservice.entities.Assignment;
import com.codecamp.assignmentservice.status.AssignmentStatus;

public class AssignmentResponseDto {

    private Assignment assignment;
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

    public AssignmentStatus[] getAssignmentStatusEnum() {
        return assignmentStatus;
    }
}